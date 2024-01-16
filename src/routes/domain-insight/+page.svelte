<script lang="ts">
	import { html } from 'gridjs';
	import DataGrid from '../../components/ag-grid-community/DataGrid.svelte';
	export let data;

	let keys = Object.keys(data?.data?.[0]).filter((x) => !['domain'].includes(x));
	const columns = [
		{
			id: 'domain',
			name: 'Domain',
			formatter: (cell: string) => html(`<a href='/domain-insight/${cell}'>${cell}</a>`)
		},
		...keys
	];

	let page_newDomain = '';
	const onAddNewDomain = () => {
		// TODO: ...
	};

	async function onRefreshGrid() {
		// TODO: ...
		// const updates = await fetch('/api/domains?etag=abc&lastModified=2024-01-16T11:54:26.813Z') as any;
		// data.data = [...data.data, ...updates];
	}
</script>

<svelte:head>
	<title>Domain Insight - Zeroti Web Insight</title>
	<meta name="description" content="Hello" />
</svelte:head>

<section>
	<h1>Domain Insight - Zeroti SEO Insight</h1>
	<p>
		Enter domain URI starting with or without protocol "https" e.g. "https://draphony.de" OR
		"draphony.de"
	</p>

	<input placeholder="e.g. draphony.de" bind:value={page_newDomain} />
	<button on:click={onAddNewDomain} disabled={page_newDomain.length === 0}>Add New Domain</button>
	<button on:click={onRefreshGrid}>Refresh Data</button>
</section>

<DataGrid data={data.data} {columns} />
