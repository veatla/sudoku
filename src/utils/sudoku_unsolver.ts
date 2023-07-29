import seedrandom from "seedrandom";
import type { Grid } from "./sudoku";

/** To unresolve solved sudoku */
export function unresolve_sudoku(sudoku: Grid, filled_fields = 30, seed?: seedrandom.PRNG) {
	const fields_to_fill = Math.floor(Math.random() * 10) + filled_fields;
	const rng = seed ?? seedrandom(String(Date.now()));

	const filled = {
		count: 0
	};

	// Get the predetermined order for removing cells based on the seed
	const cell_removal_order = get_cell_removal_order(rng);

	for (const [i, j] of cell_removal_order) {
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

function get_cell_removal_order(rng: seedrandom.PRNG) {
	const cells = [];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			cells.push([i, j]);
		}
	}

	// Generate a fixed order of cell removal based on the provided random number generator
	const removal_order = [];
	for (let i = cells.length - 1; i >= 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		removal_order.push(cells[j]);
		cells.splice(j, 1);
	}

	return removal_order;
}
