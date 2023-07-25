function generate_id(length = 10) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
		counter += 1;
	}
	return result;
}
export function get_random_seed() {
	const fill_seed = generate_id();
	const resolved_seed = generate_id();
	return fill_seed + ':' + resolved_seed;
}
