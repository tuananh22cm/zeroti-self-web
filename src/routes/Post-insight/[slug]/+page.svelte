<script lang="ts">
	import { page } from '$app/stores';
	export let data;
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
			} else {
				console.error('failed to delete');
			}
		} catch (error) {}
	};
</script>

<h1>
	{$page.params.slug}
</h1>
<div class="flex">
	<div class="post-iframe">
	</div>
	<div class="post-detail">
		<ul>
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
		</ul>
		<div>
			<button>Get Profile</button>
			<button>Save</button>
			<button on:click={()=>handleDelete(data.data[0].id)}>Delete Post</button>
		</div>
	</div>
</div>

<style>
</style>
