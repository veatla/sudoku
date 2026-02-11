<script lang="ts">
	import { SUDOKU_REGION_LENGTH } from "$constants";
	import { active_field } from "$shared/active-field";
	import { celebrated_units, sudoku_store } from "$shared/sudoku-store";
	import { timer_store } from "$shared/timer-store";
	import type { Grid } from "$utils/sudoku";
	import { get_block_index } from "$utils/check-completed-units";

	export let data: number;
	let column = (data - 1) % 9;
	let row = Math.floor((data - 1) / 9);
	const default_field = { value: 0, notes: [], state: "default" };

	function check_active_region() {
		function check_condition(a: string, current: number, active: number) {
			// Check column region id (Inside 1,2 or 3rd region)
			const column_region = Math.floor(current / SUDOKU_REGION_LENGTH);

			// check active column region id
			const active_column_region = Math.floor(active / SUDOKU_REGION_LENGTH);
			return column_region === active_column_region;
		}
		const column_condition = check_condition("col", column, $active_field.column);
		const row_condition = check_condition("row", row, $active_field.row);

		return column_condition && row_condition;
	}

	const RIPPLE_MS = 50;
	const RIPPLE_PAUSE = 700;
	const RIPPLE_DURATION = 200;

	let field = default_field as Grid[0][0],
		is_active_row = false,
		is_active_column = false,
		is_active_region = false,
		is_celebrated = false,
		ripple_delay_in = 0,
		ripple_delay_out = 0,
		ripple_center_x = "50%",
		ripple_center_y = "50%";

	$: {
		is_active_row = $active_field.row === row;
		is_active_column = column === $active_field.column;
		is_active_region = check_active_region();
		const item = $sudoku_store.unsolved[row]?.[column];
		if (item) field = item;
	}

	$: {
		const cu = $celebrated_units;
		const block = get_block_index(row, column);
		const in_row = cu.rows.includes(row);
		const in_col = cu.cols.includes(column);
		const in_block = cu.blocks.includes(block);
		is_celebrated = in_row || in_col || in_block;

		const origin = cu.origin;
		if (!is_celebrated || !origin) {
			ripple_delay_in = 0;
			ripple_delay_out = 0;
			ripple_center_x = "50%";
			ripple_center_y = "50%";
		} else {
			ripple_center_x = "50%";
			ripple_center_y = "50%";
			const r0 = origin.row;
			const c0 = origin.col;
			const dist_row = in_row ? Math.abs(column - c0) : 99;
			const dist_col = in_col ? Math.abs(row - r0) : 99;
			const dist_block = in_block
				? Math.max(Math.abs(row - r0), Math.abs(column - c0))
				: 99;
			const distance = Math.min(dist_row, dist_col, dist_block);
			const max_dist_row = 8;
			const max_dist_block = 2;
			const max_distance = in_row || in_col ? max_dist_row : max_dist_block;
			ripple_delay_in = distance * RIPPLE_MS;
			ripple_delay_out = RIPPLE_PAUSE + (max_distance - distance) * RIPPLE_MS;
		}
	}
</script>

<button
	on:click
	data-active-row={is_active_row}
	data-state={field.state}
	data-active-column={is_active_column}
	data-active-region={is_active_region}
	data-column={column}
	data-row={row}
	data-active-field={is_active_column && is_active_row}
	data-celebrated={is_celebrated}
	class="grid-item"
	style="--ripple-delay-in: {ripple_delay_in}ms; --ripple-delay-out: {ripple_delay_out}ms; --ripple-duration: {RIPPLE_DURATION}ms; --ripple-center-x: {ripple_center_x}; --ripple-center-y: {ripple_center_y};"
