export async function load() {
    // const promise = new Promise((promise) => {
    //     promise({
    //         data: [
    //             { id: 1, uri: '/', title: 'Draphony: IT-Schulung und Beratung. Azure Cloud. DevOps. AI', impressions: 1240, clicks: 123 },
    //             { id: 2, uri: '/lab', title: 'Lab Archive - Draphony' },
    //             { id: 3, uri: '/lab/azure-infrastructure-as-code-with-arm-bicep/', title: 'Azure Deployment - Infrastructure as Code with ARM/Bicep - Draphony' }
    //         ]
    //     });
    // })

    // return await promise;
    return {
        data: [
            { id: 1, uri: '/', title: 'Draphony: IT-Schulung und Beratung. Azure Cloud. DevOps. AI', impressions: 1240, clicks: 123 },
            { id: 2, uri: '/lab', title: 'Lab Archive - Draphony' },
            { id: 3, uri: '/lab/azure-infrastructure-as-code-with-arm-bicep/', title: 'Azure Deployment - Infrastructure as Code with ARM/Bicep - Draphony' }
        ]
    }
}
