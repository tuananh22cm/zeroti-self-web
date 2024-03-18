<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import DataGrid from '../components/ag-grid-community/DataGrid.svelte';
	import { html, h } from 'gridjs';
	export interface IGlobalAccount {
		_id: string;
		name: string;
		link: string;
		account: string;
	}
	import { onMount } from 'svelte';
	export let selected = writable<IGlobalAccount | null>(null);
	export { load } from './+page';
</script>

<script lang="ts">
	import { load } from './+page';
	load();

	onMount(() => {
		const storedOption = localStorage.getItem('selectedOption');
		if (storedOption) {
			selected.set(JSON.parse(storedOption));

		}
	});

	const handleDelete = async (id: string, url: string) => {
		try {
			const response = await fetch(`http://localhost:3001/profileScan/trash`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ profileId: id, url })
			});
			if (response.ok) {
				handleGetListProfile(selectedAccountId).then((result) => {
					listProfile = result;
				});
			} else {
				console.error('failed to delete');
			}
		} catch (error) {}
	};
	const calculateDay=(hour:string):string=>{
  		if(Number(hour)>24){
    		return Math.round(Number(hour)/24)+" Ngày"
  		}
  		else
    		return hour +" Giờ"
	}
	const columns = [
		{
			id: 'name',
			name: 'Name'
		},
		{
			id: 'cmtTime',
			name: 'Comment Time',
			formatter: (cell:string) => `${calculateDay(cell)}`
		},
		{
			id: 'content',
			name: 'Content'
		},
		{
			id: '_id',
			name: '_id',
			hidden: true
		},
		{
			id: 'link',
			name: 'link',
			hidden: true
		},
		{
			id: 'action',
			name: 'Action',
			formatter: (cell: string, row: any) => {
				return h(
					'button',
					{
						onClick: () => handleDelete(row.cells[3].data, row.cells[4].data) // Assuming the 'id' column is at index 3, adjust as needed
					},
					'❌'
				);
			}
		}
	];

	export let data;
	let selectedAccountId: string;
	let nameAccount: string;
	const unsubscribe = selected.subscribe((value) => {
		selectedAccountId = value ? value._id : '';
		nameAccount = value ? value.name : '';
	});
	let listProfile = data.listProfile;
	const handleGetListProfile = async (id: string) => {
		const fetchProfile = await fetch(`http://localhost:3001/profileScan/account?account=${id}`);
		const listProfile = await fetchProfile.json();
		return listProfile;
	};
	const handleSendMessage = async () => {
		const listId = listProfile.map((item: any) => {
			return {
				idProfile: item._id,
				profileUrl: item.link,
				accountWorker: selectedAccountId,
				account: nameAccount
			};
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
	const handleChange = (event: Event) => {
		const selectedValue = (event.target as HTMLSelectElement).value;
		const selectedOption = data.data.find((item: IGlobalAccount) => item._id === selectedValue);
		selected.set(selectedOption || null);
		localStorage.setItem('selectedOption', JSON.stringify(selectedOption));
	};
	const handleScroll = async () => {
		try {
			const response = await fetch(`http://localhost:3001/account/scroll`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ account: nameAccount })
			});
			if (response.ok) {
				console.log('scroll is in progress');
			} else {
				console.error('failed to delete');
			}
		} catch (error) {
			console.log('error :', error);
		}
	};
	const handleScrollFromSearch = async () => {
		try {
			const response = await fetch(`http://localhost:3001/account/scrollBySearch`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ account: nameAccount })
			});
			if (response.ok) {
				console.log('scroll is in progress');
			} else {
				console.error('failed to delete');
			}
		} catch (error) {
			console.log('error :', error);
		}
	};
	const initialValue = data?.data[0];
	if (initialValue) {
		selected.set(initialValue);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<select on:change={handleChange} value={selectedAccountId}>
		{#each data.data as value}
			<option value={value._id}>{value.name}</option>
		{/each}
	</select>
</section>
<section style="display: flex; flex-direction:row-reverse;margin-bottom:20px;gap:30px">
	<button on:click={handleScrollFromSearch}>or find by search  🔍</button>
	<button on:click={handleScroll}>Let's find more Post 🔍</button>
</section>
<section>
	<DataGrid data={listProfile} {columns} />
	<div class="right">
		<button on:click={handleSendMessage} class="send-message">Send Message 📩</button>
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
