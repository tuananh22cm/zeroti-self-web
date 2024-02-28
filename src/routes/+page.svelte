<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import DataGrid from '../components/ag-grid-community/DataGrid.svelte';
	import { html, h } from 'gridjs';
	export let selected = writable('');
	export { load } from './+page';
</script>

<script lang="ts">
	import { load } from './+page';
	load();

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`http://localhost:3001/profileScan/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				window.location.reload();
			} else {
				console.error('failed to delete');
			}
		} catch (error) {}
	};

	const columns = [
		{
			id: 'name',
			name: 'Name'
		},
		{
			id: 'cmtTime',
			name: 'Comment Time'
		},
		{
			id: 'content',
			name: 'Content'
		},
		{
			id: '_id',
			name: 'ID',
			visible: false
		},
		{
			id: 'action',
			name: 'Action',
			formatter: (cell: string, row: any) => {
				return h(
					'button',
					{
						onClick: () => handleDelete(row.cells[3].data) // Assuming the 'id' column is at index 3, adjust as needed
					},
					'❌'
				);
			}
		}
	];

	export let data;
	let selectedAccountId: string;
	let listProfile = data.listProfile;
	console.log('listProfile :', listProfile);
	const handleGetListProfile = async (id: string) => {
		console.log(id);
		const fetchProfile = await fetch(`http://localhost:3001/profileScan/account?account=${id}`);
		const listProfile = await fetchProfile.json();
		return listProfile;
	};
	const handleSendMessage = async () => {
		const listId = listProfile.map((item: any) => {
			return {
				idProfile:item._id,
				profileUrl:item.link,
				accountWorker:selectedAccountId
			}
		});
		try {
			const response = await fetch(`http://localhost:3001/account/sendMessage`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ listProfile: listId })
			});
			if (response.ok) {
				console.log('send message successfully');
			} else {
				console.error('failed to delete');
			}
		} catch (error) {}
	};
	$: if (selectedAccountId) {
		handleGetListProfile(selectedAccountId).then((result) => {
			listProfile = result;
		});
	}

	const initialValue = data?.data[0];
	if (initialValue) {
		selectedAccountId = initialValue._id;
	}

	$: console.log('Changed selected:', selectedAccountId);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<select on:change={() => {}} value={selectedAccountId}>
		{#each data.data as value}
			<option value={value._id}>{value.name}</option>
		{/each}
	</select>
</section>
<section>
	<DataGrid data={listProfile} {columns} />
	<div class="right">
		<button on:click={handleSendMessage} class="send-message">Send Message</button>
	</div>
</section>

<style>
	.send-message {
		cursor: pointer;
		background-color: red;
		color: aliceblue;
		border: none;
		padding: 10px;
		transition: 0.2s;
	}
	.send-message:hover {
		opacity: 0.8;
		transform: scale(1.2);
	}
	.right {
		display: flex;
		justify-content: end;
		padding: 20px;
	}
</style>
