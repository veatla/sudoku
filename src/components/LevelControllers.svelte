<script>
	import { set_field } from '../shared/active_field';
	import { remove_last_from_level_history } from '../shared/level_history';
	import { sudoku_store } from '../shared/sudoku_store';
	import Button from './Button.svelte';
	import Timer from './Timer.svelte';

	function handle_click_undo() {
		const item = remove_last_from_level_history();
		if (item) {
			set_field(item);
		}
	}
</script>

<div class="controllers">
	<div class="controllers-header">
		<p>
			Mistakes:
			{$sudoku_store.errors_count}/3
		</p>
		<Timer />
	</div>
	<Button
		on_click={handle_click_undo}
		--aspect-ratio="1/1"
		--width="56px"
		is_rounded
		variant="game"
		title="Undo"
	>
		<svg
			class="undo-icon"
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.62095 6.20695C8.81127 5.25458 10.2564 4.5 11.9998 4.5C16.1419 4.5 19.4998 7.85786 19.4998 12C19.4998 16.1421 16.1419 19.5 11.9998 19.5C8.74488 19.5 5.97175 17.4254 4.93515 14.5256C4.74925 14.0055 4.22477 13.6568 3.68448 13.7713L2.70621 13.9787C2.16592 14.0932 1.81614 14.6262 1.98184 15.1531C3.32107 19.4112 7.2982 22.5 11.9998 22.5C17.7987 22.5 22.4998 17.799 22.4998 12C22.4998 6.20101 17.7987 1.5 11.9998 1.5C9.21627 1.5 7.04815 2.76845 5.48857 4.07458L3.70689 2.29289C3.42089 2.00689 2.99077 1.92134 2.6171 2.07612C2.24342 2.2309 1.99978 2.59554 1.99978 3V8.5C1.99978 9.05228 2.4475 9.5 2.99978 9.5H8.49978C8.90424 9.5 9.26888 9.25636 9.42366 8.88268C9.57844 8.50901 9.49289 8.07889 9.20689 7.79289L7.62095 6.20695Z"
				fill="currentColor"
			/>
		</svg>
	</Button>
</div>

<style>
	.controllers {
		justify-content: space-between;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}
	.controllers-header {
		justify-content: space-between;
		display: flex;
	}
	.controllers-header p {
		font-weight: 700;
	}
</style>
