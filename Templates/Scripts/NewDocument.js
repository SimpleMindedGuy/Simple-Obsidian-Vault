let Meta={
    tags:[],
    alias:[],
},
    Layers=[],
    OverView={key: null,Layer:null},
    LayerIndex=0,
    folder,
    file,
    Text,
    Created="Created",
    Modified="Modified",
    Title = "Title",
    ParentDocument="Parent",
    Options,
    Thumb=false,
    TimeFormat = "YYYY/MM/DD - hh:mm a",
    Dialog="";

    
    let RootPath = `Templates`;

async function NewDocuemnt(tp,Active){
    
    
    Root = await app.vault.getAbstractFileByPath(`${RootPath}`)

    folder = await app.vault.getAbstractFileByPath(`${RootPath}`)
    file = await app.vault.getAbstractFileByPath(`${RootPath}/NewDocument.md`)
    
    if(Active)
    {
        file =  await app.workspace.getActiveFile()
        
    }
    Text = await app.vault.read(file)


    instructions: while(file != null)
    {

        let Instructions = await GetInstructions(Text)
        for await (let instruction of Instructions)
        {
            instruction = await AddValues(instruction)
            let Command = await GetCommand(instruction)
            
            Text = await ReplaceVariables(Text)

            switch (Command) {
                case Command.match(/^Dialog$/i)?.input:

                    Dialog = await ReadDialog(instruction)
                break;
    
                case Command.match(/^Layer$/i)?.input:

                    await Layers.push(await UserSelectValue(instruction,Dialog,tp))
                        
                break;
                    
                case Command.match(/^Select$/i)?.input:

                    await UserSelectValue(instruction,Dialog,tp)
                break;
                    
                case Command.match(/^Options$/i)?.input:


                    await UserOptionValues(instruction,Dialog,tp)
                break;
    
                case Command.match(/^Input$/i)?.input:


                    await UserInputValue(instruction,Dialog,tp)
                break;
    
                case Command.match(/^List$/i)?.input:


                    await UserInputList(instruction,Dialog,tp)
                    break;

                case Command.match(/^Check$/i)?.input:

                    await UserInputCheck(instruction,Dialog,tp)
                break;
                
                case Command.match(/^SetDateFormat$/i)?.input:

                    await SetDateFormat(instruction)
                break;

                case Command.match(/^Date$/i)?.input:

                    await AddDate(instruction,tp)
                break;

                case Command.match(/^SetDate$/i)?.input:

                    await SetDate(instruction,tp)
                break 


                case Command.match(/^OverviewKey$/i)?.input:


                    key = await GetKeys(instruction)
                    OverView.key = key
                break;

                case Command.match(/^OverviewLayer$/i)?.input:

                    
                    key = await GetKeys(instruction)
                    OverView.Layer = Meta[key]
                break;

                case Command.match(/^CreateDateKey$/i)?.input:


                    Created = await GetKeys(instruction)
                    await AddPropertyToMeta(Created,`${await tp.date.now("YYYY/MM/DD - hh:mm a")}`)
                break;
                    
                case Command.match(/^LastUpdatedKey$/i)?.input:

                    Modified = await GetKeys(instruction)
                    await AddPropertyToMeta(Modified,`<%- tp.date.now("YYYY/MM/DD - hh:mm a") %>`)
                break;
                        
                case Command.match(/^ParentDocumentKey$/i)?.input:

                    ParentDocument = await GetKeys(instruction)
                break;
                case Command.match(/^TitleKey$/i)?.input:

                    Title = await GetKeys(instruction)
                break;
    
                case Command.match(/^Get$/i)?.input:
                    key = await GetKeys(instruction)
                    await GetFileMeta(file,key)
                break;

                case Command.match(/^Set$/i)?.input:
                    key = await GetKeys(instruction)
                    await SetValue(instruction,key)
                break;

                case Command.match(/^NextFile$/i)?.input:

                    await NextFile()
                break;
    
                case Command.match(/^Build$/i)?.input:

                    await BuildDocument(tp)
                break instructions;

                case Command.match(/^BuildInFile$/i)?.input:
                    Text = await RemoveInstructions(Text)

                    await app.vault.modify(
                        file,
                        Text
                    )
                    .then(()=>{
                        new Notice(`Removed Commands from document`);
                    })
                    .catch((err)=>{
                        console.log(err)
                        new Notice(`failed to remove commands from document`);
                    })
                    await BuildFile(file,Text)
                    
                break instructions;
            
                case Command.match(/^MoveMedia$/i)?.input:

                    await MoveMedia(instruction,file)
                break instructions;

                case Command.match(/^BuildSubDoc$/i)?.input:

                    await BuildSubDoc(instruction,file,tp)
                break instructions;

                case Command.match(/^BuildSubNote$/i)?.input:

                    await CreateSubNote(instruction,file,tp)
                break instructions;

                default: 
                    console.log("Unknonw command")
                    return null
                // break instructions;
            }
        }
    }
}


