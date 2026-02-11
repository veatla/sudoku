<script>
	import Grid from '$shared/ui/grid.svelte';
	import LevelControllers from '$shared/ui/level-controllers.svelte';
	import Numpad from '$shared/ui/numpad.svelte';
	import { t } from '$hooks/i18n';

	const data = {
		difficulty: undefined,
		fill_seed: undefined,
		resolved_seed: undefined
	}
</script>

<svelte:head>
	<title>{$t('Game')}</title>
</svelte:head>
<section>
	<Grid difficulty={data.difficulty} fill_seed={data.fill_seed} resolve_seed={data.resolved_seed} />
	<div class="right-side">
		<LevelControllers />
		<Numpad />
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
	}

	@media only screen and ( max-width: 800px ) {
		.right-side {
			display: none;
		}
	}
</style>
