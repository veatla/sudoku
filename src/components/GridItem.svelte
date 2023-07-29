<script lang="ts">
	import { SUDOKU_REGION_LENGTH } from '../constants';
	import type { Grid } from '../utils/sudoku';

	export let value: number;
	export let id: string;
	export let active_row: number;
	export let active_column: number;
	export let column: number;
	export let row_id: number;
	export let state: Grid[0][0]['state'];
	export let on_click: () => void;

	function check_active_region() {
		const column_condition =
			Math.floor(column / SUDOKU_REGION_LENGTH) ===
			Math.floor(active_column / SUDOKU_REGION_LENGTH);
		const row_condition =
			Math.floor(row_id / SUDOKU_REGION_LENGTH) === Math.floor(active_row / SUDOKU_REGION_LENGTH);
		return column_condition && row_condition;
	}

	let is_active_row = false,
		is_active_column = false,
		is_active_region = false;

	$: {
		is_active_row = active_row === row_id;
		is_active_column = column === active_column;
		is_active_region = check_active_region();
	}
</script>

<button
	{id}
	on:click={on_click}
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
		border: 1px solid var(--sudoku-field-border);
		width: 50px;
		height: 50px;
		text-align: center;
		background-color: var(--sudoku-field-color);
		color: var(--sudoku-text-color);
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
	.grid-item:nth-of-type(3n) {
		border-right-color: var(--sudoku-region-border);
	}
	.grid-item:nth-of-type(3n + 1) {
		border-left-color: var(--sudoku-region-border);
	}
</style>
