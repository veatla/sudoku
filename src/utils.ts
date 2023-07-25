export type Grid = number[][];
export function createEmptyGrid(): Grid {
	const grid = new Array(9);
	for (let i = 0; i < 9; i++) {
		grid[i] = new Array(9).fill(0);
	}
	return grid;
}
export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Создаем функцию для проверки, можно ли разместить число в указанной ячейке
export function canPlaceNumber(grid: Grid, row: number, col: number, num: number) {
	// Проверяем строку и столбец
	for (let i = 0; i < 9; i++) {
		if (grid[row][i] === num || grid[i][col] === num) {
			return false;
		}
	}

	// Проверяем блок 3x3, к которому принадлежит ячейка
	const startRow = Math.floor(row / 3) * 3;
	const startCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[startRow + i][startCol + j] === num) {
				return false;
			}
		}
	}

	return true;
}

// Создаем функцию для заполнения диагональных блоков
export function fillDiagonalBlocks(grid: Grid) {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// Перемешиваем массив чисел
	for (let i = numbers.length - 1; i > 0; i--) {
		const j = getRandomNumber(0, i);
		[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
	}

	// Заполняем диагональные блоки
	for (let i = 0; i < 9; i += 3) {
		for (let j = 0; j < 9; j += 3) {
			const num = numbers.pop()!;
			grid[i][j] = num;
		}
	}
}
// Создаем функцию для рекурсивного заполнения оставшихся ячеек
export function solveSudoku(grid: Grid) {
	const emptyCell = findEmptyCell(grid);
	if (!emptyCell) {
		// Базовый случай: если не осталось пустых ячеек, значит, судоку решено.
		return true;
	}

	const [row, col] = emptyCell;

	// Пробуем поместить числа от 1 до 9 в пустую ячейку
	for (let num = 1; num <= 9; num++) {
		if (canPlaceNumber(grid, row, col, num)) {
			grid[row][col] = num;

			// Рекурсивный вызов для следующей пустой ячейки
			if (solveSudoku(grid)) {
				return true;
			}

			// Если текущая попытка не привела к решению, откатываем изменения
			grid[row][col] = 0;
		}
	}

	// Если ни одно число не подошло, возвращаемся на шаг назад
	return false;
}

export function solvedVersion(grid: Grid) {
	const copy = JSON.parse(JSON.stringify(grid));
	solveSudoku(copy);
	return copy;
}

// Функция для поиска первой пустой ячейки в сетке
export function findEmptyCell(grid: Grid) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (grid[i][j] === 0) {
				return [i, j];
			}
		}
	}
	return null;
}
