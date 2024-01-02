async function UpdateTarget(tp) {
    new Notice("testing")

    const WorkingFile = await app.workspace.getActiveFile()
    const WorkingData = await app.vault.read(WorkingFile)

    const Listpattern = /(## .+\n+)(\*\*Complete\*\*\n){0,}(((\-\ \[x\]\ .+)|(\-\ \[\ \]\ .+))\n+){0,}/gm
    const TrackingFile = await app.workspace.getActiveFile().parent.children.find(file=>{
        if(file.name.match(/.+ Tracking/)) return File
    })

    if(!TrackingFile)
    {
        return
    } 
    const TrackingData = await app.vault.read(TrackingFile)

    const lists = TrackingData.match(Listpattern)
    
    console.log(TrackingData.match(Listpattern))
    
    const ListNumber = lists.length;
    
    const Itemspattern= /(((\-\ \[x\]\ .+)$|(\-\ \[\ \]\ .+))$){1,}/gm

    let itemsNumber =0;
    let Target =0;
    let value = 0;
    lists.forEach((list,index) => {
        console.log(list.match(Itemspattern))
        let current =  (list.match(Itemspattern)) ? list.match(Itemspattern).length : 0
        itemsNumber += current;
        // console.log(`${list.match(Itemspattern)}\n${current}`)
        console.log(`${value} += ${index+1} * ${current} => ${(index+1) * current} `)
        value += (index+1) * current;
    });

    Target = itemsNumber * ListNumber;

    let valuepattern = /(?=🏹\ {0,}:)((\ {0,}.+)+|.+)/gm
    let targetpattern = /(?=🎯\ {0,}:)((\ {0,}.+)+|.+)/gm

    let newdata
    newdata = WorkingData.replace(valuepattern,`🏹: ${value}`)
    newdata = newdata.replace(targetpattern,`🎯: ${Target}`)

    let TargetPersentage = 100;
    let ValuePersentage = Math.floor((value/Target) * 100)

    const templaterpattern = new RegExp(/\<\%(?!\+).+\%\>\n/g)
    newdata = newdata.replace(templaterpattern,"")
    // console.log(`${ValuePersentage} / ${TargetPersentage}`)
    // console.log()
    await app.vault.modify(
        WorkingFile,
        newdata
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