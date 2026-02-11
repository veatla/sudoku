import seedrandom from "seedrandom";
import solved_version from "./sudoku-solver";
import { unresolve_sudoku } from "./sudoku-unsolver";
import { create_empty_grid, fill_diagonal_blocks } from "./sudoku-init";

export enum SUDOKU_DIFFICULTY {
	"easy" = 40,
	"medium" = 30,
	"hard" = 20,
	"expert" = 10,
	"evil" = 0
}

export type GridState = "none" | "err" | "ok" | "default";

export type Grid = {
	value: number;
	notes: number[];
	state: GridState;
}[][];

/** To get unresolved and solved sudoku */
export function get_sudoku(
	resolve_seed?: string | null,
	fill_seed?: string | null,
	difficulty?: SUDOKU_DIFFICULTY | null
) {
	const sudoku = {
		solved: create_empty_grid(),
		filled_fields: 0,
		unresolved: [] as Grid
	};

	fill_diagonal_blocks(sudoku.solved, seedrandom(fill_seed));

	sudoku.solved = solved_version(sudoku.solved);

	const unresolved = JSON.parse(JSON.stringify(sudoku.solved));
	const filled_fields = unresolve_sudoku(unresolved, difficulty, seedrandom(resolve_seed));

	sudoku.filled_fields = filled_fields;
	sudoku.unresolved = unresolved;

	return sudoku;
}
