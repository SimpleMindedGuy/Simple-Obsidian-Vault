// In The Name of Allah, The Most Beneficent, The Most Merciful
let tp= null

/**
 * Takes a {@link File} object and reads it the runs it's commands, and it passes Templater to it.
 * 
 * @param {?object} File File object
 */
async function RunFileCommands(File)
{
    // Getting Templater object for running function
    tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`01-Commands: GetUserEntry:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

        // Getting Templater object for running functions
        tp = {}
        const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

        for (const fun of tpInternalFunctions) {
            tp[fun.name] = fun.static_object;  
        }

        tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();

        
    }
  

    if(!tp)
    {
        console.warn(`01-Commands: GetUserEntry:\ntemplater object was not found`)
        console.warn(tp)
        return
    }

    if(!File)
    {
        return;
    }
 
    console.log(`01-Commands: RunFileCommands:\nReading file: ${File.name}`)

    
    const FileText = await app.vault.read(File)
    console.log(FileText)
    console.log(`/////////////////////\n01-Commands: RunFileCommands:\nReading file CommandBlock`)
    
    const FileCommandsBlock = await tp.user.GetCommandsBlock(FileText)

    console.log(FileCommandsBlock)
    
    console.log(`/////////////////////\n01-Commands: RunFileCommands:\nReading file Commands`)
    
    const CommandLines = await tp.user.GetCommandLines(FileCommandsBlock)
    
    console.log(CommandLines)
    
    console.log(`/////////////////////\n01-Commands: RunFileCommands:\nRunning file Commands`)



    if(!CommandLines)
    {
        console.warn(`01-Commands: RunFileCommands:\nNo command lines provided`)
        console.warn(CommandLines)
        return
    }

    
    for (const Line of CommandLines)
    {
        console.log(`\n///////////////////`)
        const Command = await tp.user.ReadCommand(Line);
        const Argument =  await tp.user.ReadArgument(Line);
        console.log(`01-Commands: RunFileCommands:\nLine : ${Line}\nCommand : ${Command}\nArgument : ${Argument}`)
        await Commands[Command](Argument,tp)
        let BreakScript = await window?.pkvs?.load("BreakScript");
        
        // stop executing the script.
        if(BreakScript)
        {
            new Notice("You provided null/invalid value for a mandatory input.\nScript cannot continue.")
            break;
        }
    }

}

module.exports = RunFileCommands





