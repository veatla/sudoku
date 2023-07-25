<script>
	import { get_random_seed } from '../funcs/get_random_seed';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<a href={`/${get_random_seed()}`}><button class="new-game-btn">Play</button></a>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	.new-game-btn {
		
		cursor: pointer;
		color: var(--white-color-text);
		border: none;
		padding: 1em 5em;
		font-size: 1.5em;
		font-weight: 700;
		background-color: #0072e3;
		border-radius: 5px;
	}
	.new-game-btn:hover {
		background-color: #0059b3;
	}
	.new-game-btn:active {
		background-color: hsl(210, 100%, 30%);
	}
</style>
