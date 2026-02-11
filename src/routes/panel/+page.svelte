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
		<div class="panel-numpad">
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
		/* по умолчанию — landscape: numpad справа */
		flex-direction: row;
		column-gap: 24px;
	}

	/* портретные / высокие экраны — numpad снизу */
	@media (orientation: portrait) {
		section {
			flex-direction: column;
			column-gap: 0;
			row-gap: 12px;
		}
	}

	.right-side {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	/* если высоты мало (например, Twitch panel) — прячем numpad */
	@media (max-height: 612px) and (max-width: 676px), (max-width: 700px) and (max-height: 500px) {
		section {
			flex-direction: column;
			column-gap: 0;
			row-gap: 12px;
		}
		.panel-numpad {
			display: none;
		}
	}
</style>
