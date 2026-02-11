<script>
	import { init_locales } from '$hooks/i18n';
	import { keyListener } from '$utils/listener';
	import { onMount } from 'svelte';
	import './styles.css';
	import Dialog from '$container/dialog/dialog.svelte';
	import Header from './header.svelte';
	
	onMount(() => {
		window.addEventListener('keydown', keyListener);
		return () => window.removeEventListener('keydown', keyListener);
	})
	init_locales()
</script>

<Dialog />
<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer> </footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
	}
</style>
