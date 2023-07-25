<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import GridItem from '../components/GridItem.svelte';
	import { get_sudoku, type Grid } from '../utils';
	import { SUDOKU_FIELDS_COUNT } from '../constants';
	import { get_random_seed } from '../funcs/get_random_seed';

	export let resolve_seed: string | undefined;
	export let fill_seed: string | undefined;

	let grid: Grid = [];
	let solved: Grid = [];
	const errors_count = writable(0);
	const counts = writable({
		solved: 0,
		unsolved: 81
	});
	const active = writable({
		active_column: 0,
		active_row: 0,
		active_solved_value: {
			value: 0,
			state: 'none'
		},
		active_value: 0
	});

	const subscribe_to_input = (ev: KeyboardEvent) => {
		const value = Number(ev.key);
		if (Number.isNaN(value)) return false;
		const is_does_not_solved = $active.active_value !== $active.active_solved_value.value;
		const is_solved = value === $active.active_solved_value.value;
		if (is_does_not_solved) {
			grid[$active.active_row][$active.active_column].value = Number(ev.key);
			grid[$active.active_row][$active.active_column].state = is_solved ? 'ok' : 'err';

			if (!is_solved) {
				errors_count.set($errors_count + 1);
			} else {
				counts.set({
					solved: $counts.solved + 1,
					unsolved: $counts.unsolved - 1
				});
			}
		}
	};

	function generate_sudoku(subscribe = true) {
		const item = get_sudoku(resolve_seed, fill_seed);
		counts.set({
			solved: item.filled_fields,
			unsolved: SUDOKU_FIELDS_COUNT - item.filled_fields
		});
		grid = item.unresolved;
		solved = item.solved;
		if (subscribe) {
			window.addEventListener('keypress', subscribe_to_input);
			return () => {
				window.removeEventListener('keypress', subscribe_to_input);
			};
		}
	}

	function handleChange(row: number, column: number, value: number) {
		active.set({
			active_column: column,
			active_value: value,
			active_solved_value: solved[row][column],
			active_row: row
		});
	}

	onMount(generate_sudoku);

	$: {
		if (0 === $counts.unsolved) {
			setTimeout(() => {
				alert('Congratulations! You finished the game!');
				const random = get_random_seed();
				window.location.pathname = random;
			}, 100);
		}
		if ($errors_count === 3) {
			alert('ERROR! Restart the game!');
			const random = get_random_seed();
			window.location.pathname = random;
		}
	}
</script>

<div class="grid">
	{#each grid as rows, row_id}
		<div class="grid-row">
			{#each rows as { value, state }, column}
				<GridItem
					active_row={$active.active_row}
					active_column={$active.active_column}
					on_click={(element) => handleChange(Number(row_id), column, value)}
					id={row_id + ':' + column}
					{column}
					{row_id}
					{value}
					{state}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.grid {
		border: 1px solid var(--grid-divider-strong);
	}
	.grid-row {
		display: flex;
		border-collapse: collapse;
		color: var(--sudoku-text-color);
		font-size: 2rem;
	}
	:global(.grid-row:nth-child(3) > *),
	:global(.grid-row:nth-child(6) > *) {
		border-bottom-color: var(--grid-divider-strong);
	}

	:global(.grid-row:nth-child(4) > *),
	:global(.grid-row:nth-child(7) > *) {
		border-top-color: var(--grid-divider-strong);
	}
</style>