>
	{#if is_celebrated}
		<div class="celebrate-rect" aria-hidden="true"></div>
	{/if}
	<span class="grid-item-content">
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
	</span>
</button>

<style>
	.grid-item {
		border: 1px solid var(--sudoku-field-border);
		text-align: center;
		background-color: var(--sudoku-field-color);
		color: var(--sudoku-text-color);
		user-select: none;
		cursor: pointer;
		position: relative;
		outline: none;
		font-size: var(--sudoku-cell-font-size);
		font-weight: 700;
		transition: background-color 0.25s ease;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.grid-item-content {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}

	.grid-item[data-celebrated="true"] {
		z-index: 10;
	}

	.celebrate-rect {
		position: absolute;
		background: var(--sudoku-celebrate-bg, rgba(13, 71, 161, 0.45));
		z-index: 0;
		border-radius: 50%;
		/* диаметр ≥ диагональ ячейки (2√2 ≈ 283%), чтобы круг заполнил ячейку при scale(1) */
		width: 283%;
		height: 283%;
		left: var(--ripple-center-x);
		top: var(--ripple-center-y);
		transform: translate(-50%, -50%) scale(0) rotate(-4deg);
		transform-origin: center;
		animation:
			ripple-in var(--ripple-duration) cubic-bezier(0.34, 1.2, 0.64, 1) forwards,
			ripple-out var(--ripple-duration) cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
		animation-delay:
			var(--ripple-delay-in),
			var(--ripple-delay-out);
	}

	@keyframes ripple-in {
		0% {
			transform: translate(-50%, -50%) scale(0) rotate(-6deg);
			opacity: 0.6;
		}
		100% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
			opacity: 1;
		}
	}

	@keyframes ripple-out {
		0% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(0) rotate(4deg);
			opacity: 0.6;
		}
	}

	.grid-item[data-active-column="true"] {
		background-color: var(--sudoku-active-line);
	}
	.grid-item[data-active-row="true"] {
		background-color: var(--sudoku-active-line);
	}
	.grid-item[data-active-region="true"] {
		background-color: var(--sudoku-active-region);
	}
	.grid-item[data-state="err"] {
		color: var(--error-text-color);
		background-color: var(--sudoku-error-field);
	}
	.grid-item[data-active-field="true"] {
		background-color: var(--sudoku-active-field);
	}
	.grid-item[data-state="ok"] {
		color: var(--solved-text-color);
	}

	.grid-item[data-row="2"],
	.grid-item[data-row="5"] {
		border-bottom-color: var(--sudoku-region-border);
	}
	.grid-item[data-row="3"],
	.grid-item[data-row="6"] {
		border-top-color: var(--sudoku-region-border);
	}

	.grid-item[data-column="2"],
	.grid-item[data-column="5"] {
		border-right-color: var(--sudoku-region-border);
	}
	.grid-item[data-column="3"],
	.grid-item[data-column="6"] {
		border-left-color: var(--sudoku-region-border);
	}

	.note-item {
		position: absolute;
		top: 0;
		left: 0;
		font-size: var(--sudoku-note-font-size);
		font-weight: 400;
		color: var(--sudoku-region-border);
	}
	.note-item[data-note="1"] {
		top: 0%;
		left: 0%;
		transform: translate(50%, 0%);
	}
	.note-item[data-note="2"] {
		top: 0%;
		left: 50%;
		transform: translate(-50%, 0%);
	}
	.note-item[data-note="3"] {
		top: 0%;
		left: 100%;
		transform: translate(-150%, 0%);
	}
	.note-item[data-note="4"] {
		top: 50%;
		left: 0%;
		transform: translate(50%, -50%);
	}
	.note-item[data-note="5"] {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.note-item[data-note="6"] {
		top: 50%;
		left: 100%;
		transform: translate(-150%, -50%);
	}
	.note-item[data-note="7"] {
		bottom: 0;
		top: unset;
		left: 0;
		transform: translate(50%, 0%);
	}
	.note-item[data-note="8"] {
		bottom: 0;
		top: unset;
		left: 50%;
		transform: translate(-50%, 0%);
	}
	.note-item[data-note="9"] {
		bottom: 0;
		top: unset;
		left: 100%;
		transform: translate(-150%, 0%);
	}
</style>
