<script lang="ts">
	import { page } from '$app/stores';
	export let data;
	import {selected} from "../../+page.svelte";
	let assignProfileId:any;
	let account:any;
	selected.subscribe(value => {
		assignProfileId = value?._id
		account = value?.name
	});
	const handleDelete = async (id:string) => {
		try {
			const response = await fetch(`http://localhost:3001/SponsoredPost/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				console.log('delete successfully');
				window.history.back();

			} else {
				console.error('failed to delete');
			}
		} catch (error) {}
	};
	interface IPayLoad{
		url:string,
		post:string
		assignProfile:string
		account:string
	}
	const handleGetProfile= async (payload:IPayLoad) =>{
		try {
			const response = await fetch(`http://localhost:3001/profileScan/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(payload)
			});
			if (response.ok) {
				console.log('get profile successfully');
				handleTrashPost(data.data[0]._id)
			} else {
				console.error('failed to get data');
			}
		} catch (error) {
		console.log('error :',error)	
		}
	}
	const handleTrashPost =async (id:string) => {
		try {
			const response = await fetch(`http://localhost:3001/SponsoredPost/trash`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ postId: id ,url:data.data[0].url})

			});
			if (response.ok) {
				console.log('add to trash post successfully');
				window.history.back();

			} else {
				console.error('failed to add to trash post');
			}
		} catch (error) {}
	};
</script>

<h1>
	{$page.params.slug}
</h1>
<div class="flex">
	<div class="post-iframe">
		<p>
			{@html data.data[0].rawUrl}
		</p>
	</div>
	<div class="post-detail">
		<a href={data.data[0].url} target="_blank" >
			{@html data.data[0].url}

		</a>
		
		<div>
			<button on:click={()=>handleGetProfile({url:data.data[0].url,post:data.data[0]._id,assignProfile:assignProfileId,account})}>Get Profile</button>
			<button on:click={()=>handleTrashPost(data.data[0]._id)}>Trash post 🗑</button>
			<button on:click={()=>handleDelete(data.data[0]._id)}>delete ❌</button>
		</div>
	</div>
</div>

<style>
</style>
