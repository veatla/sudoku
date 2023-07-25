export type Grid = {
	value: number;
	state: 'none' | 'err' | 'ok' | 'default';
}[][];

export function get_random_boolean() {
	return Math.random() < 0.5;
}
export function get_random_number(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Function to create skeleton of sudoku */
export function create_empty_grid(): Grid {
	const grid = new Array(9);
	for (let i = 0; i < 9; i++) {
		const arr = [];

		// If I use new Array(9).fil(...) It's broke all logic.
		// Idk why. But I think I know why
		for (let i = 0; i < 9; i++) {
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
	for (let i = 0; i < 9; i++) {
		if (grid[row][i].value === num || grid[i][col].value === num) {
			return false;
		}
	}

	// Проверяем блок 3x3, к которому принадлежит ячейка
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[startRow + i][startCol + j].value === num) {
				return false;
			}
		}
	}

	return true;
}

/** Returns index of grid column/row */
function random_field_of_grid() {
	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	return Math.floor(Math.random() * numbers.length);
}
// To fill sudoku with numbers from 1 to 9 to get resolvable sudoku
export function fill_diagonal_blocks(grid: Grid) {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// Shuffle the array of numbers
	for (let i = numbers.length - 1; i > 0; i--) {
		const j = get_random_number(0, i);
		[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
	}
	const randomRows = [2, 5, 8];
	const randomColumns = [2, 5, 8];

	// Fill by fields
	for (const i of randomRows) {
		for (const j of randomColumns) {
			console.log(i, j);
			const num = numbers.pop();
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

	// Trying to place a number from 1 to 9 in fields
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
	for (let i = 0; i < 9; i++) {
		usedNumbers.add(grid[row][i].value);
		usedNumbers.add(grid[i][col].value);
	}

	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			usedNumbers.add(grid[startRow + i][startCol + j].value);
		}
	}

	const possibleNumbers = [];
	for (let num = 1; num <= 9; num++) {
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
export function unresolve_sudoku(sudoku: Grid, filled_fields = 30) {
	const fields_to_fill = Math.floor(Math.random() * 10) + filled_fields;
	const filled = {
		count: 0
	};
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (filled.count > fields_to_fill) break;
			const fill_this_field = get_random_boolean();
			if (!fill_this_field) {
				sudoku[i][j].value = 0;
				sudoku[i][j].state = 'default';
			}
		}
	}
}

/** To get unresolved and solved sudoku */
export function get_sudoku() {
	const sudoku = {
		solved: create_empty_grid(),
		unresolved: [] as Grid
	};
	fill_diagonal_blocks(sudoku.solved);
	sudoku.solved = solved_version(sudoku.solved);
	const unresolved = JSON.parse(JSON.stringify(sudoku.solved));
	unresolve_sudoku(unresolved);
	sudoku.unresolved = unresolved;
	return sudoku;
}

// Функция для поиска первой пустой ячейки в сетке
export function find_empty_field(grid: Grid) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (grid[i][j].value === 0) {
				return [i, j];
			}
		}
	}
	return null;
}
