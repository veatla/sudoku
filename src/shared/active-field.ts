import { get, writable } from "svelte/store";
import { filled_counts, sudoku_store, type SudokuStore } from "./sudoku-store";
import { add_to_level_history, type LevelHistory } from "./level-history";
type ActiveFieldStore = {
	column: number;
	row: number;
};
/** Active selected field */
export const active_field = writable<ActiveFieldStore>({
	column: 0,
	row: 0
});

export function set_active_field_value(value: number, store: ActiveFieldStore) {
	const { row, column } = store;

	/** Check if `value` is number */
	if (Number.isNaN(value)) return false;

	const main_store = get(sudoku_store);
	const solved_value = main_store.solved[row][column];
	const active_value = main_store.unsolved[row][column].value;
	const is_does_not_solved = active_value !== solved_value.value;
	const is_solved = value === solved_value.value;

	if (!is_does_not_solved) return false;

	function updater(sudoku_store: SudokuStore) {
		const { unsolved, solved, errors_count, mode } = sudoku_store;
		const new_state = is_solved ? "ok" : "err";
		if (mode === "notes") {
			const is_alrdy_has = unsolved[row][column].notes.indexOf(value);

			if (is_alrdy_has > -1) unsolved[row][column].notes.splice(is_alrdy_has, 1);
			else unsolved[row][column].notes.push(value);
		} else {
			unsolved[row][column].value = value;
		}

		add_to_level_history(
			new_state,
			unsolved[row][column].state,
			row,
			column,
			active_value,
			unsolved[row][column].value,
			mode
		);

		if (mode === "input") {
			unsolved[row][column].state = new_state;

			if (is_solved) {
				filled_counts.update(({ solved, unsolved }) => ({
					solved: solved + 1,
					unsolved: unsolved - 1
				}));
			}
		}

		return {
			unsolved,
			solved,
			mode,
			errors_count: mode === "notes" ? errors_count : is_solved ? errors_count : errors_count + 1
		};
	}
	return sudoku_store.update(updater);
}

export function set_field(value: LevelHistory) {
	const { column, prev, row, settled, state, prev_state, mode } = value;

	const is_does_not_solved = prev !== settled;
	const is_solved = state === "ok";

	if (!is_does_not_solved) return false;

	sudoku_store.update(({ unsolved: unsolved_grid, solved: solved_grid, errors_count }) => {
		if (mode === "notes") unsolved_grid[row][column].notes.push(value.prev);
		else {
			unsolved_grid[row][column].value = value.prev;
			unsolved_grid[row][column].state = prev_state;
		}

		return {
			unsolved: unsolved_grid,
			mode,
			solved: solved_grid,
			errors_count: errors_count
		};
	});

	if (mode === "notes") return false;

	filled_counts.update(({ solved, unsolved }) => ({
		solved: is_solved ? solved - 1 : solved + 1,
		unsolved: is_solved ? unsolved + 1 : unsolved - 1
	}));
}
