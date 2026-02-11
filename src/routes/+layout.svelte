<script>
	import { page } from "$app/state";
	import { locales, localizeHref } from "$lib/paraglide/runtime";
	import { keyListener } from "$utils/listener";
	import { onMount } from "svelte";
	import "./styles.css";
	import Dialog from "$container/dialog/dialog.svelte";

	onMount(() => {
		window.addEventListener("keydown", keyListener);

		return () => window.removeEventListener("keydown", keyListener);
	});
</script>

<Dialog />
<div class="app"><slot></slot></div>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
