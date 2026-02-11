<script lang="ts">
	import { onMount } from "svelte";

	import { SUDOKU_FIELDS_COUNT } from "$constants";
	import { get_random_seed } from "$funcs/get-random-seed";
	import dialog_store, { DIALOG_STORE } from "$shared/dialog-store";
	import { timer_store } from "$shared/timer-store";
	import { active_field } from "$shared/active-field";
	import { filled_counts, sudoku_store } from "$shared/sudoku-store";
	import { SUDOKU_DIFFICULTY, get_sudoku } from "$utils/sudoku";
	import GridItem from "./grid-item.svelte";

	export let resolve_seed: string | null | undefined;
	export let difficulty: SUDOKU_DIFFICULTY = SUDOKU_DIFFICULTY.easy;
	export let fill_seed: string | null | undefined;

	let set_timer: number | null = null;
	// const fields = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	const fields = Array.from({ length: 81 }, (_, i) => i + 1);

	function generate_sudoku() {
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

	onMount(generate_sudoku);

	$: {
		if (0 === $filled_counts.unsolved) {
			setTimeout(() => {
				alert("Congratulations! You finished the game!");
				const random = get_random_seed();
				window.location.pathname = random;
			}, 100);
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
</script>

<div class="grid">
	{#each fields as field}
		<!-- <div class="grid-row"> -->
		<!-- {#each fields as column} -->
		<GridItem
			on:click={() => {
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
		width: 452px;
		height: 452px;
		box-sizing: border-box;
		border: 2px solid var(--sudoku-region-border);
		aspect-ratio: 1/1;
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		grid-template-rows: repeat(9, 1fr);
	}

	/* Twitch extension target: ~318x496 — remove extra padding, keep grid visible */
	@media only screen and (max-width: 320px) and (max-height: 500px) {
		.grid {
			width: calc(100vw - 10px);
			height: calc(100vw - 10px);
		}
	}

	:global(.grid-row:nth-child(3n) > *) {
		border-bottom-color: var(--sudoku-region-border);
	}

	:global(.grid-row:nth-child(3n + 1) > *) {
		border-top-color: var(--sudoku-region-border);
	}
</style>
