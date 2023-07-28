<script>
	import Grid from '../../components/Grid.svelte';
	import InputButtons from '../../components/Numpad.svelte';
	import Timer from '../../components/Timer.svelte';
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Grid difficulty={data.difficulty} fill_seed={data.fill_seed} resolve_seed={data.resolved_seed} />
	<div class="right-side">
		<Timer />
		<InputButtons />
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
