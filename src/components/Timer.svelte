<script lang="ts">
	import { cubicOut, quintOut } from 'svelte/easing';
	import { number_to_time, timer_store } from '../shared/timer_store';
	import { fade, draw, fly } from 'svelte/transition';

	let counter = '00:00';

	$: {
		counter = number_to_time($timer_store.count);
	}

	const paused_svg_path =
		'M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM8 8C8 7.44772 8.44772 7 9 7H10C10.5523 7 11 7.44772 11 8V16C11 16.5523 10.5523 17 10 17H9C8.44772 17 8 16.5523 8 16V8ZM13 8C13 7.44772 13.4477 7 14 7H15C15.5523 7 16 7.44772 16 8V16C16 16.5523 15.5523 17 15 17H14C13.4477 17 13 16.5523 13 16V8Z';
	const playing_svg_path =
		'M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM9.64109 7.19733C9.14132 6.89192 8.5 7.2516 8.5 7.83729V16.1627C8.5 16.7484 9.14132 17.1081 9.64109 16.8027L16.4528 12.64C16.9313 12.3475 16.9313 11.6525 16.4528 11.36L9.64109 7.19733Z';

	function handle_click() {
		timer_store.update((prev) => ({ ...prev, paused: !prev.paused }));
	}
</script>

<div class="timer-wrapper">
	<div class="timer">{counter}</div>
	<div role="presentation" class="pause" on:click={handle_click}>
		<svg
			width="800px"
			height="800px"
			viewBox="0 0 24 24"
			fill="none"
			class="svg-icon"
			xmlns="http://www.w3.org/2000/svg"
		>
			{#if $timer_store.paused}
				<path
					out:fade
					in:fly={{ duration: 200 }}
					fill-rule="evenodd"
					clip-rule="evenodd"
					fill="currentColor"
					d={playing_svg_path}
					local="true"
				/>
			{:else}
				<path
					out:fade
					in:fly={{ duration: 200 }}
					fill-rule="evenodd"
					clip-rule="evenodd"
					fill="currentColor"
					d={paused_svg_path}
					local="true"
				/>
			{/if}
		</svg>
	</div>
</div>

<style>
	.timer-wrapper {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.timer {
		font-weight: 700;
		color: #6f7782;
		margin-right: 5px;
	}
	.svg-icon {
		cursor: pointer;
		width: 25px;
		height: 25px;
		color: #6f7782;
		/* background-color: #6f7782; */
		border-radius: 50%;
	}
</style>
