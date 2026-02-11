import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "panel.html",
			strict: false
		}),
		alias: {
			$components: "src/components",
			$funcs: "src/funcs",
			$hooks: "src/hooks",
			$utils: "src/utils",
			$shared: "src/shared",
			$container: "src/container",
			$constants: "src/constants"
		}
	}
};

export default config;
