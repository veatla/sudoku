<script>
	import Grid from '$components/Grid.svelte';
	import LevelControllers from '$components/LevelControllers.svelte';
	import Numpad from '$components/Numpad.svelte';
	import { t } from '$hooks/i18n';
</script>

<svelte:head>
	<title>{$t('page.main')}</title>
	<meta name="description" content="Sudoku" />
</svelte:head>

<section>
	<Grid difficulty={undefined} fill_seed={undefined} resolve_seed={undefined} />
	<div class="right-side">
		<LevelControllers />
		<Numpad />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
