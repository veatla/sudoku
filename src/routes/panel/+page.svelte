<script lang="ts">
	import Grid from "$shared/ui/grid.svelte";
	import LevelControllers from "$shared/ui/level-controllers.svelte";
	import Numpad from "$shared/ui/numpad.svelte";
	import { m } from "$lib/paraglide/messages";
	import { timer_store } from "$shared/timer-store";
	import Button from "$shared/ui/button.svelte";
	import { SUDOKU_DIFFICULTY } from "$utils/sudoku";

	const data = {
		fill_seed: undefined,
		resolved_seed: undefined
	};

	let selected_difficulty = "easy";

	const difficulty_options = [
		{ value: "easy", label: "Easy" },
		{ value: "medium", label: "Medium" },
		{ value: "hard", label: "Hard" },
		{ value: "expert", label: "Expert" },
		{ value: "evil", label: "Evil" }
	];

	const difficulty_map = {
		easy: SUDOKU_DIFFICULTY.easy,
		medium: SUDOKU_DIFFICULTY.medium,
		hard: SUDOKU_DIFFICULTY.hard,
		expert: SUDOKU_DIFFICULTY.expert,
		evil: SUDOKU_DIFFICULTY.evil
	};
	$: difficulty_value =
		difficulty_map[selected_difficulty as keyof typeof difficulty_map] ?? SUDOKU_DIFFICULTY.easy;

	function handle_start_or_continue() {
		timer_store.update((prev) => ({ ...prev, paused: false }));
	}
</script>

<svelte:head>
	<title>{m.page_game_title()}</title>
</svelte:head>
<section>
	<div class="grid-wrap">
		<Grid
			difficulty={difficulty_value}
			fill_seed={data.fill_seed}
			resolve_seed={data.resolved_seed}
		/>
		{#if $timer_store.paused}
			<div class="grid-overlay" role="presentation">
				<div class="overlay-content">
					{#if $timer_store.count === 0}
						<label class="difficulty-label">
							<span class="difficulty-label-text">{m.difficulty_label()}</span>
							<select
								class="difficulty-select"
								bind:value={selected_difficulty}
								aria-label={m.difficulty_label()}
							>
								{#each difficulty_options as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						</label>
					{/if}
					<div class="overlay-btn-wrap">
						<Button on:click={handle_start_or_continue} variant="default">
							{$timer_store.count === 0 ? m.button_start_game() : m.button_continue_game()}
						</Button>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="right-side">
		<LevelControllers />
		<div class="panel-numpad numpad-wrap">
			<Numpad />
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		flex-direction: row;
		column-gap: var(--sudoku-section-gap);
	}

	.grid-wrap {
		position: relative;
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		background: rgba(255, 255, 255, 0.25);
		border-radius: 4px;
		z-index: 5;
	}

	.overlay-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.difficulty-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
	}

	.difficulty-label-text {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.difficulty-select {
		font-size: 1rem;
		padding: 0.4rem 0.75rem;
		border-radius: 6px;
		border: 1px solid var(--sudoku-field-border);
		background: var(--color-bg-2, #fff);
		color: var(--color-text);
		cursor: pointer;
		min-width: 7rem;
	}

	.overlay-btn-wrap :global(button) {
		font-size: 1.1rem;
		padding: 0.75rem 1.5rem;
	}

	@media (orientation: portrait) {
		section {
			flex-direction: column;
			column-gap: 0;
			row-gap: var(--sudoku-section-gap);
		}
	}

	.right-side {
		display: flex;
		flex-direction: column;
		gap: var(--sudoku-ui-gap);
	}

	/* Twitch panel 318×496: compact column layout, hide numpad */
	@media (max-width: 320px) and (max-height: 500px) {
		section {
			flex-direction: column;
			column-gap: 0;
			row-gap: var(--sudoku-section-gap);
		}
		.panel-numpad {
			display: none;
		}
	}
</style>
