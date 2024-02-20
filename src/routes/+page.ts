export async function load() {
    console.log('Fetching data...');
    const fetchAccount = await fetch(`http://localhost:3001/account/`);
    const data = await fetchAccount.json();
    return { data };
  }