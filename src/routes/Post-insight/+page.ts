// export async function load() {
//     return {
//         data: [
//             {
//                 namePage: "page a",
//                 linkPost:"google.com",
//                 like: 50,
//                 comment: 20,
//                 postTime: "20/10/2022",
//                 crawlTime: "21/11/2023",
//                 category: 'loan',
//                 assignProfile: 'account1',
//             },
//             {
//                 namePage: "page b",
//                 linkPost:"google.com",
//                 like: 50,
//                 comment: 20,
//                 postTime: "20/10/2022",
//                 crawlTime: "21/11/2023",
//                 category: 'loan',
//                 assignProfile: 'account1',
//             },
           
//         ]
//     }
// }

export async function load() {
    console.log('Fetching data...');
    const res = await fetch(`http://localhost:3001/SponsoredPost`);
    const data = await res.json();
    return { data };
  }