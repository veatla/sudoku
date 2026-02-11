import { writable } from "svelte/store";
import type { Grid } from "$utils/sudoku";

export type SudokuStore = {
	unsolved: Grid;
	solved: Grid;
	errors_count: number;
	mode: InputModes;
};
export type InputModes = "notes" | "input";
/** Active selected field */
export const sudoku_store = writable<SudokuStore>({
	unsolved: [],
	solved: [],
	errors_count: 0,
	mode: "input"
});

export const filled_counts = writable({
	solved: 0,
	unsolved: 81
});

export type RippleOrigin = { row: number; col: number };

export type CelebratedUnits = {
	rows: number[];
	cols: number[];
	blocks: number[];
	/** Cell that triggered the completion — ripple spreads from here */
	origin: RippleOrigin | null;
};

/** Units that just became complete — used for UI transition, cleared after animation */
export const celebrated_units = writable<CelebratedUnits>({
	rows: [],
	cols: [],
	blocks: [],
	origin: null
});

/** Last cell the user correctly filled — used as ripple origin */
export const last_filled_cell = writable<RippleOrigin | null>(null);
