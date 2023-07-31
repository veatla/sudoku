<script lang="ts">
	import { active_field, set_active_field } from '$shared/active_field';
	import Button from './Button.svelte';

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	function handle_click_number(num: number) {
		set_active_field(num, $active_field);
	}
	$: console.log($active_field.active_solved_value.state === 'default')
</script>

<div class="buttons-list">
	{#each numbers as number}
		<Button
			disabled={$active_field.active_solved_value.state === 'default'}
			variant="game"
			on_click={() => handle_click_number(number)}
		>
			<h1>{number}</h1>
		</Button>
	{/each}
</div>

<style>
	.buttons-list {
		box-sizing: border-box;
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(3, 100px);
	}
</style>
