import { writable } from 'svelte/store';
import { timer_store } from './timer_store';
import { filled_counts, sudoku_store } from './sudoku_store';
type ActiveFieldStore = {
	active_column: number;
	active_row: number;
	active_solved_value: {
		value: number;
		state: string;
	};
	active_value: number;
};
/** Active selected field */
export const active_field = writable<ActiveFieldStore>({
	active_column: 0,
	active_row: 0,
	active_solved_value: {
		value: 0,
		state: 'none'
	},
	active_value: 0
});
export function set_active_field(value: number, store: ActiveFieldStore) {
	const { active_row, active_column, active_solved_value, active_value } = store;

	/** Check if `value` is number */
	if (Number.isNaN(value)) return false;

	const is_does_not_solved = active_value !== active_solved_value.value;
	const is_solved = value === active_solved_value.value;

	if (is_does_not_solved) {
		sudoku_store.update(({ unsolved_grid, solved_grid, errors_count }) => {
			unsolved_grid[active_row][active_column].value = value;
			unsolved_grid[active_row][active_column].state = is_solved ? 'ok' : 'err';
			return {
				unsolved_grid,
				solved_grid,
				errors_count: !is_solved ? errors_count + 1 : errors_count
			};
		});

		if (is_solved) {
			filled_counts.update(({ solved, unsolved }) => ({
				solved: solved + 1,
				unsolved: unsolved - 1
			}));
		}
	}
}
