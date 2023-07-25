import { SUDOKU_LIMIT_LENGTH, SUDOKU_REGION_LENGTH } from './constants';
import seedrandom from 'seedrandom';

export type Grid = {
	value: number;
	state: 'none' | 'err' | 'ok' | 'default';
}[][];

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
	// Проверяем строку и столбец
	for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
		if (grid[row][i].value === num || grid[i][col].value === num) {
			return false;
		}
	}

	// Проверяем блок 3x3, к которому принадлежит ячейка
	const startRow = Math.floor(row / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	const startCol = Math.floor(col / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	for (let i = 0; i < SUDOKU_REGION_LENGTH; i++) {
		for (let j = 0; j < SUDOKU_REGION_LENGTH; j++) {
			if (grid[startRow + i][startCol + j].value === num) {
				return false;
			}
		}
	}

	return true;
}
function shuffleArray(array: number[], rng: seedrandom.PRNG): number[] {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}
// To fill sudoku with numbers from 1 to 9 to get resolvable sudoku
export function fill_diagonal_blocks(grid: Grid, seed?: seedrandom.PRNG) {
	// Create a random number generator with the provided seed or a default seed if not provided
	const rng = seed ?? seedrandom(String(Date.now()));

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const shuffledNumbers = shuffleArray(numbers, rng);

	const randomRows = [2, 5, 8];
	const randomColumns = [2, 5, 8];

	// Fill by fields
	for (const i of randomRows) {
		for (const j of randomColumns) {
			const num = shuffledNumbers.pop();
			if (num) grid[i][j].value = num;
		}
	}
}
// Recursive function to fill our sudoku
export function fill_sudoku_grid(grid: Grid) {
	const empty_field = find_empty_field(grid);
	if (!empty_field) {
		// Return true if there is no unfilled fields
		return true;
	}

	const [row, col] = empty_field;
	const possibleNumbers = get_possible_numbers(grid, row, col);

	// Trying to place a number from 1 to SUDOKU_LIMIT_LENGTH in fields
	for (const num of possibleNumbers) {
		grid[row][col].value = num;

		// Recursive function to fill another field
		if (fill_sudoku_grid(grid)) {
			return true;
		}

		grid[row][col].value = 0;
	}

	return false;
}
// To get possible numbers
function get_possible_numbers(grid: Grid, row: number, col: number) {
	const usedNumbers = new Set<number>();
	for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
		usedNumbers.add(grid[row][i].value);
		usedNumbers.add(grid[i][col].value);
	}

	const startRow = Math.floor(row / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	const startCol = Math.floor(col / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH;
	for (let i = 0; i < SUDOKU_REGION_LENGTH; i++) {
		for (let j = 0; j < SUDOKU_REGION_LENGTH; j++) {
			usedNumbers.add(grid[startRow + i][startCol + j].value);
		}
	}

	const possibleNumbers = [];
	for (let num = 1; num <= SUDOKU_LIMIT_LENGTH; num++) {
		if (!usedNumbers.has(num)) {
			possibleNumbers.push(num);
		}
	}

	return possibleNumbers;
}
/** Function to solve sudoku. Returns new variable */
export function solved_version(grid: Grid) {
	const copy = JSON.parse(JSON.stringify(grid));
	fill_sudoku_grid(copy);
	return copy;
}

/** To unresolve solved sudoku */
export function unresolve_sudoku(sudoku: Grid, filled_fields = 30, seed?: seedrandom.PRNG) {
	const fields_to_fill = Math.floor(Math.random() * 10) + filled_fields;
	const rng = seed ?? seedrandom(String(Date.now()));

	const filled = {
		count: 0
	};

	// Get the predetermined order for removing cells based on the seed
	const cellRemovalOrder = getCellRemovalOrder(rng);

	for (const [i, j] of cellRemovalOrder) {
		if (filled.count >= fields_to_fill) break;
		const fill_this_field = get_random_boolean(rng);
		if (fill_this_field && filled.count < filled_fields) {
			filled.count += 1;
		} else {
			sudoku[i][j].value = 0;
			sudoku[i][j].state = 'default';
		}
	}

	return filled.count;
}

function get_random_boolean(rng: seedrandom.PRNG) {
	return rng() < 0.5;
}

function getCellRemovalOrder(rng: seedrandom.PRNG) {
	const cells = [];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			cells.push([i, j]);
		}
	}

	// Generate a fixed order of cell removal based on the provided random number generator
	const removalOrder = [];
	for (let i = cells.length - 1; i >= 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		removalOrder.push(cells[j]);
		cells.splice(j, 1);
	}

	return removalOrder;
}
/** To get unresolved and solved sudoku */
export function get_sudoku(resolve_seed?: string, fill_seed?: string) {
	const sudoku = {
		solved: create_empty_grid(),
		filled_fields: 0,
		unresolved: [] as Grid
	};
	fill_diagonal_blocks(sudoku.solved, seedrandom(fill_seed));
	sudoku.solved = solved_version(sudoku.solved);
	const unresolved = JSON.parse(JSON.stringify(sudoku.solved));
	const filled_fields = unresolve_sudoku(unresolved, undefined, seedrandom(resolve_seed));
	sudoku.filled_fields = filled_fields;
	sudoku.unresolved = unresolved;
	return sudoku;
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
