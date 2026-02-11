<script>
	import Grid from "$shared/ui/grid.svelte";
	import LevelControllers from "$shared/ui/level-controllers.svelte";
	import Numpad from "$shared/ui/numpad.svelte";
	import { m } from "$lib/paraglide/messages";

	const data = {
		difficulty: undefined,
		fill_seed: undefined,
		resolved_seed: undefined
	};
</script>

<svelte:head>
	<title>{m.page_game_title()}</title>
</svelte:head>
<section>
	<Grid difficulty={data.difficulty} fill_seed={data.fill_seed} resolve_seed={data.resolved_seed} />
	<div class="right-side">
		<LevelControllers />
		<div class="panel-numpad numpad-wrap">
			<Numpad />
		</div>
	</div>
</section>

<style>
	section {
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

	/* Twitch panel 318×496: compact column layout, hide numpad */
	@media (max-width: 320px) and (max-height: 500px) {
		section {
			flex-direction: column;
			column-gap: 0;
			row-gap: var(--sudoku-section-gap);
		}
		.panel-numpad {
			display: none;
		}
	}
</style>
