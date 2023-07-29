import { writable } from 'svelte/store';
import type { Grid } from '../utils/sudoku';

/** Active selected field */
export const sudoku_store = writable({
	unsolved_grid: [] as Grid,
	solved_grid: [] as Grid,
	errors_count: 0
});

export const filled_counts = writable({
	solved: 0,
	unsolved: 81
});