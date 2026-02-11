import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	plugins: [
		basicSsl({ certDir: "certs", domains: ["localhost"], name: "localhost" }),
		sveltekit(),
		paraglideVitePlugin({ project: "./project.inlang", outdir: "./src/lib/paraglide" })
	],
	test: { include: ["src/**/*.{test,spec}.{js,ts}"] },
	server: { https: true, port: 8080, proxy: {} }
});
