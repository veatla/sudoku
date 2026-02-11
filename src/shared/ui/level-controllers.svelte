<script>
	import { t } from "$hooks/i18n";
	import { set_field } from "$shared/active-field";
	import { remove_last_from_level_history } from "$shared/level-history";
	import { sudoku_store } from "$shared/sudoku-store";
	import Button from "./button.svelte";
	import Timer from "./timer.svelte";

	function handle_click_undo() {
		const item = remove_last_from_level_history();
		if (item) set_field(item);
	}

	function handle_click_note() {
		sudoku_store.update((prev) => {
			prev.mode = prev.mode === "input" ? "notes" : "input";
			return prev;
		});
	}
</script>

<div class="controllers-header">
	<p>
		{$t("sudoku.mistakes")}:
		{$sudoku_store.errors_count}/3
	</p>
	<Timer />
</div>
<div class="controllers">
	<Button
		on:click={handle_click_undo}
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
	<Button
		on:click={handle_click_note}
		--aspect-ratio="1/1"
		--width="56px"
		is_rounded
		class={$sudoku_store.mode === "notes" ? "note-button" : ""}
		variant="game"
		title="Note"
	>
		<svg
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17.0671 2.27157C17.5 2.09228 17.9639 2 18.4324 2C18.9009 2 19.3648 2.09228 19.7977 2.27157C20.2305 2.45086 20.6238 2.71365 20.9551 3.04493C21.2864 3.37621 21.5492 3.7695 21.7285 4.20235C21.9077 4.63519 22 5.09911 22 5.56761C22 6.03611 21.9077 6.50003 21.7285 6.93288C21.5492 7.36572 21.2864 7.75901 20.9551 8.09029L20.4369 8.60845L15.3916 3.56308L15.9097 3.04493C16.241 2.71365 16.6343 2.45086 17.0671 2.27157Z"
				fill="currentColor"
			/>
			<path
				d="M13.9774 4.9773L3.6546 15.3001C3.53154 15.4231 3.44273 15.5762 3.39694 15.7441L2.03526 20.7369C1.94084 21.0831 2.03917 21.4534 2.29292 21.7071C2.54667 21.9609 2.91693 22.0592 3.26314 21.9648L8.25597 20.6031C8.42387 20.5573 8.57691 20.4685 8.69996 20.3454L19.0227 10.0227L13.9774 4.9773Z"
				fill="currentColor"
			/>
		</svg>
	</Button>
</div>

<style>
	.controllers {
		justify-content: space-between;
		display: flex;
		grid-auto-rows: 1fr 1fr;
		gap: 10px;
		align-items: center;
		margin-bottom: 10px;
	}
	.controllers-header {
		justify-content: space-between;
		display: flex;
		gap: 10px;
	}
	.controllers-header p {
		font-weight: 700;
	}
	:global(.note-button) {
		border: 3px solid var(--color-theme-2) !important;
	}
</style>
