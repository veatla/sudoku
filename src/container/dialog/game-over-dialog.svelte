<script>
	import { get_random_seed } from '$/funcs/get-random-seed';
	import Button from '$/shared/ui/button.svelte';
	import { t } from '$hooks/i18n';

	function handle_click() {
		window.location.href = '/';
		window.location.href = `/${get_random_seed()}`;
	}
</script>

<div class="content-wrapper">
	<h3>{$t('title.you_lose')}</h3>
	<p>{$t('you_made_3_mistakes')}</p>
	<Button on:click={() => location.reload()}>{$t('button.restart')}</Button>
	<Button on:click={handle_click}>{$t('button.new_game')}</Button>
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
