<script>
	import { page } from '$app/stores';
</script>

<h1>
	{$page.params.slug}
</h1>

<div class="flex">
	<div class="post-iframe">
		<iframe
			src="https://www.facebook.com/"
			width="500"
			height="650"
			scrolling="no"
			frameborder="0"
			allowfullscreen="true"
			allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
		></iframe>
	</div>
	<div class="post-detail">
		<ul>
			<li>Post Name :</li>
			<li>Like :</li>
			<li>CMT</li>
			<li>Category <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select></li>
			<li>Assign profile <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select></li>
		</ul>
        <div>
            <button>Get Profile</button>
            <button>Save</button>
            <button>Delete Post</button>
        </div>
	</div>
</div>

<style>

	
</style>
