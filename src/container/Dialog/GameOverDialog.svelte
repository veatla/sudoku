<script>
	import { onMount } from 'svelte';
	import Button from '../../components/Button.svelte';

	/** @type {() => void} */
	export let subscriber;

	onMount(subscriber);
</script>

<div class="content-wrapper">
      <h3>You Lose!</h3>
      <p>You have made 3 mistakes and lost this game</p>
      <Button>
            Restart
      </Button>
      <Button>
            New Game
      </Button>
</div>

<style>
	.content-wrapper {
            display: flex;
            flex-direction: column;
            gap: 10px;

		border-radius: 4px;
		background-color: var(--color-bg-2);
		padding: 1rem;
	}
      h3 {
            font-size: 1.5rem;
            line-height: .1rem;
      }
      p {
            font-size: 1rem;
      }
</style>
