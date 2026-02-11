<script lang="ts">
	import { SUDOKU_REGION_LENGTH } from '$constants';
	import { active_field } from '$shared/active-field';
	import { sudoku_store } from '$shared/sudoku-store';
	import { timer_store } from '$shared/timer-store';
	import type { Grid } from '$utils/sudoku';

	export let column: number;
	export let row: number;

	const default_field = { value: 0, notes: [], state: 'default' };

	function check_active_region() {
		function check_condition(current: number, active: number) {
			// Check column region id (Inside 1,2 or 3rd region)
			const column_region = Math.floor(current / SUDOKU_REGION_LENGTH);

			// check active column region id
			const active_column_region = Math.floor(active / SUDOKU_REGION_LENGTH);

			return column_region === active_column_region;
		}
		const column_condition = check_condition(column, $active_field.column);
		const row_condition = check_condition(row, $active_field.row);

		return column_condition && row_condition;
	}

	let field = default_field as Grid[0][0],
		is_active_row = false,
		is_active_column = false,
		is_active_region = false;

	$: {
		is_active_row = $active_field.row === row;
		is_active_column = column === $active_field.column;
		is_active_region = check_active_region();
		const item = $sudoku_store.unsolved[row]?.[column];
		if (item) field = item;
	}
</script>

<button
	on:click
	data-active-row={is_active_row}
	data-state={field.state}
	data-active-column={is_active_column}
	data-active-region={is_active_region}
	data-active-field={is_active_column && is_active_row}
	class="grid-item"
>
	{#if !$timer_store.paused} 
		{#if field.value !== 0}
			{field.value}
		{:else if field.notes.length}
			{#each field.notes as note}
				<div class="note-item" data-note={note}>
					{note}
				</div>
			{/each}
		{/if}
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
		position: relative;
		outline: none;
	}

	@media only screen and ( max-width: 800px ) {
		.grid-item {
			width: calc(100% / 9);
			height: 100%;
		}
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

	.note-item {
		position: absolute;
		top: 0;
		left: 0;
		font-size: .9rem;
		font-weight: 400;
		color: var(--sudoku-region-border);
	}
	.note-item[data-note='1'] {
		top: 0%;
		left: 0%;
		transform: translate(50%, 0%);
	}
	.note-item[data-note='2'] {
		top: 0%;
		left: 50%;
		transform: translate(-50%, 0%);
	}
	.note-item[data-note='3'] {
		top: 0%;
		left: 100%;
		transform: translate(-150%, 0%);
	}
	.note-item[data-note='4'] {
		top: 50%;
		left: 0%;
		transform: translate(50%, -50%);
	}
	.note-item[data-note='5'] {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.note-item[data-note='6'] {
		top: 50%;
		left: 100%;
		transform: translate(-150%, -50%);
	}
	.note-item[data-note='7'] {
		bottom: 0;
		top: unset;
		left: 0;
		transform: translate(50%, 0%);
	}
	.note-item[data-note='8'] {
		bottom: 0;
		top: unset;
		left: 50%;
		transform: translate(-50%, 0%);
	}
	.note-item[data-note='9'] {
		bottom: 0;
		top: unset;
		left: 100%;
		transform: translate(-150%, 0%);
	}
</style>
