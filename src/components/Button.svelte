<script lang="ts">
	export let variant: 'default' | 'secondary' | 'game' = 'default';
	export let disabled: boolean = false;
	export let on_click: (() => void) | undefined = undefined;
</script>

<button {disabled} on:click={on_click} class={['btn', variant].join(' ')} data-variant={variant}>
	<slot />
</button>

<style>
	.btn {
		border: none;
		padding: 1em 5em;
		font-size: 1em;
		font-weight: 700;
		border-radius: 5px;
	}
	.btn:not(:disabled) {
		cursor: pointer;
	}
	.btn:is(.default) {
		width: 100%;
		background-color: #0059b3;
		color: var(--white-color-text);
	}
	.btn:is(.default):hover {
		background-color: hsl(210, 100%, 30%);
	}
	.btn:is(.default):active {
		background-color: #0072e3;
	}
	.btn:is(.game) {
		box-sizing: border-box;
		background-color: #eaeef4;
		color: #0059b3;
		display: flex;
		justify-content: center;
		padding: 0;
		width: 100px;
		height: 100px;
		align-items: center;
	}
	.btn:is(.game):disabled {
		background-color: #cbd2dd;
	}
	.btn:is(.game):not(:disabled):hover {
		background-color: #dce3ed;
	}
	.btn:is(.game):not(:disabled):active {
		background-color: #d2dae7;
	}
</style>
