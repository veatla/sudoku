<script lang="ts">
	import Grid from "$shared/ui/grid.svelte";
	import LevelControllers from "$shared/ui/level-controllers.svelte";
	import Numpad from "$shared/ui/numpad.svelte";
	import { t } from "$hooks/i18n";

	import type { PageServerData } from "./$types";
	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>{$t("page.main")}</title>
	<meta name="description" content="Sudoku" />
</svelte:head>

<section>
	<Grid
		fill_seed={data.game?.fill_seed}
		resolve_seed={data.game?.resolve_seed}
		difficulty={data.game?.difficulty}
	/>
	<div class="right-side">
		<LevelControllers />
		<Numpad />
	</div>
</section>

<style>
	section {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 20px;
		flex: 0.6;
	}

	.right-side {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	/* Stack controls under the grid on narrow screens */
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
</style>
