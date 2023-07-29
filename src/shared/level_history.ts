import { writable } from 'svelte/store';
import type { GridState } from '../utils/sudoku';

export type LevelHistory = {
	state: GridState;
	prev_state: GridState;
	row: number;
	column: number;
	prev: number;
	settled: number;
};

export const level_history = writable<LevelHistory[]>([]);

export function add_to_level_history(
	state: GridState,
	prev_state: GridState,
	row: number,
	column: number,
	prev: number,
	settled: number
) {
	level_history.update((prevState) => {
		prevState.push({
			column,
			prev,
			row,
			settled,
			prev_state,
			state
		});
		return prevState;
	});
}
export function remove_last_from_level_history(): undefined | LevelHistory {
	let prev_state: undefined | LevelHistory = undefined;
	level_history.update((prevState) => {
		prev_state = prevState.pop();
		return prevState;
	});
	return prev_state;
}
