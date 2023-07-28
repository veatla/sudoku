<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import GridItem from '../components/GridItem.svelte';
	import { get_sudoku, SUDOKU_DIFFICULTY, type Grid, unresolve_sudoku } from '../utils';
	import { SUDOKU_FIELDS_COUNT } from '../constants';
	import { get_random_seed } from '../funcs/get_random_seed';
	import dialog_store, { DIALOG_STORE } from '../shared/dialog_store';
	import { timer_store } from '../shared/timer_store';
	import { active_field, set_active_field } from '../shared/active_field';
	import { filled_counts, sudoku_store } from '../shared/sudoku_store';

	export let resolve_seed: string | undefined;
	export let difficulty: SUDOKU_DIFFICULTY = SUDOKU_DIFFICULTY.easy;
	export let fill_seed: string | undefined;

	let set_timer: NodeJS.Timer | number | null = null;

	const subscribe_to_key_input = (ev: KeyboardEvent) => {
		const value = Number(ev.key);

		/** If timer stopped, then disable input */
		if ($timer_store.paused) return false;
		/** Check if `value` is number */
		if (Number.isNaN(value)) return false;

		set_active_field(value, $active_field);
	};
	function on_mount_component() {
		window.addEventListener('keypress', subscribe_to_key_input);

		return () => {
			if (set_timer) clearInterval(set_timer);
			set_timer = null;
			window.removeEventListener('keypress', subscribe_to_key_input);
		};
	}
	function generate_sudoku(subscribe = true) {
		const sudoku = get_sudoku(resolve_seed, fill_seed, difficulty);

		filled_counts.set({
			solved: sudoku.filled_fields,
			unsolved: SUDOKU_FIELDS_COUNT - sudoku.filled_fields
		});

		sudoku_store.set({
			errors_count: 0,
			solved_grid: sudoku.solved,
			unsolved_grid: sudoku.unresolved
		});

		if (subscribe) {
			return on_mount_component();
		}
	}

	function handle_on_click_field(row: number, column: number, value: number) {
		active_field.set({
			active_column: column,
			active_value: value,
			active_solved_value: $sudoku_store.solved_grid[row][column],
			active_row: row
		});
	}

	onMount(generate_sudoku);

	$: {
		if (0 === $filled_counts.unsolved) {
			setTimeout(() => {
				alert('Congratulations! You finished the game!');
				const random = get_random_seed();
				window.location.pathname = random;
			}, 100);
		}
		if ($sudoku_store.errors_count >= 3) {
			dialog_store.set(DIALOG_STORE.YOU_LOSE);
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
</script>

<div class="grid">
	{#each $sudoku_store.unsolved_grid as rows, row_id}
		<div class="grid-row">
			{#each rows as { value, state }, column}
				<GridItem
					active_row={$active_field.active_row}
					active_column={$active_field.active_column}
					on_click={() => handle_on_click_field(Number(row_id), column, value)}
					id={row_id + ':' + column}
					{column}
					{row_id}
					value={$timer_store.paused ? 0 : value}
					{state}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.grid {
		border: 1px solid var(--sudoku-region-border);
	}
	.grid-row {
		display: flex;
		border-collapse: collapse;
		color: var(--sudoku-text-color);
		font-size: 2rem;
	}
	:global(.grid-row:nth-child(3n) > *) {
		border-bottom-color: var(--sudoku-region-border);
	}

	:global(.grid-row:nth-child(3n + 1) > *) {
		border-top-color: var(--sudoku-region-border);
	}
</style>