async function ReadDialog(Text)
{

    let DialogExp = new RegExp(`(?<=dialog\\ *\\:\\ *\\{\\n+)(.+\\n+)+(?=\\})`,"gmi")

    let Dialog = Text.match(DialogExp) ? Text.match(DialogExp)[0] : null

    for (const [key, value] of Object.entries(Meta)) {
        // console.log(`${key}: ${value}`);
        const PropExp = new RegExp(`(?:\\$\\(${key}\\))`,`gm`)
        Dialog= await Dialog.replace(PropExp,`${value}`)

        // Data = Data.replace(PropExp,`${key}: ${value}`);
    }

    return Dialog
}



async function GetInstructions(Text)
{
    // (\w+)\ *\:\ *(.+)?(\=\>\ *.*|\[.*\]\ *\=\>\ *.*|(?:\{(\n.*)+?)(?<=\n\}))
    let CommandExp= new RegExp(`(\\w+)\\ *\\:\\ *(.+)?(\\=\\>\\ *.*|\\[.*\\]\\ *\\=\\>\\ *.*|(?:\\{(\\n.*)+?)(?<=\\n\\}))`,`gmi`)

    let Commands = Text.match(CommandExp)


    return Commands
}


async function RemoveInstructions(Text)
{
    // (\w+)\ *\:\ *(\=\>\ *.*\n*|\[.*\]\ *\=\>\ *.*\n*|(?:\{(\n.*)+?)\n\}\n*)
    let CommandExp= new RegExp(`(\\w+)\\ *\\:\\ *(\\=\\>\\ *.*\\n*|\\[.*\\]\\ *\\=\\>\\ *.*\\n*|(?:\{(\n.*)+?)\\n\\}\\n*)`,`gmi`)

    Text = Text.replace(CommandExp,"")

    
    return Text
}


async function GetCommand(Text)
{
    // (Layer|List|Select|Input|Options|NextFile|Build|Dialog)\ *\:\ *\=\>\ *(.*\{\n|.*+(?<=\}))
    let KeyExp= new RegExp(`(\\w+)(?=\\ *\\:\\ *)`,`gmi`)

    let Key = Text.match(KeyExp)[0]

    
    return Key
}

async function GetKeys(Text)
{
    // (?<=\ *\=\>\ *)([\u0022-\uffff]+|\w+\ )+
    let StringEXP = new RegExp(`(?<=\\ *\\=\\>\\ *)([\\u0022-\\uffff]+|\\w+\\ )+`,`gmi`)
    let String  = Text.match(StringEXP)[0]
    

    return String;
}


async function SetValue(instruction,key)
{
    let String =instruction;
    const listExp = new RegExp(/(?<=\[).+(?=\])/ig)
    const valExp = new RegExp(/(?<=\:\ *).+(?=\=\>)/ig)

    String = String.match(listExp) ? 
    String.match(listExp)[0].split(",") : 
    String.match(valExp)[0].trim()

    // console.log(String)
    let value =[]
    if(Array.isArray(String))
    {
        for(const str of String)
        {
            value.push(str)
        }
    }
    else
    {
        value = String
    }
    // console.log(value)
    await AddPropertyToMeta(key,value)
}

async function GetOptions(Text)
{
    let SetExp = new RegExp(`(?<=\\[|\\,).*(?=\\])`,`i`)
    let Set = Text.match(SetExp)[0]

    let options = Set.split(",")

    return options
}

async function GetFileMeta(file,key){
    let value =[]
    let metaExp = new RegExp(`(?:${key}\\:\\ *)(.+|(\\n+\\ +\\-\ .+)+)`,`ig`)

    let data = await app.vault.read(file);
    
    // console.log(data)
    data = await data.match(metaExp)[0]
    // console.log(data)

    let valExp = new RegExp(`(?<=${key}\\:\\ +?).+`,`gi`)
    let listExp = new RegExp(/(?<=\ *\-\ +?).+/gi)
    data = await data.match(listExp) ? 
    data.match(listExp) :
    data.match(valExp)[0];

    // console.log(data)
    if(Array.isArray(data)){
        for(const d of data)
        {
            value.push(d)
        }
    }
    else{
        value = data.trim()
    }
    await AddPropertyToMeta(key,value)
    // console.log(Meta)
}

async function UserSelectValue(instruction,Dialog,tp)
{
    Options = await GetOptions(instruction)
    let String ="\n"
    for(const option in Options)
    {
        String += `\n${option}: ${Options[option]}`
        
    }
    let Key = await GetKeys(instruction)

    String += `\nStored in property called : ${Key}`
    // console.log(String)
    let Value ;
    
    while(Value == undefined)
    {
        let Index = parseInt(await tp.system.prompt(Dialog+String,"",true))
        Value = Options[Index]
    }
    
    
    await AddPropertyToMeta(Key,Value)
    return Value
}

async function UserOptionValues(instruction,Dialog,tp)
{
    Options = await GetOptions(instruction)
    let Key = await GetKeys(instruction)
    let String ="\n"
    let option = null
    let Value=[] ;

    // console.log("testing option values ")
    do{
        String = "\n"

        for(const option in Options)
        {
            String += `\n${option}: ${Options[option]}`    
        }
    
        String += `\nStored in property called : ${Key}`
        String += `\n${Key} = [${Value}]`

        let Index = parseInt(await tp.system.prompt(Dialog+String,"",true))

        option = Options[Index]

        if(option)
        {
            Value.push(option)
        }
        
        Options.splice(Index,1);
    }while(option != undefined)


    
    
    await AddPropertyToMeta(Key,Value)
    return Value
}