const Commands = {
    SetCreatedKey : async (Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)

        await tp.user.SetCreatedKey(Argument);
    },
    SetModifiedKey : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)

        await tp.user.SetModifiedKey(Argument)
    },
    SetTitleKey : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)
        
        await tp.user.SetTitleKey(Argument)
    },
    SetParentKey : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)

        await tp.user.SetParentKey(Argument)
    },
    SetOverviewKey :async (Argument) =>{
        Argument = await tp.user.ReplaceValues(Argument)

        await tp.user.SetOverviewKey(Argument)
    },
    SetOverviewLayer : async (Argument) =>{
        Argument = await tp.user.ReplaceValues(Argument)

        await tp.user.SetOverviewLayer(Argument)
    },
    Dialog : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)
        
        const dialog = await tp.user.Dialog(Argument)
        return dialog;
    },
    Menu : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)

        
        const menu = await tp.user.Menu(Argument)
        return menu
    },
    Select : async (Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)

        // setting options for Dialog
        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: false,
        }

        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");

        // get the menu global value
        let menu = await window?.pkvs?.load("menu");

        // get user Choice
        let choice = await tp.user.GetUserChoice(dialog,menu,Options)

        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}

        Meta[Argument] = choice;
        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

        if(!choice || Array.isArray(choice))
        {
            
            return
        }

        return choice
    },
    SelectAdd : async (Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument)

        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: true,
        }

        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");

        // get the menu global value
        let menu = await window?.pkvs?.load("menu");

        let choice = await tp.user.GetUserChoice(dialog,menu,Options)

        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}


        if(!choice || Array.isArray(choice))
        {
            return
        }
        Meta[Argument] = choice;
        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

        return choice
        
    },
    SelectLayer : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);

        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: false,
        }

        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");

        // get the menu global value
        let menu = await window?.pkvs?.load("menu");

        // get user choice
        let choice = await tp.user.GetUserChoice(dialog,menu,Options);

        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}

        // if the choice is in valid, stop the script.
        if(!choice  || Array.isArray(choice))
        {
            
            await window?.pkvs?.store("BreakScript", true);
            return
        }

        Meta[Argument] = choice;

        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

        // get layers meta global value
        let layers = await window?.pkvs?.load("layers");
        // add layer to global value
        layers.push(choice);
        // set layers meta global value
        await window?.pkvs?.store("layers", layers);

        return choice

    },
    AddLayer : async(Argument) =>{
        Argument = await tp.user.ReplaceValues(Argument);

        // get layers meta global value
        let layers = await window?.pkvs?.load("layers");
        // add layer to global value
        layers.push(Argument);
        // set layers meta global value
        await window?.pkvs?.store("layers", layers);

    },
    Options : async(Argument)=>{

        Argument = await tp.user.ReplaceValues(Argument);
        const Options= {
            isMultiple: true,
            isOptional: true,
            isExpanding: false,
        }

        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");

        // get the menu global value
        let menu = await window?.pkvs?.load("menu");

        let choice = await tp.user.GetUserChoice(dialog,menu,Options);

        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}


        Meta[Argument] = choice;

        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

    },
    OptionsAdd: async(Argument)=>{

        Argument = await tp.user.ReplaceValues(Argument);
        const Options= {
            isMultiple: true,
            isOptional: true,
            isExpanding: true,
        }


        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");

        // get the menu global value
        let menu = await window?.pkvs?.load("menu"); 

        let choice =  await tp.user.GetUserChoice(dialog,menu,Options);

        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}

        Meta[Argument] = choice;

        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

        return choice 
    },
    Check : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);

        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: false,
        }

        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");
        

        let choice = await tp.user.GetUserChoice(dialog,[false,true],Options);

        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}

        // if the user does not choose anything, then default to false.
        if(choice === null)
        {
            Meta[Argument] = false
            return 
        }
        
        Meta[Argument] = choice;

        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

        return choice
    },
    Input : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);
        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}

        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");
        

        Meta[Argument] = await tp.user.GetUserEntry(dialog,false,false);
        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

        
    },
    List : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);
        // get meta global value
        let Meta = await window?.pkvs?.load('Meta') ?? {}

        // get dialog global value
        let dialog = await window?.pkvs?.load("dialog");

        Meta[Argument] = await tp.user.GetUserEntry(dialog,true,true);

        // set meta global value
        await window?.pkvs?.store("Meta",Meta);

        
    },
    SetDate : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);

        let currentDate = await tp.user.SetDate(Argument);

        if (!currentDate)
        {
            return 
        }
        // set meta global value
        currentDate = await window?.pkvs?.store("currentDate",currentDate);

        
    },
    SetDateFormat : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);
        
        let currentDateFormat = await tp.user.SetDateFormat(Argument);
        
        // set meta global value
        await window?.pkvs?.store("currentDateFormat",currentDateFormat);

    },
    StoreDate : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);

        
        await tp.user.StoreDate(Argument);
    },
    StoreFormattedDate : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);

        await tp.user.StoreFormattedDate(Argument);
    },
    SetSearchQuery : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);
        console.info(`Search query was set to ${Argument}`)

        
        let SearchQuery = Argument.trim();

        await window?.pkvs?.store("SearchQuery",SearchQuery);

    },
    SetSearchKey : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);
        console.info(`Search key was set to ${Argument}`)
        SearchKey = Argument;

        await window?.pkvs?.store("SearchKey",SearchKey);


    },
    GetQueryList : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);

        let Meta = await window?.pkvs?.load("Meta");
        
        let SearchQuery = await window?.pkvs?.load("SearchQuery");
        let SearchKey = await window?.pkvs?.load("SearchKey");

        Meta[Argument] = await  await tp.user.GetQueryList(SearchQuery,SearchKey);
        console.log(Meta[Argument])
        
        await window?.pkvs?.store("Meta", Meta)
        
    },
    GetValue : async (Argument) =>{
        Argument = await tp.user.ReplaceValues(Argument);
        await tp.user.GetValue(Argument);
    },
    SetValue : async(Argument,tp)=>{
        Argument = await tp.user.ReplaceValues(Argument);
        await tp.user.SetValue(Argument);
    },
    StoreValue : async(Argument)=>{
        Argument = await tp.user.ReplaceValues(Argument);
        await tp.user.StoreValue(Argument);
    },
    NextFile : async(Argument)=>{
        // Argument = await tp.user.ReplaceValues(Argument)
        await tp.user.NextFile();
    },
    // DocumentTemplate  : async(Argument)=>{
    //     // Argument = await tp.user.ReplaceValues(Argument)
    //     console.log(`Building Document `);
    //     await tp.user.BuildDocument(Argument);

    // },
    BuildDocument  : async(Argument)=>{
        // Argument = await tp.user.ReplaceValues(Argument)
        console.log(`01-Commands: RunFileCommands: Commands.BuildDocument(): Building Document\n`);

        let BuildOptions =  {
            BuildRoot : `/`,
            HasDirectory : true,
            isDirectoryNumbered : true,
            isFileNumbered : false,
            MakeOverview : true,
            MakeDefault : true,
            isTemplateName : true,
            isMultiTemplate : true
        };
        await tp.user.BuildDocument(BuildOptions);
        
        

    },
    BuildSubDocument : async(Argument)=>{
        // Argument = await tp.user.ReplaceValues(Argument)

        const FileExtensionRegExp = new RegExp(/(?<=^.*)\..+$/gm)

        let currentFilePath = await window?.pkvs?.load("currentFilePath");
        let currentFile = await app.vault.getAbstractFileByPath(currentFilePath)

        let parentKey = await window?.pkvs?.load("parentKey");
        let Meta = await window?.pkvs?.load("Meta");



        let filePath = await currentFile.path.replace(FileExtensionRegExp,'');
        let fileName = await currentFile.name.replace(FileExtensionRegExp,'');

        Meta[parentKey] = `\"[[${filePath}|${fileName}]]\"`;
        console.log(`01-Commands: RunFileCommands: Commands.BuildSubDocument():\nBuilding Sub Document`);
        console.log(Meta[parentKey]);
        



        let BuildOptions =  {
            BuildRoot : `/`,
            HasDirectory : true,
            isDirectoryNumbered : true,
            isFileNumbered : false,
            MakeOverview : true,
            MakeDefault : true,
            isTemplateName : true,
            isMultiTemplate : true
        };
        await tp.user.BuildDocument(BuildOptions);
        
    },
    BuildSubNote : async(Argument)=>{
        // Argument = await tp.user.ReplaceValues(Argument)
        const FileExtensionRegExp = new RegExp(/(?<=^.*)\..+$/gm)


        let currentFilePath = await window?.pkvs?.load("currentFilePath");
        let currentFile = await app.vault.getAbstractFileByPath(currentFilePath)

        let parentKey = await window?.pkvs?.load("parentKey");
        let Meta = await window?.pkvs?.load("Meta");



        let filePath = await currentFile?.path?.replace(FileExtensionRegExp,"");
        let fileName = await currentFile?.name?.replace(FileExtensionRegExp,"");

        Meta[parentKey] = `\"[[${filePath}|${fileName}]]\"`;
        console.log(`01-Commands: RunFileCommands: Commands.BuildSubNote():\nBuilding Sub Note`);
        console.log(Meta[parentKey]);

        await window?.pkvs?.store("Meta",Meta);

        let BuildOptions =  {
            BuildRoot : `${currentFile.parent.path}`,
            HasDirectory : false,
            isDirectoryNumbered : false,
            isFileNumbered : true,
            MakeOverview : false,
            MakeDefault : false,
            isTemplateName : false,
            isMultiTemplate : false
        };
        await tp.user.BuildDocument(BuildOptions);

    },
    BuildInFile : async(Argument)=>{
        let currentFilePath = await window?.pkvs?.load("currentFilePath");
        let currentFile = await app.vault.getAbstractFileByPath(currentFilePath)

        let Meta = await window?.pkvs?.load("Meta");

        await window?.pkvs?.store("Meta",Meta);

        await tp.user.ReplaceYmlWithMetaIntoFile(currentFile);
        await tp.user.ReplaceInlineValueWithMetaIntoFile(currentFile);
        
    },
    MoveMedia : async(Argument)=>{
        let currentFilePath = await window?.pkvs?.load("currentFilePath");
        let currentFile = await app.vault.getAbstractFileByPath(currentFilePath)

        let Meta = await window?.pkvs?.load("Meta");


        let padding = await window?.pkvs?.load("Padding");
        Argument = await tp.user.ReplaceValues(Argument)
        console.log(`Moving Media Files`)

        await window?.pkvs?.store("Meta",Meta);

        await tp.user.MoveMedia(currentFile,Argument,true,padding)
    }
}
