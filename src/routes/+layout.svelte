<script>
	import { init_locales } from "$hooks/i18n";
	import { keyListener } from "$utils/listener";
	import { onMount } from "svelte";
	import "./styles.css";
	import Dialog from "$container/dialog/dialog.svelte";

	onMount(() => {
		window.addEventListener("keydown", keyListener);
		return () => window.removeEventListener("keydown", keyListener);
	});
	init_locales();
</script>

<Dialog />
<div class="app">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