async function UserInputValue(instruction,Dialog,tp)
{
    let String ="\n"

    let Key = await GetKeys(instruction)

    String += `\nStored in property called : ${Key}`
    // console.log(String)
    let Value ;
    
    while(Value == undefined)
    {
        Value = await tp.system.prompt(Dialog+String,"",true)
    }
    
    await AddPropertyToMeta(Key,Value)
    return Value
}

async function UserInputList(instruction,Dialog,tp)
{
    let String

    let Key = await GetKeys(instruction)

    
    let Value=[] ;
    
    let val

    loop1: do{
        String = "\n"

        String += `\nStored in property called : ${Key}`
        String += `\n${Key} = [${Value}]`

        val = await tp.system.prompt(Dialog+String,"",true)

        let match = await val.match(/^\ *$/)? true : false

        if(match)
        {
            break loop1
        }
   
        Value.push(val)
        
    }while(val != undefined)

    // console.log(Value)
    await AddPropertyToMeta(Key,Value)
    return Value
}

async function UserInputCheck(instruction,Dialog,tp)
{
    let String

    let Key = await GetKeys(instruction)

    
    let Value;
    
    let val


    String = "\n"

    String += `\n0: false`
    String += `\n1: true`

    val = await tp.system.prompt(Dialog+String,"",true)


    Value = val == "1" ?  true : false

    // console.log(Value)
    await AddPropertyToMeta(Key,Value)
    return Value
}

// use this regex for getting paths
// (?<=\ *\:\ *\=\>\ *)\/*((\w+(\ \-?\_?\(?\)?)*\w+)\/*)+(?=\ *)
async function SetDateFormat(instruction)
{
    let TF = new RegExp(/(?<=\ *\:\ *\=\>\ +?).+/ig)
    let String = await instruction.match(TF)[0]


    TimeFormat = String
}

async function AddDate(instruction , tp)
{

    let Key = await GetKeys(instruction)

    let Value = await tp.date.now(TimeFormat);

    // console.log(Value)
    await AddPropertyToMeta(Key,Value)
}

async function SetDate(instruction,tp)
{
    
    let key = await GetKeys(instruction)
    // console.log(`instruction`)
    // console.log(instruction)
    // 2023/04/04 - 09:40 pm
    let dateExp =  RegExp(/(?<=\:\ *\().+(?=\)\ *\=\>)/ig)
    let date = await instruction.match(dateExp) ? await instruction.match(dateExp)[0] : undefined
    // console.log(`Date is here`)
    // console.log(date)
    
    if(!date)
    {
        date = tp.date.now(TimeFormat)
    }
    let parsed = await Date.parse(`${date}`)
    // console.log(`parsed`)
    // console.log(parsed)
    
    let d = new Date(parsed)
    let format =  await d.toLocaleString('en-UK',{day:'2-digit',month:"2-digit",year:"numeric"})
    // console.log(`format`)
    // console.log(format)
    let value = await tp.date.now(TimeFormat,0,`${format}`,`DD/MM/YYYY`)
    // console.log(`newdate`)
    // console.log(newdate)

    await AddPropertyToMeta(key,value)
}

async function AddPropertyToMeta(Key, Value)
{
    if(!Key)
    {
        return 
    }

    Meta[Key] = Value

}

async function AddValueToProperty(Key, Value)
{
    if(!Key)
    {
        return 
    }

    if(Meta.hasOwnProperty(Key) && Array.isArray(Meta[Key]))
    {
        Meta[Key].push(Value)
        
        return
    }
    else
    {
        Meta[Key] = [Value]
    }
    // console.log(Meta)
}

async function NextFile()
{
    if(!folder.path )
    {
        // rej("Path not found")
        return
    }

    if(LayerIndex == Layers.length){
        // rej("Layer Index Out of bounds")
        return
    }   

    // console.log(folder)
    // console.log(file)
    // console.log(Text)    
    folder = await app.vault.getAbstractFileByPath(`${folder.path}/${Layers[LayerIndex]}`)
    // console.log(folder)

    file = await app.vault.getAbstractFileByPath(`${folder.path}/${Layers[LayerIndex]}.md`)
    // console.log(file)
    Text = await app.vault.read(file)
    // console.log(Text)    
    LayerIndex++
  
    // res("done")
}

