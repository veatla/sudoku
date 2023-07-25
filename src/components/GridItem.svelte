<script lang="ts">
	import type { MouseEventHandler } from '../global';
	import type { Grid } from '../utils';

	export let value: number;
	export let id: string;
	export let active_row: number;
	export let active_column: number;
	export let column: number;
	export let row_id: number;
	export let state: Grid[0][0]['state'];
	export let on_click: (element: EventTarget & HTMLButtonElement) => void;

	function check_active_region() {
		const column_condition = Math.floor(column / 3) === Math.floor(active_column / 3);
		const row_condition = Math.floor(row_id / 3) === Math.floor(active_row / 3);
		return column_condition && row_condition;
	}

	let is_active_row = false,
		is_active_column = false,
		is_active_region = false;

	const handle_click: MouseEventHandler<HTMLButtonElement> = (e) => {
		on_click(e.currentTarget);
	};

	$: {
		is_active_row = active_row === row_id;
		is_active_column = column === active_column;
		is_active_region = check_active_region();
	}
</script>

<button
	{id}
	on:click={handle_click}
	data-active-row={is_active_row}
	data-state={state}
	data-active-column={is_active_column}
	data-active-region={is_active_region}
	data-active-field={is_active_column && is_active_row}
	class="grid-item"
>
	{#if value !== 0}
		{value}
	{/if}
</button>

<style>
	.grid-item {
		border: 1px solid var(--grid-divider-default);
		width: 50px;
		height: 50px;
		text-align: center;
		background-color: #eeeeee;
		user-select: none;
		cursor: pointer;
		outline: none;
	}
	.grid-item[data-active-column='true'] {
		background-color: var(--sudoku-active-line);
	}
	.grid-item[data-active-row='true'] {
		background-color: var(--sudoku-active-line);
	}
	.grid-item[data-active-region='true'] {
		background-color: var(--sudoku-active-region);
	}
	.grid-item[data-state='err'] {
		color: var(--error-text-color);
		background-color: var(--sudoku-error-field);
	}
	.grid-item[data-active-field='true'] {
		background-color: var(--sudoku-active-field);
	}
	.grid-item[data-state='ok'] {
		color: var(--solved-text-color);
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
