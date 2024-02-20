<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import DataGrid from '../components/ag-grid-community/DataGrid.svelte';
	
	// Create a writable store for the selected variable
	export let selected = writable('');
	
	// Export the load function from +page.ts
	export { load } from './+page';
  </script>
  
  <script lang="ts">
	import { load } from "./+page";
	load();
	
	export let data;
    const initialValue = data.data[0];
  selected.set(initialValue);
	$: console.log('Changed selected:', $selected);
	$: console.log('Updated options:', data);
  </script>
  
  <svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section>
	<select bind:value={$selected}>
	  {#each data.data as value}<option value={value}>{value.name}</option>{/each}
	</select>
  </section>
  <section>
	<DataGrid data={data.data} {columns} />
	
  </section>
  