async function BuildDocument(tp)
{
    let Paths = []
    let Path = ""
    const TemplateExp = new RegExp(/^(?!Description|Overview)(\w+\ )+(Template\.md)$/i)
    const DefaultExp = new RegExp(/^Description\ Template\.md$/i)
    const OverviewExp = new RegExp(/^Overview\ Template\.md$/i)
    const OverviewFolder = new RegExp(`(.+)+(?:${OverView.Layer})`)

    for (const Layer of Layers)
    {
        Path += `/${Layer}`
        Paths.unshift(`${Path}`)
        await app.vault.createFolder(`${Path}`)
        .catch((err)=>{
            console.log(err)
        })
    }

    // console.log(`Getting templates`)

    const OptionalTemplates= await GetOptionalTemplates(TemplateExp,Paths)
    // console.log(`Optional Templates`)

    let DefaultTemplate = await GetDefaultTemplate(DefaultExp,Paths)
    // console.log(`Default Template`)

    let OverviewTemplate = await GetOverviewTemplate(OverviewExp,await Path.match(OverviewFolder)[0])


    // console.log(`User options`)
    let Templates = await  PicOptionalTemplates(OptionalTemplates,tp)


 
    let Slash = new RegExp(/(?<=\/).+/gi);

    // console.log(`looking for path`)
    // console.log(Path)
    let Folder = Path=="" ?  
    await app.vault.getAbstractFileByPath(``) :
    await app.vault.getAbstractFileByPath(`${Path.match(Slash)[0]}`)


    // console.log(Folder)
    let DocumentNumber = await GetDocumentNumber(Folder) ;


    const DocumentFolder  = await CreateDocumentFolder(DocumentNumber,Path,Meta[Title])

    await AddPropertyToMeta(Created,`${await tp.date.now("YYYY/MM/DD - hh:mm a")}`)
    await AddPropertyToMeta(Modified,`<%- tp.date.now("YYYY/MM/DD - hh:mm a") %>`)

    await CreateDescriptionFile(DocumentFolder,DefaultTemplate,Templates,tp)
    
    await AddCardToOverView(DocumentFolder,OverviewTemplate,Path,tp)
    

}

    
module.exports = NewDocuemnt


async function GetOptionalTemplates  (TemplateExp,Paths){
    let OptionalTemplates=[];

    // console.log(Paths)
    for (const path of Paths)
    {
        let Folder= await app.vault.getAbstractFileByPath(`${RootPath}${path}`)
        // console.log(`${RootPath}${path}`)
        // console.log(Folder)
        if(!Folder)
        {
            continue
        }

        if(OptionalTemplates.length == 0)
        {
            
            for(const child of Folder.children)
            {
                // console.log(`${child.name} | `)
                if(await child.name.match(TemplateExp)){
                    await OptionalTemplates.push(child.path)
                    // console.log(child.path)
                }
                
            }
        }
        

        if(OptionalTemplates.length > 0)
            break 
    }
    
    // console.log(OptionalTemplates)
    return OptionalTemplates
}

async function GetDefaultTemplate (TemplateExp,Paths){
    let DefaultTemplates
    if(!Paths || Paths.length == 0)
    {
        return
    }



    for (const path of Paths)
    {
        let Folder= await app.vault.getAbstractFileByPath(`${RootPath}${path}`)
        if(!Folder)
        {
            // console.log(`Folder not found`)
            continue
        }
        // console.log(`Folder found`)

        if(!DefaultTemplates)
        {
            
            for(const child of Folder.children)
            {

                if(await TemplateExp.test(child.name)){
                    DefaultTemplates=child.path
                }
                
            }
            // console.log(OptionalTemplates)
        }


        if(DefaultTemplates)
            break 
    }
    const File = await app.vault.getAbstractFileByPath(DefaultTemplates)
    return File
}

async function GetOverviewTemplate  (TemplateExp,Path){
    let OverviewFolder
    if(!Path)
    {
        return
    }

    let Folder= await app.vault.getAbstractFileByPath(`${RootPath}${Path}`)

    if(!Folder)
    {
        return
        // console.log(`Folder not found`)
    }
    // console.log(`Folder found`)

    if(!OverviewFolder)
    {
        for(const child of Folder.children)
        {
            if(await TemplateExp.test(child.name)){
                OverviewFolder=child.path
            }
        }
    }

    const File = await app.vault.getAbstractFileByPath(OverviewFolder)
    return File
}

async function PicOptionalTemplates (OptionalTemplates,tp){
    let String
    Dialog =`Optional templates`
    let option ;
    let Templates={}
    let temps = []
    if(OptionalTemplates >= 0)
    {
        return 
    }
    const TemplateTypeExp= new RegExp(/(\w+\ *)+(?=\ Template\.md)/ig)
    do{
        String = "\n"

        for(const option in OptionalTemplates)
        {
            String += `\n${option}: ${await OptionalTemplates[option].match(TemplateTypeExp)}`    
        }
    
        
        String += `\nTemplates = [${temps}]`

        let Index = parseInt(await tp.system.prompt(Dialog+String,"",true))


        option = !isNaN(Index) ? 
            await OptionalTemplates[Index].match(TemplateTypeExp):
            undefined

        if(option)
        {
            Templates[option]= await app.vault.getAbstractFileByPath(OptionalTemplates[Index]);
            temps.push(option)
        }
        
        OptionalTemplates.splice(Index,1);
    }while(option != undefined)

    return Templates
}

async function SelectTemplate (OptionalTemplates,tp){
    Options = OptionalTemplates
    let String ="\n"
    Dialog =`Optional templates`
    const TemplateTypeExp= new RegExp(/(\w+\ *)+(?=\ (Template|Sub(N|n)ote)\..*)/ig)

    if(OptionalTemplates >= 0)
    {
        return 
    }



    // console.log(String)
    let Template ;
    
    while(Template == undefined)
    {
        String = "\n"

        for(const option in OptionalTemplates)
        {
            String += `\n${option}: ${await OptionalTemplates[option].match(TemplateTypeExp)}`    
        }


        let Index = parseInt(await tp.system.prompt(Dialog+String,"",true))
        Template = !isNaN(Index) ? 
        await OptionalTemplates[Index]:
        undefined

    }
    
    
    return Template

}



