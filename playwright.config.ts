import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		command: "npm run build && npm run preview",
		port: 4173
	},
	testDir: "tests",
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
// "svelte": "^4.0.4",
// @sveltejs/vite-plugin-svelte
// "@sveltejs/kit": "^2.21.1",
