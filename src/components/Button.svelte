<script>
</script>

<button class="btn"><slot /></button>

<style>
	.btn {
		cursor: pointer;
		color: var(--white-color-text);
		border: none;
		padding: 1em 5em;
		font-size: 1em;
		font-weight: 700;
		background-color: #0072e3;
		border-radius: 5px;
	}
	.btn:hover {
		background-color: #0059b3;
	}
	.btn:active {
		background-color: hsl(210, 100%, 30%);
	}
</style>