async function GetDocumentNumber (Folder){
    let DocumentNumber = 1;
    for(let i = Folder.children.length-1 ; i  >= 0 ; i--)
        {
            if (Folder.children[i].name.match(/\d{4}/))
                {
                    // console.log(Folder.children);
                    DocumentNumber = parseInt(Folder.children[i].name.match(/\d{4}/)[0])+1;
                    break;
                }
        }
    DocumentNumber = DocumentNumber.toString().padStart(4,'0');
    return DocumentNumber
}

async function  CreateDocumentFolder (DocumentNumber,Path,title) {
    let Slash = new RegExp(/(?!\/).+/gim);
    let DocumentFolder
    // console.log(await Path.match(Slash))
    let NewPath = `${await Path.match(Slash)[0]}/${DocumentNumber} - ${title}`;

    // console.log(`${NewPath}`)
    await app.vault.createFolder(`${NewPath}`)
    .then(async()=>{
        DocumentFolder = await app.vault.getAbstractFileByPath(`${NewPath}`)
    })
    .catch(err=>{
        console.log(err)
    })
    return DocumentFolder
}





async function CreateDescriptionFile(DocumentFolder,DefaultTemplate,Templates,tp){


    return await tp.file.create_new(
        DefaultTemplate,
        `${Meta[Title]} Description`,
        false,
        DocumentFolder
    )
    .then(async ()=>{
        

        // console.log('Looking for Description file')
        const   File = await app.vault.getAbstractFileByPath(`${DocumentFolder.path}/${Meta[Title]} Description.md`);
        let   Data = await app.vault.read(File);

        Data = await AddMeta(Data);

        const HeaderPatter = new RegExp(/\# Title/);
        
        // console.log(`Creating links`)

        
        let links =""

        await AddPropertyToMeta(ParentDocument,DocumentFolder.path)

        for (const [key, value] of Object.entries(Templates)) {
            links+=`[[${DocumentFolder.path}/${Meta[Title]} ${key}|${key}]]\n`
            
            // console.log(`creating template's file`)

            await CreateTemplate(DocumentFolder,value,key,tp)
        }

        
        Data = await Data.replace(HeaderPatter,`# ${Meta[Title]}\n${links}`)

        const AliasExp = new RegExp(`(?=alias\\ *:)((\\ *.+)+|.+)`,`gm`)
        Data = await Data.replace(AliasExp,`alias:\n - ${Meta[Title]}`)

        // console.log("modifying the description file")
        await app.vault.modify(
            File,
            Data
        )
        .then(()=>{
            new Notice("Added description MetaData");
        })
        .catch((err)=>{
            console.log(err)
            new Notice("Failed to add description MetaData");
        })
        return File
        

    })
    .catch((err)=>{
        console.log(err)
        new Notice("Failed to create Description file")
    })

}

async function CreateTemplate(DocumentFolder,TF,Template,tp)
{

    // console.log(`Template : ${Template}`)
    await tp.file.create_new(
        TF,
        `${Meta[Title]} ${Template}`,
        false,
        DocumentFolder
    )
    .then(async ()=>{
    

        let   File = await app.vault.getAbstractFileByPath(`${DocumentFolder.path}/${Meta[Title]} ${Template}.md`);

        let   Data = await app.vault.read(File);

        Data = await AddMeta(Data);

        const HeaderPatter = new RegExp(/\# Title/);
        
        Data = await Data.replace(HeaderPatter,`# ${Meta[Title]}\n`)

        // console.log(`modifying the ${Template} file`)
        await app.vault.modify(
            File,
            Data
        )
        .then(()=>{
            new Notice(`Added ${Template} file MetaData`);
        })
        .catch((err)=>{
            console.log(err)
            new Notice(`Failed to add ${Template} file MetaData`);
        })


    })
    .catch((err)=>{
        console.log(err)
        new Notice(`Failed to create ${Template} file`)
    })
}

async function AddMeta(Data){

    for (const [key, value] of Object.entries(Meta)) {
        // console.log(`${key}: ${value}`);
        const PropExp = new RegExp(`(?=${key}\\ *:)((\\ *.+)+|.+)`,`gm`)
        if (Array.isArray(Meta[key]))
        {
            let str =`${key}: \n`
            for(const val of Meta[key])
            {
                str+= ` - ${val}\n`
            }
            Data = await Data.replace(PropExp,str)

            continue
        }

        Data = await Data.replace(PropExp,`${key}: ${value}`)
    }
    

    return Data
}


async function AddValues(Data){

    for (const [key, value] of Object.entries(Meta)) {
        
        const PropExp = new RegExp(`\\$\\(${key}\\)`,`gm`)
        if (Array.isArray(Meta[key]))
        {
            let str =`${key}: \n`
            for(const val of Meta[key])
            {
                str+= ` - ${val}\n`
            }
            Data = await Data.replace(PropExp,`[${value}]`)

            continue
        }

        // console.log(`replaced \$(${key}) with ${value}`)
        Data = await Data.replace(PropExp,`${value}`)
    }
    

    return Data
}



async function GetOverviewFile(DocumentFolder,OverviewTemplate,tp){
    
    let docPath = await DocumentFolder.path

    const TemplateTypeExp= new RegExp(`(\\w+\\ *\\/)+${OverView.Layer}(?=.*)`,`ig`)

    let overviewPath = await docPath.match(TemplateTypeExp)[0]


    let Folder = await app.vault.getAbstractFileByPath(overviewPath)
    let File = await app.vault.getAbstractFileByPath(`${overviewPath}/${OverView.Layer}.md`)

    if(!File)
    {
        await tp.file.create_new(
            OverviewTemplate,
            `${OverView.Layer}`,
            false,
            Folder
        )
        .then(async()=>{
            // console.log("Overview")
            // console.log(OverView)
            let KH = await app.plugins.plugins["metaedit"].settings.KanbanHelper;
            setTimeout(async()=>{
                await KH.boards.push({boardName:`${OverView.Layer}`,property:`${OverView.key}`})
            },3000)
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    File = await app.vault.getAbstractFileByPath(`${overviewPath}/${OverView.Layer}.md`)

    return File
}

async function  BuildFile(file,Data){



    Data = await AddMeta(Data)
    Data = Data.replace(/\# Title/gm,`# ${Meta[Title]}`)

    await app.vault.modify(
        file,
        Data
    )
    .then(()=>{
        new Notice(`Added MetaData`);
    })
    .catch((err)=>{
        console.log(err)
        new Notice(`Failed to add MetaData`);
    })
}

async function ReplaceVariables(Data)
{
    for (const [key, value] of Object.entries(Meta)) {
        const PropExp = new RegExp(`\\$\\(${key}\\)`,`gm`)
        if (Array.isArray(Meta[key]))
        {
            let str =`${key}: \n`
            for(const val of Meta[key])
            {
                str+= ` - ${val}\n`
            }
            Data = await Data.replace(PropExp,str)

            continue
        }

        Data = await Data.replace(PropExp,`${key}: ${value}`)
    }
    return Data
}

// this should be moving All media files to another folder 
async function MoveMedia(instruction,File)
{
    const pathExp = await RegExp(/(?<=.*\ *\:\=\>\ *).+/i)
    console.log(await instruction.match(pathExp)[0].trim())
    let Path = await instruction.match(pathExp) ?
    await instruction.match(pathExp)[0].trim():
    undefined


    if(!Path || Path == " " )
    {
        Path = `${File.parent.path}/Media`
    }
    else{
        createBuildPath(await Path.trim().split("/"))
    }

    let Folder = await  getFolder(Path)

    const pattern       = RegExp(/(?!\[\[)\w([\w \/|\ |\(|\)|\_|\-|\d|\.])*\.(gif|png|jpeg|mp4|jpg|jpeg|webm|mpeg|aac|flac|kmv)(?=\]\])/igm);

    const filepatter    = RegExp(/\/\w([\w \/|\ |\(|\)|\_|\-|\d|\.])*\.(gif|png|jpeg|mp4|jpg|jpeg|webm|mpeg|aac|flac|kmv)/igm)

    let data = await app.vault.read(File);
    let matches = data.match(pattern);
    
    const ignorepatterns = ["Banner",`${File.parent}/Media`,`Gallery/icon`,`Gallery/icons`,`Journal`,`Journal Files`,`Activity`,`Personal`]

//  check if the media folder already exists 
    console.log(matches)
    if(!Folder)
    {
        
        await app.vault.createFolder(`${Path}`)
        .then(async()=>{

           
            
        })
        .catch(async(err)=>{
            console.log(err)
            new Notice(`Failed to create media folder for project\n@: ${Path}\ncheck console for information\ndouble click [ctrl + shift + i]`);
        })

    }

    if(!matches)
    {
        return
    }
    try{
        for(let match of matches)
        {
            console.log(ignorepatterns.indexOf(`${match.replace(filepatter,"")}`))
            
            let file = await app.vault.getAbstractFileByPath(`${match}`);

            if(await (ignorepatterns.indexOf(`${match.replace(filepatter,"")}`)) == -1)
            {
                // console.log(`matches are : ${match.replace(filepatter,"")}`)
                console.log(`${Path}/${file.name}`)
                console.log(file.name)

                let Name=file.name.replace(/\:/gm,"-")
                await app.fileManager.renameFile(file,`${Path}/${Name}`)
            }
            
        }
            
        
    }
    catch(err){
        console.log(err)
        new Notice(`Failed to add files to media folder for project\n@: ${Path}\ncheck console for information\ndouble click [ctrl + shift + i]`);
    }

    
}


// use this regex for getting paths
// (?<=\ *\:\ *\=\>\ *)\/*((\w+(\ \-?\_?\(?\)?)*\w+)\/*)+(?=\ *)

// Todo : Make the code easy to understand.
async function BuildSubDoc(instruction,File,tp){
    
    let PATHS =  instruction.match(/(?<=\=\>).*/ig)[0].split(",")
    let TemplatePath = PATHS[0] ?  PATHS[0].trim().split("/") : null
    let BuildPath = PATHS[1] ?  PATHS[1].trim().split("/") : null
    

    // Get templates
    const TemplateExp = new RegExp(/^(?!Description|Overview)(\w+\ )+(Template\.md)$/i)
    const DefaultExp = new RegExp(/^Description\ Template\.md$/i)
    const OverviewExp = new RegExp(/^Overview\ Template\.md$/i)
    const OverviewFolder = new RegExp(`(.+)+(?:${OverView.Layer})`)
    
    if(!TemplatePath || TemplatePath.length == 0 || TemplatePath[0] == "")
    {
        console.log(`No Template Path`)
        return 
    }
    // Get Templates folder
    let TFolders = await getTemplatePaths(TemplatePath)

    // Get path to build path
    // and makes the folders 
    let Path= await createBuildPath(BuildPath)

    //  Get Templates
    const OptionalTemplates= await GetOptionalTemplates(TemplateExp,TFolders)
    //  Getting default and overview template
    let DefaultTemplate = await GetDefaultTemplate(DefaultExp,TFolders)
    let OverviewTemplate = await GetOverviewTemplate(OverviewExp,await TFolders[0].match(OverviewFolder)[0])

    // get one or more Templates for user wants to use
    let Templates = await  PicOptionalTemplates(OptionalTemplates,tp)

    let Slash = new RegExp(/(?<=\/).+/gi);

    // Get Sub Document folder
    let Folder = Path=="" ?  
    await File.path:
    await app.vault.getAbstractFileByPath(`${Path.match(Slash)[0]}`)

    // Get the name of the current document to create the Sub Document folder
    await AddPropertyToMeta(ParentDocument,File.path)
    
    // Gets the sub document folder if it exist, and makes one if it dose not exist
    let SubDocumentFolder = await getSubDocumentFolder(File,Folder,Folder.path)

    
    Path = SubDocumentFolder.path;

    Folder = await app.vault.getAbstractFileByPath(`${Path}`)

    let DocumentNumber = await GetDocumentNumber(Folder) ;

    const DocumentFolder  = await CreateDocumentFolder(DocumentNumber,Path,Meta[Title])


    // Add date and time
    await AddPropertyToMeta(Created,`${await tp.date.now("YYYY/MM/DD - hh:mm a")}`)
    await AddPropertyToMeta(Modified,`<%- tp.date.now("YYYY/MM/DD - hh:mm a") %>`)

    // Create main file for the sub document 
    let DocFile = await CreateDescriptionFile(DocumentFolder,DefaultTemplate,Templates,tp)

    // console.log(DocFile)

    let   Data = await app.vault.read(DocFile);
    const AliasExp = new RegExp(`(?=alias\\ *:)((\\ *.+)+|.+)`,`gm`)
    const NameExp = new RegExp(/\d{4} - /ig)
    // console.log(File)
    Data = await Data.replace(AliasExp,`alias:\n - ${await File.parent.name.replace(NameExp,"")} ${Meta[Title]}`)
    await app.vault.modify(
        DocFile,
        Data
    )
    .then(()=>{
        new Notice("Added SubNote MetaData");
    })
    .catch((err)=>{
        console.log(err)
        new Notice("Failed to add SubNote MetaData");
    })



    // add the card to the OverView lists. 
    await AddCardToOverView(DocumentFolder,OverviewTemplate,Path,tp)
}

async function CreateSubNote(instruction,File,tp){
    let PATHS =  instruction.match(/(?<=\=\>).*/ig)[0].split(",")
    let TemplatePath = PATHS[0] ?  PATHS[0].trim().split("/") : null
    let BuildPath = PATHS[1] ?  PATHS[1].trim().split("/") : null
    

    // console.log(`File`)
    // console.log(File)
    
    
    if(!TemplatePath || TemplatePath.length == 0 || TemplatePath[0] == "")
    {
        console.log(`No Template Path`)
        return 
    }
    // Get Templates folder
    let TFolders = await getTemplatePaths(TemplatePath)

    // Get path to build path
    // and makes the folders 
    // console.log(`buildPath : ${BuildPath}`)
    let Path=  !BuildPath ? "": await createBuildPath(BuildPath)

    // Get templates
    const TemplateExp = new RegExp(/^(?!Description|Overview)(\w+\ )+(SubNote)/igm)
    const OptionalTemplates= await GetOptionalTemplates(TemplateExp,TFolders)

    

    // get only one Templates for user wants to use
    let Template = await  SelectTemplate(OptionalTemplates,tp)
    // console.log(`Template : ${Template}`)

    let Slash = new RegExp(/(?<=\/).+/gi);

    // Get Folder that contains the document Document folder

    Path =  Path =="" ? `${File.parent.path}/SubNotes`:
    `${Path.match(Slash)[0]}`
    
    let Folder 
    // console.log(`Path`)
    // console.log(Path)
    // Get the name of the current document to create the Sub Document folder
    await AddPropertyToMeta(ParentDocument,File.path)
    
    // Gets the sub document folder if it exist, and makes one if it dose not exist
    let SubNoteFolder = await getFolder(Path)

    
    Path = SubNoteFolder.path;

    Folder = await app.vault.getAbstractFileByPath(`${Path}`)

    let SubNoteNumber = await GetDocumentNumber(Folder) ;
    
    // Add date and time
    await AddPropertyToMeta(Created,`${await tp.date.now("YYYY/MM/DD - hh:mm a")}`)
    await AddPropertyToMeta(Modified,`<%+ tp.date.now("YYYY/MM/DD - hh:mm a") %>`)

    let TemplateFile = await app.vault.getAbstractFileByPath(Template)
    // console.log(Meta)
    // console.log(Meta[Title])
    // console.log(Title)

    const DocFile= await BuildSubNote(SubNoteNumber,Folder,Meta[Title],TemplateFile,tp)

    let   Data = await app.vault.read(DocFile);
    const AliasExp = new RegExp(`(?=alias\\ *:)((\\ *.+)+|.+)`,`gm`)
    const NameExp = new RegExp(/\d{4} - /ig)
    // console.log(File)
    Data = await Data.replace(AliasExp,`alias:\n - ${await File.parent.name.replace(NameExp,"")} ${Meta[Title]}`)
    await app.vault.modify(
        DocFile,
        Data
    )
    .then(()=>{
        new Notice("Added SubNote MetaData");
    })
    .catch((err)=>{
        console.log(err)
        new Notice("Failed to add SubNote MetaData");
    })

}

async function getTemplatePaths(TemplatePath){
    let TPath = ""
    let TFolders =[]
    for(const F of TemplatePath)
    {
        TPath += `/${F}`
        TFolders.unshift(`${TPath}`)
        
        // console.log(F)
    }
    return TFolders
}

async function createBuildPath(BuildPath)
{
    let Path=""

    for(const F of BuildPath)
    {
        Path += `/${F}`
        await app.vault.createFolder(`${Path}`)
        .catch((err)=>{
            console.log(err)
        })
    }
    return Path
}


async function getSubDocumentFolder(File,Folder,Path){

    let SubDocumentFolder
    let fileName = File.parent.name.match(/(?<=\d{4} \- ).+/)[0]

    fileName = fileName.replace(/\(/gm,"\\(")
    fileName = fileName.replace(/\)/gm,"\\)")
    let SubDocNameExp =   new RegExp (`\\d{4} - ${fileName}`,"gim")
    


    console.log(SubDocNameExp)
    
    // Check for the Sub document.
    await Folder.children.findIndex(async(folder,index)=>{
        let match = await folder.name.match(SubDocNameExp)[0]
        console.log(match)

        if(match) SubDocumentFolder= folder
    })
    
    console.timeLog(SubDocumentFolder)

    //  if sub document folder don't already exist create one
    if(!SubDocumentFolder)
    {

        let SubDocumentNumber = await GetDocumentNumber(Folder)

        SubDocumentFolder =    await CreateDocumentFolder(SubDocumentNumber,Path,fileName)
    }
    return SubDocumentFolder
}

async function AddCardToOverView(DocumentFolder,OverviewTemplate,Path,tp){
    if(OverView.Layer && OverView.key)
    {
        const OV = await GetOverviewFile(DocumentFolder,OverviewTemplate,tp)
        
        let OvData = await app.vault.read(OV)

        let OvExp = new RegExp(/\#{2}\ .+/)

        let FistList =  await OvData.match(OvExp)
        OvData = Thumb ?  
        await OvData.replace(OvExp,`${FistList}\n- [ ] [[${DocumentFolder.path}/${Meta[Title]} Description|${Meta[Title]}]]\n![[${Path}/${Meta[Title]} Thumbnail]]`):
        await OvData.replace(OvExp,`${FistList}\n- [ ] [[${DocumentFolder.path}/${Meta[Title]} Description|${Meta[Title]}]]`)

        await app.vault.modify(
            OV,
            OvData
        )
        .then(()=>{
            new Notice("Added Card to overview");
        })
        .catch((err)=>{
            console.log(err)
            new Notice("Failed Card to overview");
        })
    }
}


async function getFolder(Path){
    let Slash = new RegExp(/(?!\/).+/gim);
    let NewPath = `${await Path.match(Slash)[0]}`;

    let Folder = await app.vault.getAbstractFileByPath(`${NewPath}`)

    await app.vault.createFolder(`${NewPath}`)
    .then(async()=>{
        Folder = await app.vault.getAbstractFileByPath(`${NewPath}`)
    })
    .catch(err=>{
        console.log(err)
    })
    return Folder
}

async function BuildSubNote(SubNoteNumber,Folder,Title,TemplateFile,tp){
    return await tp.file.create_new(
        TemplateFile,
        `${SubNoteNumber} - ${Title}`,
        false,
        Folder
    )
    .then(async ()=>{
        


        // console.log('Looking for Description file')
        let   File = await app.vault.getAbstractFileByPath(`${Folder.path}/${SubNoteNumber} - ${Title}.md`);
        let   Data = await app.vault.read(File);

        Data = await AddMeta(Data);

        const HeaderPatter = new RegExp(/\# Title/);
        

        Data = await Data.replace(HeaderPatter,`# ${Title}\n`)

        
        await app.vault.modify(
            File,
            Data
        )
        .then(()=>{
            new Notice("Added SubNote MetaData");
        })
        .catch((err)=>{
            console.log(err)
            new Notice("Failed to add SubNote MetaData");
        })
        return File

    })
    .catch((err)=>{
        console.log(err)
        new Notice("Failed to create SubNote file")
    })
}