<script lang="ts">
	import { SUDOKU_REGION_LENGTH } from '$constants';
	import { active_field } from '$shared/active_field';
	import { sudoku_store } from '$shared/sudoku_store';
	import { timer_store } from '$shared/timer_store';
	import type { Grid } from '$utils/sudoku';

	export let column: number;
	export let row: number;
	export let on_click: (value: number) => void;

	const default_field = { value: 0, notes: [], state: 'default' };

	function check_active_region() {
		function check_condition(current: number, active: number) {
			// Check column region id (Inside 1,2 or 3rd region)
			const column_region = Math.floor(current / SUDOKU_REGION_LENGTH);

			// check active column region id
			const active_column_region = Math.floor(active / SUDOKU_REGION_LENGTH);

			return column_region === active_column_region;
		}
		const column_condition = check_condition(column, $active_field.active_column);
		const row_condition = check_condition(row, $active_field.active_row);

		return column_condition && row_condition;
	}

	let field = default_field as Grid[0][0],
		is_active_row = false,
		is_active_column = false,
		is_active_region = false;

	$: {
		is_active_row = $active_field.active_row === row;
		is_active_column = column === $active_field.active_column;
		is_active_region = check_active_region();
		const item = $sudoku_store.unsolved_grid[row]?.[column];
		if (item) {
			field = item;
		}
	}
	function handle_on_click_field() {
		on_click(field.value);
	}
</script>

<button
	on:click={handle_on_click_field}
	data-active-row={is_active_row}
	data-state={field.state}
	data-active-column={is_active_column}
	data-active-region={is_active_region}
	data-active-field={is_active_column && is_active_row}
	class="grid-item"
>
	{#if field.value !== 0 && !$timer_store.paused}
		{field.value}
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
