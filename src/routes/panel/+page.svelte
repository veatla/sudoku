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
		gap: 20px;
	}

	.right-side {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	/* On generic small screens, stack controls under the grid */
	@media only screen and (max-width: 800px) {
		section {
			flex-direction: column;
			gap: 12px;
		}

		.right-side {
			width: 100%;
			align-items: center;
		}
	}

	/* Twitch extension target: ~318x496 — hide numpad and extra padding */
	@media only screen and (max-width: 320px) and (max-height: 500px) {
		section {
			gap: 8px;
			margin: 10px;
		}

		.panel-numpad {
			display: none;
		}
	}
</style>
