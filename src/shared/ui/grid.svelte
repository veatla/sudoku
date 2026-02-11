<script lang="ts">
	import { get } from "svelte/store";

	import { SUDOKU_FIELDS_COUNT } from "$constants";
	import { get_random_seed } from "$funcs/get-random-seed";
	import dialog_store, { DIALOG_STORE } from "$shared/dialog-store";
	import { timer_store } from "$shared/timer-store";
	import { active_field } from "$shared/active-field";
	import { celebrated_units, filled_counts, last_filled_cell, sudoku_store } from "$shared/sudoku-store";
	import { SUDOKU_DIFFICULTY, get_sudoku } from "$utils/sudoku";
	import { get_completed_units } from "$utils/check-completed-units";
	import GridItem from "./grid-item.svelte";

	let previous_units = { rows: new Set<number>(), cols: new Set<number>(), blocks: new Set<number>() };
	let celebrate_timeout: ReturnType<typeof setTimeout> | null = null;
	let completed_units_initialized = false;

	export let resolve_seed: string | null | undefined;
	export let difficulty: SUDOKU_DIFFICULTY = SUDOKU_DIFFICULTY.easy;
	export let fill_seed: string | null | undefined;

	let set_timer: number | null = null;
	// const fields = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	const fields = Array.from({ length: 81 }, (_, i) => i + 1);

	function generate_sudoku() {
		completed_units_initialized = false;
		if (celebrate_timeout) {
			clearTimeout(celebrate_timeout);
			celebrate_timeout = null;
		}
		celebrated_units.set({ rows: [], cols: [], blocks: [], origin: null });
		const sudoku = get_sudoku(resolve_seed, fill_seed, difficulty);

		filled_counts.set({
			solved: sudoku.filled_fields,
			unsolved: SUDOKU_FIELDS_COUNT - sudoku.filled_fields
		});

		sudoku_store.set({
			errors_count: 0,
			solved: sudoku.solved,
			unsolved: sudoku.unresolved,
			mode: "input"
		});
	}

	function handle_on_click_field(row: number, column: number) {
		active_field.set({
			column: column,
			row: row
		});
	}

	$: difficulty, resolve_seed, fill_seed, generate_sudoku();

	$: {
		if (0 === $filled_counts.unsolved) {
			setTimeout(() => {
				dialog_store.set(DIALOG_STORE.YOU_WIN);
			}, 300);
		}
		if ($sudoku_store.errors_count >= 3) {
			if (import.meta.env.MODE === "development") {
				console.log("You lose!");
			} else {
				dialog_store.set(DIALOG_STORE.YOU_LOSE);
			}
		}
	}

	$: {
		if ($timer_store.paused) {
			if (set_timer) clearInterval(set_timer);
			set_timer = null;
		} else if (!set_timer) {
			set_timer = setInterval(() => {
				timer_store.update((prev) => ({
					...prev,
					count: prev.count + 1
				}));
			}, 100);
		}
	}

	$: {
		const { unsolved, solved } = $sudoku_store;
		if (unsolved.length && solved.length) {
			const current = get_completed_units(unsolved, solved);
			if (!completed_units_initialized) {
				previous_units = {
					rows: new Set(current.rows),
					cols: new Set(current.cols),
					blocks: new Set(current.blocks)
				};
				completed_units_initialized = true;
			} else {
				const new_rows = current.rows.filter((r) => !previous_units.rows.has(r));
				const new_cols = current.cols.filter((c) => !previous_units.cols.has(c));
				const new_blocks = current.blocks.filter((b) => !previous_units.blocks.has(b));
				if (new_rows.length || new_cols.length || new_blocks.length) {
					if (celebrate_timeout) clearTimeout(celebrate_timeout);
					celebrated_units.set({
						rows: new_rows,
						cols: new_cols,
						blocks: new_blocks,
						origin: get(last_filled_cell)
					});
					celebrate_timeout = setTimeout(() => {
						celebrated_units.set({ rows: [], cols: [], blocks: [], origin: null });
						last_filled_cell.set(null);
						celebrate_timeout = null;
					}, 1400);
				}
				previous_units = {
					rows: new Set(current.rows),
					cols: new Set(current.cols),
					blocks: new Set(current.blocks)
				};
			}
		}
	}
</script>

<div class="grid">
	{#each fields as field}
		<!-- <div class="grid-row"> -->
		<!-- {#each fields as column} -->
		<GridItem
			on:click={() => {
				if ($timer_store.paused) return;
				let column = (field - 1) % 9;
				let row = Math.floor((field - 1) / 9);
				handle_on_click_field(row, column);
			}}
			data={field}
		/>
		<!-- {/each}
		</div> -->
	{/each}
</div>

<style>
	.grid {
		--grid-size: min(var(--sudoku-grid-max), calc(100vmin - var(--sudoku-section-gap)));
		width: var(--grid-size);
		height: var(--grid-size);
		max-width: 100%;
		max-height: 100%;
		box-sizing: border-box;
		border: 2px solid var(--sudoku-region-border);
		aspect-ratio: 1/1;
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		grid-template-rows: repeat(9, 1fr);
		overflow: visible;
	}

	:global(.grid-row:nth-child(3n) > *) {
		border-bottom-color: var(--sudoku-region-border);
	}

	:global(.grid-row:nth-child(3n + 1) > *) {
		border-top-color: var(--sudoku-region-border);
	}
</style>
