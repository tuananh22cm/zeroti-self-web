<script lang="ts">
	import logo from '$lib/images/favicon-512.png';
</script>

<!-- <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p> -->

<footer>
	<img src={logo} height="58px" alt="zeroti logo" />

	<p>
		Zeroti Web Insight<br />
		V1.0.0-alpha-0
	</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
		text-align: center;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
