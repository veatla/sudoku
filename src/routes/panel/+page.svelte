<script>
	import Grid from "$shared/ui/grid.svelte";
	import LevelControllers from "$shared/ui/level-controllers.svelte";
	import Numpad from "$shared/ui/numpad.svelte";
	import { t } from "$hooks/i18n";

	const data = {
		difficulty: undefined,
		fill_seed: undefined,
		resolved_seed: undefined
	};
</script>

<svelte:head>
	<title>{$t("Game")}</title>
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
	@media screen and (max-height: 612px) and (max-width: 800px) {
		.panel-numpad {
			display: none;
		}
	}
</style>
