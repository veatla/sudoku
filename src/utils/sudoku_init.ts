import seedrandom from 'seedrandom';
import { SUDOKU_LIMIT_LENGTH, SUDOKU_REGION_LENGTH } from '../constants';
import type { Grid } from './sudoku';

export function get_random_number(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Function to create skeleton of sudoku */
export function create_empty_grid(): Grid {
	const grid = new Array(SUDOKU_LIMIT_LENGTH);
	for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
		const arr = [];

		// If I use new Array(SUDOKU_LIMIT_LENGTH).fil(...) It's broke all logic.
		// Idk why. But I think I know why
		for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
			arr.push({
				value: 0,
				state: 'none'
			});
		}
		grid[i] = arr;
	}
	return grid;
}

/** To check if we can place number to column */
export function can_place_number(grid: Grid, row: number, col: number, num: number) {
	// Check column and row
	for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
		if (grid[row][i].value === num || grid[i][col].value === num) {
			return false;
		}
	}

	// Check region (3x3) which this field
	const start_row = Math.floor(row / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	const start_col = Math.floor(col / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	for (let i = 0; i < SUDOKU_REGION_LENGTH; i++) {
		for (let j = 0; j < SUDOKU_REGION_LENGTH; j++) {
			if (grid[start_row + i][start_col + j].value === num) {
				return false;
			}
		}
	}

	return true;
}
function shuffle_array(array: number[], rng: seedrandom.PRNG): number[] {
	const shuffled_array = [...array];
	for (let i = shuffled_array.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[shuffled_array[i], shuffled_array[j]] = [shuffled_array[j], shuffled_array[i]];
	}
	return shuffled_array;
}
// To fill sudoku with numbers from 1 to 9 to get resolvable sudoku
export function fill_diagonal_blocks(grid: Grid, seed?: seedrandom.PRNG) {
	// Create a random number generator with the provided seed or a default seed if not provided
	const rng = seed ?? seedrandom(String(Date.now()));

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const shuffled_numbers = shuffle_array(numbers, rng);

	// Get random row numbers to fill with numbers 
	const random_rows = [
		shuffle_array([0, 1, 2], rng)[0],
		shuffle_array([3, 4, 5], rng)[0],
		shuffle_array([6, 7, 8], rng)[0]
	];

	// Get random columns numbers to fill with numbers
	const random_columns = [
		shuffle_array([0, 1, 2], rng)[0],
		shuffle_array([3, 4, 5], rng)[0],
		shuffle_array([6, 7, 8], rng)[0]
	];;

	// Fill by fields
	for (const i of random_rows) {
		for (const j of random_columns) {
			const num = shuffled_numbers.pop();
			if (num) grid[i][j].value = num;
		}
	}
}
