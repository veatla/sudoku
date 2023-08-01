<script>
	import Grid from '$components/Grid.svelte';
	import LevelControllers from '$components/LevelControllers.svelte';
	import Numpad from '$components/Numpad.svelte';
	import { t } from '$hooks/i18n';

	export let data;
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
</style>
