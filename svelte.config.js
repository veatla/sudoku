import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			isr: true
		}),
		alias: {
			$components: 'src/components',
			$funcs: 'src/funcs',
			$hooks: 'src/hooks',
			$utils: 'src/utils',
			$shared: 'src/shared',
			$container: 'src/container',
			$constants: 'src/constants'
		},
	},
	extensions: ['.svelte']
};

export default config;
