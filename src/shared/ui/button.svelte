<script lang="ts">
	export let variant: "default" | "secondary" | "game" = "default";
	export let disabled: boolean = false;
	export let is_rounded: boolean = false;
	// export let on_click: (() => void) | undefined = undefined;
</script>

<button
	{disabled}
	on:click
	title={$$props.title}
	class={["btn", variant, $$props.class].join(" ").trim()}
	data-variant={variant}
	data-is-rounded={is_rounded}
>
	<slot />
</button>

<style>
	.btn {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: none;
		padding: var(--padding, 1em 5em);
		aspect-ratio: var(--aspect-ratio, unset);
		font-size: 1em;
		font-weight: 700;
		border-radius: 5px;
	}
	.btn:not(:disabled) {
		cursor: pointer;
	}
	.btn:is(.default) {
		width: var(--width, 100%);
		height: var(--width, 100%);
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
		width: var(--width, 100px);
		height: var(--width, 100px);
		align-items: center;
		font-size: 80%;
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
	.btn[data-is-rounded="true"] {
		border-radius: 50%;
	}
</style>
