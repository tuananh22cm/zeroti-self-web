<script lang="ts">
	import DataGrid from '../../components/ag-grid-community/DataGrid.svelte';
	import type { PageData } from './$types';

	// magic variable name!
	export let data: PageData;

	let page_newUri = '';

	const onAddNewUri = () => {
		console.info(page_newUri);

		data.data = [...data.data, {
			uri: page_newUri,
			title: "",
			id: data.data.length
		}]
	};
</script>

<svelte:head>
	<title>SEO Insight - Zeroti Web Insight</title>
	<meta name="description" content="Hello" />
</svelte:head>

<section>
	<h1>ZWI - SEO Insight</h1>
	<p>Enter relative URI starting with "/" e.g. "/schulung"</p>

	<input placeholder="e.g. /schulung" bind:value={page_newUri} />
	<button on:click={onAddNewUri} disabled={page_newUri.length === 0}>Add New URI</button>
</section>

<section>
	<DataGrid data={data.data} />
</section>
