<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import GridItem from '../components/GridItem.svelte';
	import { get_sudoku, SUDOKU_DIFFICULTY, type Grid } from '../utils';
	import { SUDOKU_FIELDS_COUNT } from '../constants';
	import { get_random_seed } from '../funcs/get_random_seed';
	import dialog_store, { DIALOG_STORE } from '../shared/dialog_store';
	import Timer from './Timer.svelte';
	import { timer_store } from '../shared/timer_store';

	export let resolve_seed: string | undefined;
	export let difficulty: SUDOKU_DIFFICULTY = SUDOKU_DIFFICULTY.easy;
	export let fill_seed: string | undefined;

	let sudoku_unsolved_grid: Grid = [];
	let sudoku_solved_grid: Grid = [];
	const errors_count = writable(0);

	let set_timer: NodeJS.Timer | number | null = null;

	/** Store which contains solved & unsolved counts of sudoku */
	const filled_counts = writable({
		solved: 0,
		unsolved: 81
	});

	/** Active selected field */
	const active_field = writable({
		active_column: 0,
		active_row: 0,
		active_solved_value: {
			value: 0,
			state: 'none'
		},
		active_value: 0
	});

	const subscribe_to_key_input = (ev: KeyboardEvent) => {
		const value = Number(ev.key);

		const { active_row, active_column, active_solved_value, active_value } = $active_field;

		/** If timer stopped, then disable input */
		if ($timer_store.paused) return false;
		/** Check if `value` is number */
		if (Number.isNaN(value)) return false;

		const is_does_not_solved = active_value !== active_solved_value.value;
		const is_solved = value === active_solved_value.value;

		if (is_does_not_solved) {
			sudoku_unsolved_grid[active_row][active_column].value = Number(ev.key);
			sudoku_unsolved_grid[active_row][active_column].state = is_solved ? 'ok' : 'err';

			if (!is_solved) {
				errors_count.set($errors_count + 1);
			} else {
				filled_counts.set({
					solved: $filled_counts.solved + 1,
					unsolved: $filled_counts.unsolved - 1
				});
			}
		}
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

		sudoku_unsolved_grid = sudoku.unresolved;
		sudoku_solved_grid = sudoku.solved;

		if (subscribe) {
			return on_mount_component();
		}
	}

	function handle_on_click_field(row: number, column: number, value: number) {
		active_field.set({
			active_column: column,
			active_value: value,
			active_solved_value: sudoku_solved_grid[row][column],
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
		if ($errors_count === 3) {
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

<Timer />
<div class="grid">
	{#each sudoku_unsolved_grid as rows, row_id}
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
