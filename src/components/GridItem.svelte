<script lang="ts">
	export let value: number;
	export let id: string;
	export let onChange: () => void;
</script>

<button {id} on:click={onChange} class="grid-item">{value}</button>

<style>
	.grid-item {
		border: 1px solid var(--grid-divider-default);
		width: 50px;
		height: 50px;
		text-align: center;
		background-color: #eeeeee;
		user-select: none;
		cursor: pointer;
	}
	.grid-item:nth-of-type(3),
	.grid-item:nth-of-type(6) {
		border-right-color: var(--grid-divider-strong);
	}
	.grid-item:nth-of-type(4),
	.grid-item:nth-of-type(7) {
		border-left-color: var(--grid-divider-strong);
	}
</style>
