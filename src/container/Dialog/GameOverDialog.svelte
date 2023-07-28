<script>
	import Button from '../../components/Button.svelte';
	import { get_random_seed } from '../../funcs/get_random_seed';


	function handle_click() {
		window.location.href = '/';
		window.location.href = `/${get_random_seed()}`;
	}
</script>

<div class="content-wrapper">
	<h3>You Lose!</h3>
	<p>You have made 3 mistakes and lost this game</p>
	<Button on_click={() => location.reload()}>Restart</Button>
	<Button on_click={handle_click}>New Game</Button>
</div>

<style>
	.content-wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;

		border-radius: 4px;
		background-color: var(--color-bg-2);
		padding: 1rem;
	}
	h3 {
		font-size: 1.5rem;
		line-height: 0.1rem;
	}
	p {
		font-size: 1rem;
	}
</style>
