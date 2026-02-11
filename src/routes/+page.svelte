<script lang="ts">
	import Grid from "$shared/ui/grid.svelte";
	import LevelControllers from "$shared/ui/level-controllers.svelte";
	import Numpad from "$shared/ui/numpad.svelte";
	import { m } from "$lib/paraglide/messages";

	import type { PageServerData } from "./$types";
	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>{m.page_main()}</title>
	<meta name="description" content={m.sudoku()} />
</svelte:head>

<section>
	<Grid
		fill_seed={data.game?.fill_seed}
		resolve_seed={data.game?.resolve_seed}
		difficulty={data.game?.difficulty}
	/>
	<div class="right-side">
		<LevelControllers />
		<div class="numpad-wrap">
			<Numpad />
		</div>
	</div>
</section>

<style>
	section {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		flex-direction: row;
		column-gap: var(--sudoku-section-gap);
	}

	@media (orientation: portrait) {
		section {
			flex-direction: column;
			column-gap: 0;
			row-gap: var(--sudoku-section-gap);
		}
	}

	.right-side {
		display: flex;
		flex-direction: column;
		gap: var(--sudoku-ui-gap);
	}

	/* Twitch panel / very small: hide numpad to fit grid + controls */
	@media (max-width: 320px) and (max-height: 500px) {
		.numpad-wrap {
			display: none;
		}
	}
</style>
