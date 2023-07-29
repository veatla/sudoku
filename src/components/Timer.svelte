<script lang="ts">
	import { number_to_time, timer_store } from '../shared/timer_store';
	import { fly, slide } from 'svelte/transition';

	let counter = '00:00';

	$: {
		counter = number_to_time($timer_store.count);
	}

	function handle_click() {
		timer_store.update((prev) => ({ ...prev, paused: !prev.paused }));
	}
</script>

<div class="timer-wrapper">
	<div class="timer">{counter}</div>
	<div class="pause" role="presentation" on:click={handle_click}>
		<button class="button">
			<svg
				width="24px"
				height="24px"
				viewBox="0 0 24 24"
				fill="none"
				class="svg-icon"
				xmlns="http://www.w3.org/2000/svg"
			>
				{#if $timer_store.paused}
					<path
						in:fly={{ duration: 100 }}
						out:slide={{ duration: 100 }}
						d="M7.50632 3.14928C6.1753 2.29363 4.4248 3.24931 4.4248 4.83164V19.1683C4.4248 20.7506 6.1753 21.7063 7.50632 20.8507L18.6571 13.6823C19.8817 12.8951 19.8817 11.1049 18.6571 10.3176L7.50632 3.14928Z"
						fill="currentColor"
					/>
				{:else}
					<path
						in:fly={{ duration: 100 }}
						out:slide={{ duration: 100 }}
						d="M6 3C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H9C10.1046 21 11 20.1046 11 19V5C11 3.89543 10.1046 3 9 3H6Z"
						fill="currentColor"
					/>
					<path
						in:fly={{ duration: 100 }}
						out:slide={{ duration: 100 }}
						d="M15 3C13.8954 3 13 3.89543 13 5V19C13 20.1046 13.8954 21 15 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H15Z"
						fill="currentColor"
					/>
				{/if}
			</svg>
		</button>
	</div>
</div>

<style>
	.timer-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--sudoku-text-color);
	}
	.timer {
		font-weight: 700;
		margin-right: 5px;
	}
	.svg-icon {
		cursor: pointer;
		width: 16px;
		height: 16px;
		color: var(--app-background);
	}
	.button {
		outline: none;
		border: none;
		border-radius: 50%;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--sudoku-text-color);
	}
</style>
