import type { Grid } from "../utils/sudoku";

export type SudokuStore = {
	unsolved: Grid;
	solved: Grid;
	errors_count: number;
	mode: InputModes;
}
export type InputModes = 'notes' | 'input';
/** Active selected field */
export const sudoku_store = reactive<SudokuStore>({
	unsolved: [],
	solved: [],
	errors_count: 0,
	mode: 'input'
});

export const filled_counts = reactive({
	solved: 0,
	unsolved: 81
});
