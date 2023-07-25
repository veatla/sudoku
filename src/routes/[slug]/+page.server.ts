function random_value() {
	return {
		fill_seed: undefined,
		resolved_seed: undefined
	};
}
export function load({ params }) {
	if (params.slug.indexOf(':') === -1) {
		return random_value();
	}
	const [fill_seed, resolved_seed] = params.slug.split(':');

	if (!fill_seed || !resolved_seed) {
		return random_value();
	}
	return {
		fill_seed: String(fill_seed),
		resolved_seed: String(resolved_seed)
	};
}
