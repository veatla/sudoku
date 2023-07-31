import { writable } from 'svelte/store';
import type { Grid } from '$utils/sudoku';

export type SudokuStore = {
	unsolved_grid: Grid;
	solved_grid: Grid;
	errors_count: number;
	mode: InputModes;
}
export type InputModes = 'notes' | 'input';
/** Active selected field */
export const sudoku_store = writable<SudokuStore>({
	unsolved_grid: [],
	solved_grid: [],
	errors_count: 0,
	mode: 'input'
});

export const filled_counts = writable({
	solved: 0,
	unsolved: 81
});
