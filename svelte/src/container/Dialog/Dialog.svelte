<script>
	import dialog_store, { DIALOG_STORE } from '$shared/dialog_store';
	import YouLoseDialog from './GameOverDialog.svelte';
	import YouWinDialog from './YouWinDialog.svelte';

	/** @argument {MouseEvent} ev */
	function click_handler(ev) {
		if (ev.target instanceof HTMLElement) {
			const element = ev.target;
			if (!element.closest('#dialog-content')) {
				dialog_store.set(DIALOG_STORE.NONE);
			}
		}
	}
	function subscriber() {
		window.document.addEventListener('click', click_handler);
		return () => {
			window.document.removeEventListener('click', click_handler);
		};
	}
</script>

<div id="dialog-root" data-active={$dialog_store !== DIALOG_STORE.NONE}>
	<div id="dialog-content">
		{#if $dialog_store === DIALOG_STORE.YOU_LOSE}
			<YouLoseDialog />
		{:else if $dialog_store === DIALOG_STORE.YOU_WIN}
			<YouWinDialog {subscriber} />
		{/if}
	</div>
</div>

<style>
	#dialog-root {
		z-index: 1000;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: none;
		justify-content: center;
		align-items: center;
		visibility: hidden;
		background-color: hsla(0, 0%, 0%, 0.6);
	}

	#dialog-root[data-active='true'] {
		visibility: visible;
		display: flex;
	}
</style>
