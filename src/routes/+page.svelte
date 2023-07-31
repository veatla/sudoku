<script>
	import Button from '$components/Button.svelte';
	import { get_random_seed } from '$funcs/get_random_seed';
	import { t } from '$hooks/i18n';

</script>

<svelte:head>
	<title>{$t('page.main')}</title>
	<meta name="description" content="Sudoku" />
</svelte:head>

<section>
	<a href={`/${get_random_seed()}`}>
		<Button>
			{$t('button.play')}
		</Button>
	</a>
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
