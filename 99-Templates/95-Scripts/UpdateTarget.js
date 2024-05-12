// In The Name of Allah, The Most Beneficent, The Most Merciful

async function UpdateTarget(tp) {
    new Notice("testing")

    const WorkingFile = await app.workspace.getActiveFile()
    const WorkingData = await app.vault.read(WorkingFile)

    const ListPattern = /(## .+\n+)(\*\*Complete\*\*\n){0,}(((\-\ \[x\]\ .+)|(\-\ \[\ \]\ .+))\n+){0,}/gm
    const TrackingFile = await app.workspace.getActiveFile().parent.children.find(file=>{
        if(file.name.match(/.+ Tracking/)) return File
    })

    if(!TrackingFile)
    {
        return
    } 
    const TrackingData = await app.vault.read(TrackingFile)

    const lists = TrackingData.match(ListPattern)
    
    console.log(TrackingData.match(ListPattern))
    
    const ListNumber = lists.length;
    
    const ItemsPattern= /(((\-\ \[x\]\ .+)$|(\-\ \[\ \]\ .+))$){1,}/gm

    let itemsNumber =0;
    let Target =0;
    let value = 0;
    lists.forEach((list,index) => {
        console.log(list.match(ItemsPattern))
        let current =  (list.match(ItemsPattern)) ? list.match(ItemsPattern).length : 0
        itemsNumber += current;
        // console.log(`${list.match(Itemspattern)}\n${current}`)
        console.log(`${value} += ${index} * ${current} => ${(index) * current} `)
        value += (index) * current;
    });

    Target = itemsNumber * ListNumber;

    let valuePattern = /(?=🏹\ {0,}:)((\ {0,}.+)+|.+)/gm
    let targetPattern = /(?=🎯\ {0,}:)((\ {0,}.+)+|.+)/gm

    let newData
    newData = WorkingData.replace(valuePattern,`🏹: ${value}`)
    newData = newData.replace(targetPattern,`🎯: ${Target}`)

    // let TargetPersentage = 100;
    // let ValuePersentage = Math.floor((value/Target) * 100)

    const TemplaterPattern = new RegExp(/\<\%(?!\+).+\%\>\n/g)
    newData = newData.replace(TemplaterPattern,"")
    // console.log(`${ValuePersentage} / ${TargetPersentage}`)
    // console.log()
    await app.vault.modify(
        WorkingFile,
        newData
    )
    .then(()=>{
        new Notice(`Target updated`)
    })
    .catch((err)=>{
        new Notice(`Failed to update Target\ncheck console  double click\n[ ctrl + shift + i]`)
    })


    // console.log(`Target = ${Target}\nvalue = ${value}\nTotal Items = ${itemsNumber}\nList number = ${ListNumber}`)

} 

module.exports = UpdateTarget