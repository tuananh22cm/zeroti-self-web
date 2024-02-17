
export async function load({ params }) {
	console.log('Fetching data...');
	const res = await fetch(`http://localhost:3001/SponsoredPost/${params.slug}`);
	const data = await res.json();
    console.log('data fetch :',data)
	return { data };
}
