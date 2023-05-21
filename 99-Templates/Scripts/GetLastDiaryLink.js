async function GetLastDiaryLink(){
    const Today = await app.workspace.getActiveFile()

    const Folder = Today.parent

    // for(let folder of Folder.children)
    // {
    //     let data = await app.vault.read(folder);
    //     let pattern = new RegExp(/(\[\[.*\|\<\<before]])((\ \|)|(\|\ *))|((\ *\[\[.*\|\ *after\>\>]])|(\[\[.*\|\ *\|after\>\>]]))/gm)
    //     data = data.replace(pattern,"")
    //     // console.log(folder)
    //     await app.vault.modify(
    //         folder,
    //         data
    //     )
        
    // }
    let index = await Folder.children.findIndex((item,index)=>{
        if(item === Today)
        {
            console.log(`${item.name} : ${Today.name}`)
            return index
        }
        
    })
    
    const Before = await (index-1 >= 0) ? `[[${Folder.children[index-1].path}|<<before]]` : "";
    const After = await (index+1 <= Folder.children.length-1 ) ? `| [[${Folder.children[index+1].path}|after>>]]` : "";
    
    // new Notice("Notice DEEZ NUTZ")
    // new Notice(Before)
    // new Notice(After)
    return(`${Before} ${After}`)
} 

module.exports = GetLastDiaryLink;