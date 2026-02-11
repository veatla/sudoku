import { SUDOKU_LIMIT_LENGTH, SUDOKU_REGION_LENGTH } from "$constants";
import type { Grid } from "./sudoku";

function is_row_complete(unsolved: Grid, solved: Grid, row: number): boolean {
	for (let c = 0; c < SUDOKU_LIMIT_LENGTH; c++) {
		if (unsolved[row]?.[c]?.value !== solved[row]?.[c]?.value) return false;
	}
	return true;
}

function is_col_complete(unsolved: Grid, solved: Grid, col: number): boolean {
	for (let r = 0; r < SUDOKU_LIMIT_LENGTH; r++) {
		if (unsolved[r]?.[col]?.value !== solved[r]?.[col]?.value) return false;
	}
	return true;
}

function is_block_complete(unsolved: Grid, solved: Grid, blockRow: number, blockCol: number): boolean {
	const r0 = blockRow * SUDOKU_REGION_LENGTH;
	const c0 = blockCol * SUDOKU_REGION_LENGTH;
	for (let r = r0; r < r0 + SUDOKU_REGION_LENGTH; r++) {
		for (let c = c0; c < c0 + SUDOKU_REGION_LENGTH; c++) {
			if (unsolved[r]?.[c]?.value !== solved[r]?.[c]?.value) return false;
		}
	}
	return true;
}

export type CompletedUnits = {
	rows: number[];
	cols: number[];
	blocks: number[];
};

export function get_completed_units(unsolved: Grid, solved: Grid): CompletedUnits {
	const rows: number[] = [];
	const cols: number[] = [];
	const blocks: number[] = [];

	for (let i = 0; i < SUDOKU_LIMIT_LENGTH; i++) {
		if (is_row_complete(unsolved, solved, i)) rows.push(i);
		if (is_col_complete(unsolved, solved, i)) cols.push(i);
	}

	for (let br = 0; br < SUDOKU_REGION_LENGTH; br++) {
		for (let bc = 0; bc < SUDOKU_REGION_LENGTH; bc++) {
			if (is_block_complete(unsolved, solved, br, bc)) {
				blocks.push(br * SUDOKU_REGION_LENGTH + bc);
			}
		}
	}

	return { rows, cols, blocks };
}

/** Block index 0..8 for cell (row, col) */
export function get_block_index(row: number, col: number): number {
	return Math.floor(row / SUDOKU_REGION_LENGTH) * SUDOKU_REGION_LENGTH + Math.floor(col / SUDOKU_REGION_LENGTH);
}
