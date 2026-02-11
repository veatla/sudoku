<script lang="ts">
	import { active_field, set_active_field_value } from "$shared/active-field";
	import { sudoku_store } from "$shared/sudoku-store";
	import { timer_store } from "$shared/timer-store";
	import Button from "./button.svelte";

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	function handle_click_number(num: number) {
		set_active_field_value(num, $active_field);
	}

	let is_active_field_solved = false;

	$: {
		const { column: col, row: row } = $active_field;
		const active_row = $sudoku_store.unsolved[row] || [];
		is_active_field_solved = active_row[col]?.state === "default";
	}

	$: is_paused = $timer_store.paused;
</script>

<div class="buttons-list" aria-disabled={is_paused}>
	{#each numbers as number}
		<Button
			disabled={is_active_field_solved || is_paused}
			variant="game"
			on:click={() => handle_click_number(number)}
		>
			<h1>{number}</h1>
		</Button>
	{/each}
</div>

<style>
	.buttons-list {
		box-sizing: border-box;
		display: grid;
		gap: var(--sudoku-ui-gap);
		grid-template-columns: repeat(3, auto);
		aspect-ratio: 1/1;
		transform: scale(var(--sudoku-numpad-btn-scale));
		transform-origin: center top;
	}
</style>
