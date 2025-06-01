import { SUDOKU_LIMIT_LENGTH, SUDOKU_REGION_LENGTH } from "$constants";
import type { Grid } from "./sudoku";

// Recursive function to fill our sudoku
export function fill_sudoku_grid(grid: Grid) {
	const empty_field = find_empty_field(grid);
	if (!empty_field) {
		// Return true if there is no unfilled fields
		return true;
	}

	const [row, col] = empty_field;
	const possible_numbers = get_possible_numbers(grid, row, col);

	// Trying to place a number from 1 to SUDOKU_LIMIT_LENGTH in fields
	for (const num of possible_numbers) {
		grid[row][col].value = num;
		grid[row][col].state = "default";

		// Recursive function to fill another field
		if (fill_sudoku_grid(grid)) {
			return true;
		}

		grid[row][col].value = 0;
		grid[row][col].state = "none";
	}

	return false;
}
// To get possible numbers
function get_possible_numbers(grid: Grid, row: number, col: number) {
	const used_numbers = new Set<number>();
	for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
		used_numbers.add(grid[row][i].value);
		used_numbers.add(grid[i][col].value);
	}

	const startRow = Math.floor(row / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	const startCol = Math.floor(col / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	for (let i = 0; i < SUDOKU_REGION_LENGTH; i++) {
		for (let j = 0; j < SUDOKU_REGION_LENGTH; j++) {
			used_numbers.add(grid[startRow + i][startCol + j].value);
		}
	}

	const possible_numbers = [];
	for (let num = 1; num <= SUDOKU_LIMIT_LENGTH; num++) {
		if (!used_numbers.has(num)) {
			possible_numbers.push(num);
		}
	}

	return possible_numbers;
}
/** Function to solve sudoku. Returns new variable */
export function solved_version(grid: Grid) {
	const copy = JSON.parse(JSON.stringify(grid));
	fill_sudoku_grid(copy);
	return copy;
}

// Функция для поиска первой пустой ячейки в сетке
export function find_empty_field(grid: Grid) {
	for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
		for (let j = 0; j < SUDOKU_LIMIT_LENGTH; j++) {
			if (grid[i][j].value === 0) {
				return [i, j];
			}
		}
	}
	return null;
}
export default solved_version;
