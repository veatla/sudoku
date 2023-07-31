import { SUDOKU_DIFFICULTY } from '$utils/sudoku';

function random_value() {
	return {
		fill_seed: undefined,
		difficulty: undefined,
		resolved_seed: undefined
	};
}
export function load({ params }) {
	if (params.slug.indexOf(':') === -1) {
		return random_value();
	}
	const [fill_seed, resolved_seed, get_difficulty] = params.slug.split(':');

	const difficulty_check = Number(get_difficulty) as SUDOKU_DIFFICULTY;
	if (!fill_seed || !resolved_seed) {
		return random_value();
	}
	return {
		fill_seed: String(fill_seed),
		resolved_seed: String(resolved_seed),
		difficulty: Number.isNaN(difficulty_check) ? SUDOKU_DIFFICULTY.easy : difficulty_check
	};
}
