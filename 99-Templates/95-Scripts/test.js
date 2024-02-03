 

async function main(){
    
    let List = [];
    let Dataview =  await app.plugins.plugins["dataview"].api;

    console.log(Dataview)


    // console.log(pages)
    
    let Pages = await Dataview
    .pages(`#Description and #Activities and #Project and (\"10-Project\")`)
    // .where(p => p[`🗓️`] > `2022/09/19`)

    for (const page of Pages)
    {
        List.push(page);
    }

    console.log(List)
    return List

}

module.exports = main