<script>
	import { onMount } from 'svelte';
	import GridItem from '../components/GridItem.svelte';
	import { createEmptyGrid, fillDiagonalBlocks, solvedVersion } from '../utils';
	/** @type {number[][]} */
	let grid = [];
	/** @type {number[][]} */
	let solved = [];

	function generate_sudoku() {
		grid = createEmptyGrid();
		fillDiagonalBlocks(grid);
		solved = solvedVersion(grid);
	}

	/**
	 * @type {{
	 * 	row:number,
	 * 	column: number
	 * 	value: number
	 * 	solved_value: number
	 * }}
	 * */
	let selected_item = {
		row: 0,
		column: 0,
		value: 0,
		solved_value: 0
	};

	/**
	 * @param {number} row
	 * @param {number} column
	 * @param {number} value
	 */
	function handleChange(row, column, value) {
		selected_item.row = row;
		selected_item.column = column;
		selected_item.value = value;
		selected_item.solved_value = solved[row][column];
	}

	$: {
		if (selected_item) {
			console.log(selected_item);
		}
	}
	onMount(generate_sudoku);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#each grid as rows, rowId}
		<div class="grid-row">
			{#each rows as value, id}
				<GridItem
					onChange={() => handleChange(Number(rowId), id, value)}
					id={rowId + ':' + id}
					{value}
				/>
			{/each}
		</div>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	.grid-row {
		display: flex;
		border-collapse: collapse;
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
