<script>
	import { get_random_seed } from '$funcs/get-random-seed';
	import Button from '$shared/ui/button.svelte';
	import { m } from '$lib/paraglide/messages';

	function handle_restart() {
		location.reload();
	}

	function handle_new_game() {
		window.location.pathname = `/${get_random_seed()}`;
	}
</script>

<div class="content-wrapper">
	<h3 class="title-lose">{m.title_you_lose()}</h3>
	<p class="message">{m.you_made_3_mistakes()}</p>
	<div class="buttons">
		<Button on:click={handle_restart}>{m.button_restart()}</Button>
		<Button on:click={handle_new_game}>{m.button_new_game()}</Button>
	</div>
</div>

<style>
	.content-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		border-radius: 12px;
		background-color: var(--color-bg-2);
		padding: 1.5rem 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		max-width: 320px;
	}

	.title-lose {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0;
		color: var(--error-text-color, #e53935);
	}

	.message {
		font-size: 1rem;
		line-height: 1.4;
		margin: 0;
		text-align: center;
		color: var(--color-text);
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		margin-top: 0.25rem;
	}
</style>
