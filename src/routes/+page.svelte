<script>
	import Button from '../components/Button.svelte';
	import { get_random_seed } from '../funcs/get_random_seed';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<a href={`/${get_random_seed()}`}><Button>Play</Button></a>
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
