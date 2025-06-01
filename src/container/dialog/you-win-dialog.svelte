<script>
	import { onMount } from 'svelte';

	/** @type {() => void} */
	export let subscriber;
	onMount(subscriber);
</script>

<div>You Win!</div>
