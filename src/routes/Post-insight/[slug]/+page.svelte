<script lang="ts">
	import { page } from '$app/stores';
	export let data;
	import {selected} from "../../+page.svelte";
	let assignProfileId:any;
	selected.subscribe(value => {
		assignProfileId = value
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
	}
	const handleGetProfile= async (payload:IPayLoad) =>{
		console.log("payload :",payload);
		try {
			const response = await fetch(`http://localhost:3001/profileScan/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body:JSON.stringify(payload)
			});
			if (response.ok) {
				console.log('post successfully');
			} else {
				console.error('failed to delete');
			}
		} catch (error) {
			
		}
	}
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
		<!-- <ul>
			<li>Post Name :{data.data[0].url}</li>
			<li>Like :</li>
			<li>CMT</li>
			<li>
				Category <select name="cars" id="cars">
					<option value="volvo">Volvo</option>
					<option value="saab">Saab</option>
					<option value="opel">Opel</option>
					<option value="audi">Audi</option>
				</select>
			</li>
			<li>
				Assign profile <select name="cars" id="cars">
					<option value="volvo">Volvo</option>
					<option value="saab">Saab</option>
					<option value="opel">Opel</option>
					<option value="audi">Audi</option>
				</select>
			</li>
		</ul> -->
		<div>
			<button on:click={()=>handleGetProfile({url:data.data[0].url,post:data.data[0]._id,assignProfile:assignProfileId._id})}>Get Profile</button>
			<button>Save</button>
			<button on:click={()=>handleDelete(data.data[0]._id)}>Delete Post</button>
		</div>
	</div>
</div>

<style>
</style>
