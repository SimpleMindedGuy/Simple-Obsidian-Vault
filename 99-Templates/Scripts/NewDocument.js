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
    CommandBlock,
    CommandBlockRegEx = new RegExp(/(?:\{{3}\:{3}\n)(.*\n)*(?:\:{3}\}{3})/),
    Created="Created",
    Modified="Modified",
    Title = "Title",
    ParentDocument="Parent",
    Options,
    Thumb=false,
    TimeFormat = "YYYY/MM/DD - hh:mm a",
    Dialog="";
    

    
    let TemplateRoot = `99-Templates`;

    let Root;
async function NewDocuemnt(tp,Active){
    
    

    folder = await app.vault.getAbstractFileByPath(`${TemplateRoot}`)
    file = await app.vault.getAbstractFileByPath(`${TemplateRoot}/NewDocument.md`)

    
    if(Active)
    {
        file =  await app.workspace.getActiveFile()
        
    }
    Text = await app.vault.read(file)
    
    CommandBlock = await Text.match(CommandBlockRegEx) ? await Text.match(CommandBlockRegEx)[0] : null
    console.log(CommandBlock)

    instructions: while(file != null)
    {

        let Instructions = await GetInstructions(CommandBlock)
        for await (let instruction of Instructions)
        {
            instruction = await AddValues(instruction)
            let Command = await GetCommand(instruction)
            
            CommandBlock = await ReplaceVariables(CommandBlock)

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
                    await AddPropertyToMeta(Modified,`<%+ tp.date.now("YYYY/MM/DD - hh:mm a") %>`)
                break;
                        
                case Command.match(/^ParentDocumentKey$/i)?.input:

                    ParentDocument = await GetKeys(instruction)
                break;
                case Command.match(/^TitleKey$/i)?.input:

                    Title = await GetKeys(instruction)
                break;
    
                case Command.match(/^Get$/i)?.input:
                    // key = await GetKeys(instruction)
                    await GetFileMeta(file,instruction)
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
                    
                break ;
            
                case Command.match(/^MoveMedia$/i)?.input:

                    await MoveMedia(instruction,file)
                break ;

                case Command.match(/^BuildSubDoc$/i)?.input:

                    await BuildSubDoc(instruction,file,tp)
                break ;

                case Command.match(/^BuildSubNote$/i)?.input:

                    await CreateSubNote(instruction,file,tp)
                break ;

                case Command.match(/^Stop$/i)?.input:

                    Text = await RemoveInstructions(file)
                    
                    
                break instructions;
                

                default: 
                    console.log("Unknonw command")
                    console.log(Command)
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
        const PropExp = new RegExp(`(?:\\$\\(${key}\\))`,`gm`)
        Dialog= await Dialog.replace(PropExp,`${value}`)

    }

    return Dialog
}



async function GetInstructions(CB)
{
    // (\w+)\ *\:\ *(.+)?(\=\>\ *.*|\[.*\]\ *\=\>\ *.*|(?:\{(\n.*)+?)(?<=\n\}))
    let CommandExp= new RegExp(`(\\w+)\\ *\\:\\ *(.+)?(\\=\\>\\ *.*|\\[.*\\]\\ *\\=\\>\\ *.*|(?:\\{(\\n.*)+?)(?<=\\n\\}))`,`gmi`)

    let Commands = CB.match(CommandExp)


    return Commands
}


async function RemoveInstructions(file)
{

    let text = await app.vault.read(file) 

    text = text.replace(CommandBlockRegEx,"")

    
    await app.vault.modify(
        file,
        text
    )
    .then(()=>{
        new Notice(`Removed commands`);
    })
    .catch((err)=>{
        console.log(err)
        new Notice(`Failed to Remove Commands`);
    })
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

async function GetValue(Text){
    
    // (?<=\:\ *)([\u0022-\uffff]+\ *[\u0022-\uffff]+)+(?=\ *\=\>\ *)
    let StringEXP = new RegExp(`(?<=\\:\\ *)([\\u0022-\\uffff]+\\ *[\\u0022-\\uffff]+)+(?=\\ *\\=\\>\\ *)`,`gmi`)
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
    await AddPropertyToMeta(key,value)
}

async function GetOptions(Text)
{
    let SetExp = new RegExp(`(?<=\\[|\\,).*(?=\\])`,`i`)
    let Set = Text.match(SetExp)[0]

    let options = Set.split(",")

    return options
}


// nAVIER sTRTOKKEY
async function GetFileMeta(file,instruction){
    let value =[]

    let key = await GetKeys(instruction)
    let MetaKey = await GetValue(instruction)
    // let Value = await 



    let metaExp = new RegExp(`(?:${MetaKey}\\:\\ *)(.+|(\\n+\\ +\\-\ .+)+)`,`ig`)

    let data = await app.vault.read(file);
    
    data = await data.match(metaExp)[0]

    let valExp = new RegExp(`(?<=${MetaKey}\\:\\ +?).+`,`gi`)
    let listExp = new RegExp(/(?<=\ *\-\ +?).+/gi)
    data = await data.match(listExp) ? 
    data.match(listExp) :
    data.match(valExp)[0];

    if(Array.isArray(data)){
        for(const d of data)
        {
            value.push(d)
        }
    }
    else{
        value = data.trim()
    }

    console.log(key,value)
    console.log(MetaKey)
    await AddPropertyToMeta(key,value)
    console.log(Meta)
}

async function UserSelectValue(instruction,Dialog,tp)
{
    Options = await GetOptions(instruction)
    let String ="\n"
    for(const option in Options)
    {
        String += `\n${option}: ${Options[option].replace(/\d{2}\-/i,"")}`
        
    }
    let Key = await GetKeys(instruction)

    String += `\nStored in property called : ${Key}`
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

    await AddPropertyToMeta(Key,Value)
}

async function SetDate(instruction,tp)
{
    
    let key = await GetKeys(instruction)

    let dateExp =  RegExp(/(?<=\:\ *\().+(?=\)\ *\=\>)/ig)
    let date = await instruction.match(dateExp) ? await instruction.match(dateExp)[0] : undefined

    
    if(!date)
    {
        date = tp.date.now(TimeFormat)
    }
    let parsed = await Date.parse(`${date}`)

    let d = new Date(parsed)
    let format =  await d.toLocaleString('en-UK',{day:'2-digit',month:"2-digit",year:"numeric"})

    let value = await tp.date.now(TimeFormat,0,`${format}`,`DD/MM/YYYY`)

    await AddPropertyToMeta(key,value)
}

async function AddPropertyToMeta(Key, Value)
{
    console.log(`adding value ${Key}`)
    console.log(Value)
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
}

async function NextFile()
{

    // console.log(folder)
    if(!folder.path )
    {
        return
    }

    if(LayerIndex == Layers.length){
        return
    }   

    let SubDocNameExp =   new RegExp (`(\\d{2,4}\\ *-\\ *)?${Layers[LayerIndex]}`,"gim") 

    console.log(SubDocNameExp)
    
    for ( const f of folder.children)
    {
        let match = await f.name.match(SubDocNameExp)

        if(match) 
        {
            folder = f
            break
        }
    }
    
    SubDocNameExp =   new RegExp (`(\\d{2,4}\\ *-\\ *)?${Layers[LayerIndex]}\\.md`,"gim")

    for ( const f of folder.children)
    {
        let match = await f.name.match(SubDocNameExp)

        if(match) 
        {
            file = f
            break
        }
    }


    Text = await app.vault.read(file);
    CommandBlock = await Text.match(CommandBlockRegEx) ? await Text.match(CommandBlockRegEx)[0] : null
    LayerIndex++
}

async function getLayers(Layers,rootPath)
{
    let Paths = []
    let Path = rootPath
    let num = 2
    
    let Folder = await app.vault.getAbstractFileByPath(Path)

    for (const Layer of Layers)
    {   

        console.warn(`${Layer}`)
        
        let SubDocNameExp =   new RegExp (`\\d{2,4}\\ *-\\ *${Layer}`,"gim")

        let match = false

        for (const folder in Folder.children)
        {

            match = await Folder.children[folder].name.match(SubDocNameExp)

            if(match)  
            {
                Folder= Folder.children[folder]
                break
            }
        }
        
        

        if(!match)
        {
            let documentNumber = await GetDocumentNumber(Folder,num)
            
            Path += `\/${documentNumber}-${Layer}`

            Path = Path.replace(/^\//mg,"")
            Path = Path.replace(/\/{2,}/mg,"/")
            

            console.log(`Path ${Path}`)
            await app.vault.createFolder(`${Path}`)
            .then(async()=>{
                Folder = await app.vault.getAbstractFileByPath(Path)
            })
            .catch((err)=>{
                console.log(err)
            })
            // Folder = await app.vault.getAbstractFileByPath(Path)
        }
        num+=2

        console.log(`Folder : `)
        
        console.log(Folder)
        Path = `${Folder.path}` 
        console.log(`New path  ${Path}`)
        Paths.unshift(`${Path}`)
    }
    
    console.log(Paths)
    return Paths

    
}

async function BuildDocument(tp)
{
    let Paths = []
    const TemplateExp = new RegExp(/^(?!Description|Overview)(\w+\ )+(Template\.md)$/i)
    const DefaultExp = new RegExp(/^Description\ Template\.md$/i)
    const OverviewExp = new RegExp(/^Overview\ Template\.md$/i)
    const OverviewFolder = new RegExp(`(.+)+(?:${OverView.Layer})`)

    let Root = "/"

    Paths = await getLayers(Layers,Root)

    let Path = Paths[0]

    console.log(`Path : `)
    console.log( Path)


    console.log(`Getting templates`)
    const OptionalTemplates= await GetOptionalTemplates(TemplateExp,Paths)
    
    console.log(`Default Template`)
    let DefaultTemplate = await GetDefaultTemplate(DefaultExp,Paths)
    
    console.log( OverView.Layer)
    console.log(`Overview Templates`)
    console.log( Path.match(OverviewFolder))
    let OverviewTemplate = await GetOverviewTemplate(OverviewExp,await Path.match(OverviewFolder)[0])




    console.log(`User options`)
    console.log(Meta)
    let Templates = await  PicOptionalTemplates(OptionalTemplates,tp)
    
    
    
    console.log(`OVerview Template`)
    console.log(OverviewTemplate)
    let Slash = new RegExp(/(?<=\/).+/gi);

    console.log(`Path : ${Path}`)
    let Folder = Path=="" && Path.match(Slash)
     ?  
    await app.vault.getAbstractFileByPath(``) :
    await app.vault.getAbstractFileByPath(`${Path}`)

    console.log(`Folder`)
    console.log(Folder)

    let DocumentNumber = await GetDocumentNumber(Folder,2) ;


    const DocumentFolder  = await CreateDocumentFolder(DocumentNumber,Path,Meta[Title])

    await AddPropertyToMeta(Created,`${await tp.date.now("YYYY/MM/DD - hh:mm a")}`)
    await AddPropertyToMeta(Modified,`<%+ tp.date.now("YYYY/MM/DD - hh:mm a") %>`)

    await CreateDescriptionFile(DocumentFolder,DefaultTemplate,Templates,tp)
    
    await AddCardToOverView(DocumentFolder,OverviewTemplate,Path,tp)
    

}

    
module.exports = NewDocuemnt


async function GetOptionalTemplates  (TemplateExp,Paths){
    let OptionalTemplates=[];

    console.log("Paths")
    console.log(Paths)

    for (const path of Paths)
    {
        let p = `${TemplateRoot}/${path.replace(/\d{2,4}\-/gm,"")}`
        let Folder= await app.vault.getAbstractFileByPath(`${p.replace(/^\//gi,"").replace(/\/$/gi,"")}`)

        console.log(`current template folder`)
        console.log(Folder)
        if(!Folder)
        {
            continue
        }

        if(OptionalTemplates.length == 0)
        {
            
            for(const child of Folder.children)
            {
                if(await child.name.match(TemplateExp)){
                    await OptionalTemplates.push(child.path)
                }
                
            }
        }
        

        if(OptionalTemplates.length > 0)
            break 
    }
    
    console.log(`Optional Templates are : `)
    console.log(OptionalTemplates)
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
        let Folder= await app.vault.getAbstractFileByPath(`${TemplateRoot}/${path.replace(/\d{2,4}\-/gm,"")}`)
        if(!Folder)
        {
            continue
        }

        if(!DefaultTemplates)
        {
            console.log("Looking for default template")
            console.log(path)
            for(const child of Folder.children)
            {
                console.log(child.path)

                if(await TemplateExp.test(child.name)){
                    DefaultTemplates=child.path
                }
                
            }
        }


        if(DefaultTemplates)
            break 
    }
    const File = await app.vault.getAbstractFileByPath(DefaultTemplates)
    console.log("Default Template is ")
    console.log(DefaultTemplates)
    console.log(File)
    return File
}

async function GetOverviewTemplate  (TemplateExp,Path){
    let OverviewFolder
    if(!Path)
    {
        return
    }

    let Folder= await app.vault.getAbstractFileByPath(`${TemplateRoot}/${Path.replace(/\d{2,4}\-/gm,"")}`)

    if(!Folder)
    {
        return
    }

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


function compare( a, b ) {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}


async function GetDocumentNumber (Folder,padding){
    let DocumentNumber = 1;

    let folders = Folder.children.sort(compare)

    for(let i = 0 ; i  <= folders.length-1 ; i++)
    {
        if (await folders[i].name.match(/\d{2,4}/))
        {
            let num = parseInt(await folders[i].name.match(/\d{2,4}/)[0]);
            console.log(`DocNum ${DocumentNumber} | Num ${num} | ${folders[i].name}`)
            if( num > DocumentNumber){
                break;
            }
            DocumentNumber++;
            
        }
    }
    DocumentNumber = DocumentNumber.toString().padStart(padding,'0');
    return DocumentNumber
}

async function  CreateDocumentFolder (DocumentNumber,Path,title) {
    let Slash = new RegExp(/(?!\/).+/gim);
    let DocumentFolder

    let NewPath = `${await Path.match(Slash)[0]}/${DocumentNumber} - ${title}`;


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
        

        const   File = await app.vault.getAbstractFileByPath(`${DocumentFolder.path}/${Meta[Title]} Description.md`);
        let   Data = await app.vault.read(File);

        Data = await AddMeta(Data);

        const HeaderPatter = new RegExp(/\# Title/);
        

        
        let links =""

        await AddPropertyToMeta(ParentDocument,DocumentFolder.path)

        for (const [key, value] of Object.entries(Templates)) {
            links+=`[[${DocumentFolder.path}/${Meta[Title]} ${key}|${key}]]\n`
            
            await CreateTemplate(DocumentFolder,value,key,tp)
        }

        
        Data = await Data.replace(HeaderPatter,`# ${Meta[Title]}\n${links}`)

        const AliasExp = new RegExp(`(?=alias\\ *:)((\\ *.+)+|.+)`,`gm`)
        Data = await Data.replace(AliasExp,`alias:\n - "${Meta[Title]}"`)

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
        const PropExp = new RegExp(`(?=${key}\\ *:)((\\ *.+)+|.+)`,`gm`)
        if (Array.isArray(Meta[key]))
        {
            let str =`${key}: \n`
            for(const val of Meta[key])
            {
                str+=` - ${val}\n`
            }
            Data = await Data.replace(PropExp,str)

            continue
        }

        Data = await 
        Data.replace(PropExp,`${key}: ${value}`)
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

        Data = await Data.replace(PropExp,`${value}`)
    }
    

    return Data
}



async function GetOverviewFile(DocumentFolder,OverviewTemplate,tp){
    
    let docPath = await DocumentFolder.path

    const TemplateTypeExp= new RegExp(`(\\w+\\ *\\/)*(\\d{2,4}\\-)?${OverView.Layer.replace(/\d{2}\-/i,"")}(?=.*)`,`igm`)

    let overviewPath = await docPath.match(TemplateTypeExp)[0]


    let Folder = await app.vault.getAbstractFileByPath(overviewPath)

    let File = await app.vault.getAbstractFileByPath(`${overviewPath}/${OverView.Layer.replace(/\d{2}\-/i,"")}.md`)

    if(!File)
    {
        await tp.file.create_new(
            OverviewTemplate,
            `${OverView.Layer.replace(/\d{2}\-/i,"")}`,
            false,
            Folder
        )
        .then(async()=>{

            let KH = await app.plugins.plugins["metaedit"].settings.KanbanHelper;
            setTimeout(async()=>{
                await KH.boards.push({boardName:`${OverView.Layer.replace(/\d{2}\-/i,"")}`,property:`${OverView.key}`})
            },3000)
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    File = await app.vault.getAbstractFileByPath(`${overviewPath}/${OverView.Layer.replace(/\d{2}\-/i,"")}.md`)

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
    // `\$\(.+\)`
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

    let Folder = await app.vault.getAbstractFileByPath(Path)
// (?<=\!\[\[)(\w[^(Banner|Media|icon|Daily|Files|Media|Attachments)]([\w \/|\ |\(|\)|\_|\-|\d|\.])*)+\.(gif|png|jpeg|mp4|jpg|jpeg|webm|mpeg|aac|flac|kmv|pdf)(?=\]\])
    const pattern       = RegExp(/(?<=\!\[\[)(?!.*(Banner|Media|icon|Daily|Files|Media|Attachments)).*(?!\.(gif|png|jpeg|mp4|jpg|jpeg|webm|mpeg|aac|flac|kmv|pdf))(?=\]\])/igm);

    // (?<=\!\[\[)((\d{1,}\-)?\w+[^(Banner|Media|icon|Daily|Files|Media|Attachments)]{0,}[\/|\ |\(|\)|\_|\-|\d|\.]{0,})+(?:\.(gif|png|jpeg|mp4|jpg|jpeg|webm|mpeg|aac|flac|kmv|pdf))


    let data = await app.vault.read(File);
    // console.log(`data`)
    // console.log(data)
    let matches = await data.match(pattern);
    // console.log(`Matches`)
    // console.log(matches)

//  check if the media folder already exists 



    if(!matches || matches.length == 0)
    {
        return
    }
    try{
        
        console.log(`Checking that The Media folder exists`)
        console.log(Folder)
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
        for(let match of matches)
        {
            
            let file = await app.vault.getAbstractFileByPath(`${match}`);

            console.log(`Trying to move folder\n${match}`)
            
            
            console.log(`found ${match}`)
            let Name=file.name.replace(/\:/gm,"-")
            await app.fileManager.renameFile(file,`${Path}/${Name}`)
        
            
        }
            
        
    }
    catch(err){
        console.log(err)
        new Notice(`Failed to add files to media folder for project\n@: ${Path}\ncheck console for information\ndouble click [ctrl + shift + i]`,10000);
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
    // .replace(/\d{2}\-/i,"")
    const OverviewFolder = new RegExp(`(.*)*(?:${OverView.Layer})`)
    
    if(!TemplatePath || TemplatePath.length == 0 || TemplatePath[0] == "")
    {
        console.log(`No Template Path`)
        return 
    }
    // Get Templates folder
    let TFolders = await getTemplatePaths(TemplatePath)

    // Get path to build path
    // and makes the folders 
    console.log(`BuildPath`)
    console.log(BuildPath)
    let Path= await getLayers(BuildPath,"/")

    // Get Templates
    const OptionalTemplates= await GetOptionalTemplates(TemplateExp,TFolders)
    //  Getting default and overview template
    let DefaultTemplate = await GetDefaultTemplate(DefaultExp,TFolders)
    console.log(`TFolder`)
    console.log(TFolders)

    
    console.log(`OverviewFolder`)
    console.log(OverviewFolder)
    console.log(TFolders[0].match(OverviewFolder))
    
    let OverviewTemplate = await GetOverviewTemplate(OverviewExp,await TFolders[0].match(OverviewFolder)[0])
    
    // get one or more Templates for user wants to use
    let Templates = await  PicOptionalTemplates(OptionalTemplates,tp)


    console.log(Path)
    
    // Get Sub Document folder
    let Folder = Path && Path[0]=="" ?  
    await File.path:
    await app.vault.getAbstractFileByPath(`${Path[0]}`)

    console.log(`Folder`)
    console.log(Folder)

    // Get the name of the current document to create the Sub Document folder
    await AddPropertyToMeta(ParentDocument,File.path)
    
    // Gets the sub document folder if it exist, and makes one if it dose not exist
    let SubDocumentFolder = await getSubDocumentFolder(File,Folder,Folder.path)

    
    Path = SubDocumentFolder.path;

    Folder = await app.vault.getAbstractFileByPath(`${Path}`)

    let DocumentNumber = await GetDocumentNumber(Folder,4) ;

    const DocumentFolder  = await CreateDocumentFolder(DocumentNumber,Path,Meta[Title])


    // Add date and time
    await AddPropertyToMeta(Created,`${await tp.date.now("YYYY/MM/DD - hh:mm a")}`)
    await AddPropertyToMeta(Modified,`<%+ tp.date.now("YYYY/MM/DD - hh:mm a") %>`)

    // Create main file for the sub document 
    let DocFile = await CreateDescriptionFile(DocumentFolder,DefaultTemplate,Templates,tp)


    let   Data = await app.vault.read(DocFile);
    const AliasExp = new RegExp(`(?=alias\\ *:)((\\ *.+)+|.+)`,`gm`)
    const NameExp = new RegExp(/\d{2,4} \- /mig)
    console.log("Alias")
    console.log(`${File.parent.name}`)
    console.log(`${File.parent.name.replace(NameExp,"")}`)
    Data = await Data.replace(AliasExp,`alias:\n - "${await File.parent.name.replace(NameExp,"")} - ${Meta[Title]}"`)
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

    if(!TemplatePath || TemplatePath.length == 0 || TemplatePath[0] == "")
    {
        return 
    }

    // Get Templates folder
    console.log(`TemplatePath`)
    console.log(TemplatePath)
    let TFolders = await getTemplatePaths(TemplatePath)

    console.log(`TFolders`)
    console.log(TFolders)

    // Get path to build path
    // and makes the folders 
    let Path=  !BuildPath ? "": await createBuildPath(BuildPath)

    // // Get templates
    const TemplateExp = new RegExp(/^(?!Description|Overview)(\w+\ )+(SubNote)/igm)
    const OptionalTemplates= await GetOptionalTemplates(TemplateExp,TFolders)

    

    // get only one Templates for user wants to use
    let Template = await  SelectTemplate(OptionalTemplates,tp)

    // Get Folder that contains the document Document folder
    Path =  Path==""  
    ?  `${File.parent.path}/SubNotes`:
    `${Path}`
    
    let Folder 
    // Get the name of the current document to create the Sub Document folder
    console.log(`File.path`)
    console.log(File.path)
    await AddPropertyToMeta(ParentDocument,File.path)
    
    // Gets the sub document folder if it exist, and makes one if it dose not exist
    let SubNoteFolder = await getFolder(Path)
    
    Path = SubNoteFolder.path;

    Folder = await app.vault.getAbstractFileByPath(`${Path}`)

    let SubNoteNumber = await GetDocumentNumber(Folder,2) ;
    
    // Add date and time
    await AddPropertyToMeta(Created,`${await tp.date.now("YYYY/MM/DD - hh:mm a")}`)
    await AddPropertyToMeta(Modified,`<%+ tp.date.now("YYYY/MM/DD - hh:mm a") %>`)

    let TemplateFile = await app.vault.getAbstractFileByPath(Template)

    const DocFile= await BuildSubNote(SubNoteNumber,File,Folder,Meta[Title],TemplateFile,tp)

    console.warn("looking for error")

    let   Data = await app.vault.read(DocFile);
    const AliasExp = new RegExp(`(?=alias\\ *:)((\\ *.+)+|.+)`,`gm`)
    const NameExp = new RegExp(/\d{2,4} - /ig)
    Data = await Data.replace(AliasExp,`alias:\n - "${await File.parent.name.replace(NameExp,"")} - ${Meta[Title]}"`)
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
        TFolders.unshift(`${TPath.replace(/^\//mg,"")}`)
    }
    TFolders.push('')
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

    console.log("File : ")
    console.log(File)
    console.log(File.path)
    console.log("Parent : ")
    console.log(File.parent.name)
    console.log(File.parent.name.match(/(?<=\d{2,4} \- ).+/)[0])
    
    let fileName = File.parent.name.match(/(?<=\d{2,4} \- ).+/)[0]

    fileName = fileName.replace(/\(/gm,"\\(")
    fileName = fileName.replace(/\)/gm,"\\)")
    let SubDocNameExp =   new RegExp (`\\d{2,4} - ${fileName}`,"gim")
        
    // Check for the Sub document.
    await Folder.children.findIndex(async(folder,index)=>{
        let match = await folder.name.match(SubDocNameExp)[0]

        if(match) SubDocumentFolder= folder
    })
    
    console.timeLog(SubDocumentFolder)

    //  if sub document folder don't already exist create one
    if(!SubDocumentFolder)
    {

        let SubDocumentNumber = await GetDocumentNumber(Folder,4)

        SubDocumentFolder =    await CreateDocumentFolder(SubDocumentNumber,Path,fileName)
    }
    return SubDocumentFolder
}

async function AddCardToOverView(DocumentFolder,OverviewTemplate,Path,tp){
    if(OverView.Layer && OverView.key)
    {
        const OV = await GetOverviewFile(DocumentFolder,OverviewTemplate,tp)
        
        if(!OV)
        {
            new Notice("Could not create Overview File")
            return
        }
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

async function BuildSubNote(SubNoteNumber,File,Folder,Title,TemplateFile,tp){
    
    console.log("building the template file ")
    console.warn(TemplateFile)
    return await tp.file.create_new(
        TemplateFile,
        `${SubNoteNumber} - ${Title}`,
        false,
        Folder
    )
    .then(async ()=>{
        let   file = await app.vault.getAbstractFileByPath(`${Folder.path}/${SubNoteNumber} - ${Title}.md`);
        let   Data = await app.vault.read(file);

        Data = await AddMeta(Data);

        const HeaderPatter = new RegExp(/\# Title/);
        

        Data = await Data.replace(HeaderPatter,`# ${Title}\n[[${File.path}|${File.name}]]`)

        
        await app.vault.modify(
            file,
            Data
        )
        .then(()=>{
            new Notice("Added SubNote MetaData");
        })
        .catch((err)=>{
            console.log(err)
            new Notice("Failed to add SubNote MetaData");
        })
        return file

    })
    .catch((err)=>{
        console.log(err)
        new Notice("Failed to create SubNote file")
    })
}