<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	import "./+page.css"
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<picture>
		<source srcset={welcome} type="image/webp" />
		<img src={welcome_fallback} alt="Welcome" />
	</picture>
</section>

<section>
	<div>
		<h2>ZWI Page Scan</h2>
	</div>
	
	<div>
		<h2>ZWI SEO Insight</h2>
		<p>Get SEO information about your page</p>
	</div>
</section>
