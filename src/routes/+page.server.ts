import { SUDOKU_DIFFICULTY } from "$utils/sudoku";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const _difficulty = url.searchParams.get("difficulty");
	const fill_seed = url.searchParams.get("fill_seed");
	const resolve_seed = url.searchParams.get("resolve_seed");

	const difficulty = _difficulty
		? SUDOKU_DIFFICULTY[_difficulty as keyof typeof SUDOKU_DIFFICULTY]
		: SUDOKU_DIFFICULTY.medium;

	return {
		game: { resolve_seed, fill_seed, difficulty }
	};
};
