import { filled_counts, sudoku_store } from "./sudoku_store";
import { add_to_level_history, type LevelHistory } from "./level_history";
type ActiveFieldStore = {
    column: number;
    row: number;
};
/** Active selected field */
export const active_field = reactive<ActiveFieldStore>({
    column: 0,
    row: 0,
});

export function set_active_field_value(value: number, store: ActiveFieldStore) {
    const { row, column } = store;

    /** Check if `value` is number */
    if (Number.isNaN(value)) return false;

    const main_store = sudoku_store;
    const solved_value = main_store.solved[row][column];
    const active_value = main_store.unsolved[row][column].value;
    const is_does_not_solved = active_value !== solved_value.value;
    const is_solved = value === solved_value.value;

    if (!is_does_not_solved) return false;

    function updater() {
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
                // filled_counts.update(({ solved, unsolved }) => ({
                filled_counts.solved = filled_counts.solved + 1;
                filled_counts.unsolved = filled_counts.unsolved - 1;
                // }));
            }
        }

        sudoku_store.unsolved = unsolved;
        sudoku_store.solved = solved;
        sudoku_store.mode = mode;
        sudoku_store.errors_count = mode === "notes" ? errors_count : is_solved ? errors_count : errors_count + 1;
        return sudoku_store;
    }
    return updater();
}

export function set_field(value: LevelHistory) {
    const { column, prev, row, settled, state, prev_state, mode } = value;

    const is_does_not_solved = prev !== settled;
    const is_solved = state === "ok";

    if (!is_does_not_solved) return false;

    // sudoku_store.update(({ unsolved: unsolved_grid, solved: solved_grid, errors_count }) => {
    if (mode === "notes") sudoku_store.unsolved[row][column].notes.push(value.prev);
    else {
        sudoku_store.unsolved[row][column].value = value.prev;
        sudoku_store.unsolved[row][column].state = prev_state;
    }
    // });

    if (mode === "notes") return false;

    // filled_counts.update(({ solved, unsolved }) => ({
    filled_counts.solved = is_solved ? filled_counts.solved - 1 : filled_counts.solved + 1;
    filled_counts.unsolved = is_solved ? filled_counts.unsolved + 1 : filled_counts.unsolved - 1;
    // }));
}
