<script lang="ts">
	import { html } from 'gridjs';
	import DataGrid from '../../components/ag-grid-community/DataGrid.svelte';
	export let data;
	let keys = Object.keys(data?.data?.[0]).filter((x) => !['url'].includes(x));
	const columns = [
		{
			id: 'url',
			name: 'url',
			formatter: (cell: string) => html(`<a href='/Post-insight/${cell}'>${cell}</a>`)
		},
		{
			id: '_id',
			name: '_id',
			formatter: (cell: string) => html(`<a href='/Post-insight/${cell}'>${cell}</a>`)
		}
	];
	let page = '';
</script>
<svelte:head>
	<title>Post Insight - Zeroti Web Insight</title>
	<meta name="description" content="Hello" />
</svelte:head>
<section>
	<h1>Post Insight - Zeroti Web Insight</h1>
	<input placeholder="e.g. draphony.de" bind:value={page} />
	<button  disabled={page.length === 0}>Search</button>
</section>
<DataGrid data={data.data} {columns} />
