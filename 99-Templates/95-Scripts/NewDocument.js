

/**
 * Stops the script from executing and applies no changes to anything. 
 * Conditions : 
 * - When user does not provide a valid mandatory value. 
 * @date 03/02/2024 - 01:03:21
 *
 * @type {boolean}
 */
let BreakScript = false;

/**
 * The time given for a function before it finishes.
 * if the function dose not return anything, the function is then suspended, and it the value null is given. 
 * @date 26/12/2023 - 14:26:29
 *
 * @type {number}
 */
let TimeLimit = 5000;


/**
 * specifies the amount of digits used in The names of numbered files
 * @date 27/12/2023 - 15:32:33
 *
 * @type {number}
 */
let Padding = 2;

/**
 * @date 16/12/2023 
 * used to store Text that will be displayed in dialogs;
 * @type {string}
 * 
*/

let dialog;


/**
 * A variable to holds a list set by the function {@link Menu}, this list is then later user to dispaly options along with the {@link dialog} for the user to chose one or more from those options.
 * 
 * Functions that use menu are 
 * - {@link SelectLayer}
 * - {@link Select}
 * - {@link Option}
 * - {@link Check}
 * @date 27/12/2023 
 *
 * @type {Array<string>}
 */
let menu =[];

/** 

 * @date 16/12/2023 
 * @type {string[]} layers
 * - Array tyhat stores the paths 
 * - used to Store Build Path, and also refers to the path of templates startng from the TemplateRoot Folder
 * - Each layer is a directory.
 * - if a directory exists it will use it. 
 * - Document directory will be built on the last layer
 * - Build Path starts from root Directory of the vult by default
*/
let layers=[];
/**
 * @type {File} 
 * - Object that contains the current file that is being read
 * - Only used to look for commands.
*/
let currentFile;

/**
 * @type {Object|null} 
 * - Object that contains the properties/values if any of the {@link currentFile}
 * - only set when the uesr is trying to get a value from the current file, using the command {@link GetValue}
 * - the currentFile changes, then the value is reset to an empty object.
*/
let currentFileProperties = null;



/**
 * Description placeholder
 * @date 24/12/2023
 * - Object that contains current Template Directory.
 * - used to get Template Files.
 * @type {File}
 */
let TemplateFolder

/**
 * @type {number} 
 * - the Index of the current layer working in, based on the values stored in the {@link layers} array
*/
let layerIndex=0;

/**
 * @type {object|null} 
 * - The overview file if any.
*/
let Overview=null;
    
/** 
 * 
 * @date 16/12/2023 
 * @typedef {Object}  Meta
 * used to store propertis and values to be used in documents, mostly used for writing metadata.
 * - All said properties will be added to the document's files, assumiing that those properties exist in the Yml port of said document
 *  - if not the script will then look for any expression of properties within the documents text (this might not work yet)
 * 
 * 
 * @property {string[]} tags - Arraay of strings
 * - Stores Tags that will be added to document
 * @property {string[]} aliases - Array of strings
 * - Stores The alials for the document.
 * @property {?*} [otherprops] - other properties may be added to be written to the document
 */
let Meta={
    tags:[],
    aliases:[],
    
};


/**
 * @date 16/12/2023 
 *
 * @typedef {string} createdKey - Stores the Name of variable/key that will be used to store the Created date of a document
 * @typedef {string} modifiedKey - Stores the Name of variable/key that will be used to store the date of which the document was last modified.
 * 
 * @typedef {string} titleKey - Stores the Name of variable/key that will be used to store the Title of the document.
 * 
 * @typedef {string} parentKey - Stores the Name of variable/key that will be used to store a link to the parent document of the document.
 * 
 * @typedef {string|null} OverviewKey - Stores the Name of variable/key that will be used to specifiy which key is used to link the Ovewview File, with the documents associated with that oveview file.
 * @typedef {string|null} OverviewLayer - Stores the Name of layer of which the overview file will be made at.
 */
let createdKey="Created",
    modifiedKey="Modified",
    titleKey = "Title",
    parentKey= "Parent",
    OverviewKey= null,
    OverviewLayer= null



/**
 * Values used for using Dataview to search for Keys, using search filters
 * @date 02/02/2024 - 23:34:17
 * @typedef {string} SearchQuery - Use to make a query of all the files that full fill those properties.
 * @typedef {string} SearchKey - The key that holds the returned value. 
 * @typedef {string[]|number[]} SearchData - A list of all values matching the query.
 */
let SearchQuery ="",
    SearchKey = "",
    SearchData;



/**
 * - variables that are important for getting and setting date values, and other values.
 * - can be stored in keys inside the {@link Meta} object
 * 
 * 
 * @date 16/12/2023 
 *
 * @typedef {string} currentDateFormat - stores the Date format 
 * - will be used to writte formatted daate using the {@link currentDate} value
 * - will be used to write {@link currentDate} value when providing using the {@link SetDate}
 * 
 * @typedef {Date} currentDate - Stores the value for date as a date object.
 * @typedef {*} value - Stores any value given using the command {@link SetValue} 
 */
let currentDateFormat="YYYY-MM-DDTHH:mm:ssZ",
    currentDate, 
    currentValue ;

    


/**
 * Folder paths 
 * - important for the utility to  know where to read commands from 
 * @date 16/12/2023 
 *
 * @typedef {string} TemplatePath 
 * - Folder where templates are stored.
 * @typedef {string} ConfigPath
 * - File where config file is stored
 * - config file will always be read first
 * - used to set values to some form of default that the usuer prefers
 * @typedef {string} NewDocumentPath 
 * - Utilty default Command file
 * - mostly used generaate a new document that is not -necceraly- related to any other document.
 * @typedef {string} SubNotePath
 * - Utility Default SubnNote Templates Folder
 * - May be removed later on.
 */
let TemplatePath = `99-Templates`,
    ConfigPath = '99-Templates/Config.md',
    NewDocumentPath = '99-Templates/NewDocument.md',
    SubNotePath = '99-Templates/60-SubNote';


    
/**
 * @async 
 * 
 * @param {object} tp Templater utility
 * @param {?boolean} Active  Active file
 * - {true} : read the active file, and ignore the NewDocument File
 * - {false} : read the newDocument File
 */
async function main(tp,Active){

    

    console.log(`reading the Config File`)
    currentFile = await app.vault.getAbstractFileByPath(ConfigPath)


    console.log(currentFile)
    
    await RunFileCommands(currentFile,tp)
    
    Meta[createdKey]  = tp.date.now ("");
    Meta[modifiedKey] = tp.date.now ("");
    if(!Active)
    {

        
        //  Reading the NewDocuemnt file
        console.log(`reading the New Document file`)
        currentFile = await app.vault.getAbstractFileByPath(NewDocumentPath)
        
        await RunFileCommands(currentFile,tp)
    
        console.warn("Meta")
        console.warn(Meta)

        return
    }

    currentFile = await app.workspace.getActiveFile()

    console.warn(`Reading active file `)
    console.log(currentFile)


    await RunFileCommands(currentFile,tp)
    console.warn(`Meta`);
    console.warn(Meta);

    await RemoveCommandBlock(currentFile)

}

module.exports = main

/**
 * Takes a {@link File} object and reads it the runs it's commands, and it passes Templater to it.
 * 
 * @param {?object} File File object
 * @param {object} tp Templater utility
 */
async function RunFileCommands(File,tp)
{
    // Reading the config file

    
    console.log("Reading file . . . ")
    console.log(File)

    
    const FileText = await app.vault.read(File)

    console.log(`/////////////////////\nReading file CommandBlock`)
    
    const FileCommandsBlock = await getCommandsBlock(FileText)
    
    console.log(FileCommandsBlock)
    
    console.log(`/////////////////////\nReading file Commands`)
    
    const FileCommands = await getCommandLines(FileCommandsBlock)
    
    console.log(FileCommands)
    
    console.log(`/////////////////////\nRunning file Commands`)

    await RunCommands(FileCommands,tp)


}



/**
 * Reads the Provided file, and removes all the command blocks if any. 
 * 
 * @date 31/12/2023
 *
 * @async
 * @param {Object} file
 * @returns {Promise<void>}
 */
async function RemoveCommandBlock(file){

    const CommandBlockRegExp = new RegExp(/(?<=[^!:;()'"`.*^#@=/<>,\[\]~\{\}\|\\\-+]+)^\n*{{3}:{3}(.*?)\:{3}}{3}\n*?(?=[^!:;()'"`.*^#@=/<>,\[\]~\{\}\|\\\-+]+)/smgi);

    let Text = await app.vault.read(file)

    if(!Text)
    {
        console.log(`Could not read File`)
        console.log(file.path)
        // return false;
    }

    let func = async ()=>{
        return Text.replace(CommandBlockRegExp,"")
    }

    Text = await TimeoutAfter(func,TimeLimit)


    func =  async ()=>
    { 
        return app.vault.modify(
        file,
        Text
        )
        .then(()=>{
            console.log(`removed Command Block`)
            return true
        })
        .catch(()=>{
            console.warn(`failed faild to remove comand block`)
            return false
        })
    }

    
    await TimeoutAfter(func,TimeLimit)
    // Text = await 
}

/**
 * Takes a text from a file and returns the Commands block if any 
 * if it there is no commad block it returns null
 * @date 16/12/2023
 *
 * @async
 * @param {?string} Text
 * @returns {Promise<string|null>}
 */
async function getCommandsBlock(Text)
{
    const CommandBlockRegExp = new RegExp(/(?<={{3}:{3})(.*?)(?=:{3}}{3})/smgi);

    console.log(`Getting Command block`)
    if(!Text)
    {
        console.warn(`Text provided is undefined`)
        console.warn(Text)
        return null
    }

    let  func = async ()=>
    { 
        return Text.match(CommandBlockRegExp);
    }

    console.log(`Matching block`)

    // console.log(Text)

    const isMatch = await TimeoutAfter(func,TimeLimit)

    if(!isMatch)
    {
        console.warn(`Text dose not include a command block`)
        console.warn(isMatch)
        return null
    }
    let commandsBlock = isMatch[0];

    return  commandsBlock;
}


/**
 * Takes a text {@link commandBlock} and looks for comands lines in it. and returns the command lines.
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {?string} CommandBlock
 * @returns {Promise<string[] | null>}
 */
async function getCommandLines(CommandBlock){

    const CommandRegExp = new RegExp(/(\w+)\ *\:\ *(.+)?(\=\>\ *.*|\[.*\]\ *\=\>\ *.*|(?:\{(\n.*)+?)(?<=\n\}))/g);

    if(!CommandBlock)
    {
        console.warn(`No command block provided`)
        console.warn(CommandBlock)
        return null
    }

    

    let  func =   async ()=>
    { 
        return CommandBlock.match(CommandRegExp);
    }

    let CommandLines = await TimeoutAfter(func,TimeLimit);

    if(!CommandLines)
    {
        console.warn(`No Commands found in the Command block`)
        console.warn(CommandLines)
        return null
    }

    return CommandLines;
}


/**
 * Reads the **Command Lines** provided, then Runs the **Command**  prvided.
 * 
 * and passes the tenplater object for each function.
 * 
 * @date 16/12/2023 
 * @async
 * @param {string[]|null} CommandLines
 * @param {Object|null} tp
 * @returns {Promise<void>}
 */
async function RunCommands(CommandLines,tp){

    if(!CommandLines)
    {
        console.warn(`no command lines provided`)
        console.warn(CommandLines)
        return
    }

    if(!tp)
    {
        console.warn(`templater is not provided`)
        console.warn(tp)
        return
    }

    for (const Line of CommandLines)
    {
        console.log(`\n///////////////////`)
        const Command = await readCommand(Line);
        const Argument =  await readArgument(Line);
        console.log(`Line : ${Line}`)
        console.log(`Command : ${Command}`)
        console.log(`Argument : ${Argument}`)
        await Commands[Command](Argument,tp)
        // stop executing the script.
        if(BreakScript)
        {
            new Notice("You provided null/invalid value for a mandatory input.\nScript cannot continue.")
            break;
        }
    }
}



/**
 * Reads a **Line** and returns the Command in the line if any.
 * returns null if there is no Command found.
 * 
 * 
 * @date 16/12/2023 
 * @async
 * @param {string} Line
 * @returns {Promise<string|null>}
 */
async  function readCommand (Line){
    const CommandRegExp = new RegExp(/(\w+)(?=\ *\:\ *)/s);


    let  func = async()=>
    { 
        return Line.match(CommandRegExp);
    }

    const isMatch = await TimeoutAfter(func,TimeLimit)

    if(!isMatch)
    {
        console.warn(`no line provided`)
        console.warn(Line)
        return null
    }
    const Command  = isMatch[0]

    return Command
}

/**
 * Reads a **Line** and returns the Argument of a command in the line if any.
 * returns null if there is no Argument for a command found.
 * @date 16/12/2023 
 *
 * @async
 * @param {string} Line
 * @returns {Promise<string|null>}
 */
async function readArgument (Line){
    const ArgumentRegExp = new RegExp(/((?<=\w*\=\ *\>\ *\{\n*)([\u0000-\u0008|\u0010-\uffff])(\n*[\u0000-\u0008|\u0010-\uffff])*(?=\n*\}))|((?<=\w*\=\ *\>\ *)\[([\u0000-\u0008|\u0010-\uffff])+(?:\]))|(?<=\w*\=\ *\>\ *)(?:[^\u0020|\[|\]|\{|\}|\n|\\|\/][\u0010-\uffff]*[^\u0020|\[|\]|\{|\}|\n|\\|\/]*)/gmi)

    
    let  func = async()=>
    { 
        return Line.match(ArgumentRegExp)
    }
    const isMatch = await TimeoutAfter(func,TimeLimit)

    if(!isMatch)
    {
        console.warn(`no line provided`)
        console.warn(Line)
        return null
    }

    const Arguemnt = isMatch[0]

    return Arguemnt
}


/**
 * Sets the {@link createKey} to some other value.
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @param {object|null} tp
 * @returns {Promise<void>}
 */
async function SetCreatedKey(Argument,tp){
    console.log(`Setting Created Date key/viralbe to ${Argument}`);

    if(!Argument)
    {

        console.warn(`Cannot set ( createdKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }
    createdKey = Argument;
    console.log(createdKey);
}

/**
 * Sets the {@link modifiedKey} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @param {object|null} tp
 * @returns {Promise<void>}
 */
async function SetModifiedKey(Argument,tp){
    console.log(`Setting Modified Date key/viralbe to ${Argument}`);

    if(!Argument)
    {

        console.warn(`Cannot set ( modifiedKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }
    modifiedKey = Argument;
    console.log(modifiedKey);
}


/**
 * Sets the {@link titleKey} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @param {object|null} tp
 * @returns {Promise<void>}
 */
async function SetTitleKey(Argument,tp){
    console.log(`Setting Title Date key/viralbe to ${Argument}`);

    if(!Argument)
    {
        console.warn(`Cannot set ( titleKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }

    titleKey = Argument;
    console.log(titleKey);
}

/**
 * Sets the {@link parentKey} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @param {object|null} tp
 * @returns {Promise<void>}
 */
async function SetParentKey(Argument,tp){
    console.log(`Setting Parent Date key/viralbe to ${Argument}`);

    if(!Argument)
    {
        console.warn(`Cannot set ( parentKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }
    parentKey = Argument;
    console.log(parentKey);
}

/**
 * Sets the {@link dialog} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @param {object|null} tp
 * @returns {Promise<void>}
 */
async function Dialog(Argument,tp){
    console.log(`Setting next Dialog to`);
    console.log(Argument);

    if(!Argument)
    {
        console.warn(`cannot set dialog to null`)
        console.warn(Argument)
        return 
    }

    const WhiteSpaceRegExp = new RegExp(/^\ +|\ {2,}|\ +$/gm)
    const NewLineRegExp = new RegExp(/^\n+|\n{2,}|\n+$/gm)

    dialog = await Argument.replace(NewLineRegExp,"").replace(WhiteSpaceRegExp,"");
}


/**
 * Creates a new menu
 * Sets the {@link menu} to some other value
 * 
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @param {object|null} tp
 * @returns {Promise<String[]|[]>}
 */
async function Menu(Argument,tp){
    console.log(`Setting new Menu to`);

    let list = []
    if(!Argument)
    {
        console.warn(`Cannot get new menu values form Null/Undefined`)
        list = []
        console.warn(`Seeting menu to an empty menu`)
        console.log(menu)
        return list
    }
    const Bracet= new RegExp(/((?<=\ *\[)([\u0000-\u0008|\u0010-\uffff])+(?=\ *\]))/gm)

    let  func = async()=>
    { 
        return Argument.match(Bracet)
    }
    const isMatch = await TimeoutAfter(func,TimeLimit);

    if(!isMatch)
    {
        menu = new Array
        console.warn(`No menu items found `)
        console.warn(`Seeting menu to an empty menu`)
        console.log(menu)
        return  menu
    }
    // prevent duplicates
    console.log(menu);
    return [isMatch[0].split(",")]
}




/**
 * takes a date value {@link Argument}, reads it in  the format {@link currentDateFormat} and then sets the date value to {@link currentDate}. 
 * 
 * - if the provided Date value is not valid according to the format, the function will do nothing.
 * - if the provided Date value is valid accoding the to the format, then the {@link currentDate} will be set to the date vaule, in an ISO format.
 * - if there is not date value provided, then the {@link currenDate} is set to a new date value in an ISO format.
 * 
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired date value.
 * @param {object|null} tp - templater object for user prompts.
 * 
 * @returns {Promise<void>}
 */
async function SetDate(Argument,tp){
    
    console.log(`Setting Current date value to  ${Argument}`)


    if(!Argument)
    {
        currentDate = new tp.date.now ("")
        console.warn(`no date provided`)
        console.warn(`Setting Current date value to a new date `)
        console.warn(currentDate)
        return
    }
    let isValid = moment(Argument, currentDateFormat).isValid();
    
    if(!isValid)
    {
        console.warn(`Date provided is not valid for current Date format\nProvided Date : ${Argument}\nCurrent Format : ${currentDateFormat}`)
        console.warn(`the date will be read using moment(Date)`)
        currentDate = await moment(Argument)
        return
    }
    currentDate =  Argument ? await moment(Argument,currentDateFormat).format("YYYY-MM-DDTHH:mm:ssZ") : new moment().format("YYYY-MM-DDTHH:mm:ssZ") ;

    console.log(`Setting Current date value to a new date `)
    console.log(currentDate)
    
}

/**
 * Sets the {@link currentDateFormat} value to the provided {@link Argument} 
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired date value.
 * @param {object|null} tp - templater object for user prompts.
 * 
 * @returns {Promise<void>}
 */
async function SetDateFormat(Argument,tp){

    console.log(`Setting Date format to => ${Argument}`)

    currentDateFormat = Argument

}


/**
 * Stores the {@link CurreDate} value in {@link Meta} using the Key provided {@link Argument}.
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired key to store date value in Meta.
 * @param {object|null} tp - templater object for user prompts.
 * 
 * @returns {Promise<void>}
 */
async function StoreDate(Argument,tp){

    console.log(`Storing Current date => `)
    console.log(currentDate)
    console.log(`in variable called `)
    console.log(Argument)

    if(!currentDate)
    {
        currentDate = await moment().format("YYYY-MM-DDTHH:mm:ssZ")
    }
    Meta[Argument] = currentDate
}


/**
 * Stores the {@link CurreDate} value formatted using {@link currentDateFormat} in {@link Meta} using the Key provided {@link Argument}.
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired key to store date value in Meta.
 * @param {object|null} tp - templater object for user prompts.
 * 
 * @returns {Promise<void>}
 */
async function StoreFormattedDate(Argument,tp){

    console.log(`Storing Current date => ${currentDate} with format : ${currentDateFormat}  \n in a key/variable ${Argument}`)

    if(!currentDate)
    {
        currentDate = await moment().format("YYYY-MM-DDTHH:mm:ssZ");
    }

    const formatedDate =  await moment(currentDate).format(currentDateFormat) ;

    Meta[Argument] = formatedDate;


    console.log(`Storing Current date => `)
    console.log(currentDate)
    console.log(`using foramt `)
    console.log(currentDateFormat)
    console.log(`in variable called `)
    console.log(Argument)

    console.log(`Storing Text date in  ${Argument} =>  ${Meta[Argument] }`)

}

/**
 * Reads the {@link CurrentFile} and looks for a key that matches the value of {@link Argument} and then it takes its value if any, and assigns it to the variable {@link currentValue}.
 * 
 * - First it looks for  the value inside the YML blcok, then if nothing is found, it will look for an inline value. 
 * - the function will test the value is a number, and if it is a boolean, then if it is an array, then if it is a string. 
 * - if nothing is found then th returns null
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired new value 
 * @param {*} tp - templater object for user prompts.
 * 
 * @returns {Promise<*>}
 */
async function GetValue(Argument,tp){

    console.log(`reading the current value of a virable/key with the name\n${Argument}\nfrom teh currente file \n@${currentFile.path}`)
    


    if(!currentFileProperties)
    {
        console.log(`Getting current file properties.`)
        currentFileProperties = await GetFileProperties(currentFile)
    }

    console.log(`Getting property =>`)
    console.log(Argument)
    console.log(`from curreant file perties, and storing it in the global value variable.`)
    

    currentValue = await currentFileProperties[Argument];


}

/**
 * Sets the {@link currentValue} value to provided {@link Argument}.
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired new value 
 * @param {object|null} tp - templater object for user prompts.
 * 
 * @returns {Promise<void>}
 */
async function SetValue(Argument,tp){

    const Bracet= new RegExp(/((?<=\ *\[)([\u0000-\u0008|\u0010-\uffff])+(?=\ *\]$))/gm)

    console.log(`Setting Value to the global 'value' variable`)

    let  func = async()=>
    { 
        return Argument.match(Bracet)
    }

    const isValid = await TimeoutAfter(func,TimeLimit)

    if(!isValid)
    {
        
        currentValue = Argument
        console.warn(currentValue)
        return
    }
    
    currentValue = isValid[0].split(",");

    
    console.log(currentValue)
}


/**
 * Stores the {@link currentValue} value in {@link Meta} using a key/variable provided in {@link Argument}.
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - They of which to store the value in the global variable {@link Meta}
 * @param {object|null} tp - templater object for user prompts.
 * 
 * @returns {Promise<void>}
 */
async function StoreValue(Argument,tp){

    console.log(`Storing Value =>`)
    console.log(currentValue)
    console.log(`in a key/variable called =>`)
    console.log(Argument)

    Meta[Argument] = currentValue;

}



/**
 * Replaces expressions that hold the a keyname in the provided Text {@link Arguemnt}
 * with corresopnding values in of those keys in {@link Meta}
 * 
 * - the expression would look something like > !(keyname)
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - provided text
 
 * 
 * @returns {Promise<string|null>}
 */
async function ReplaceValues(Argument){
    console.log(`replacing any variables/keys if any with their corresponding values `)

    if(!Argument)
    {
        console.warn(`no argument provided`)
        console.warn(Argument)
        return Argument
    }
    const KeysRegExp = new RegExp(/(?<=\!\(\ *)([\u0000-\u0009|\u0010-\u0029|\u0030-\uffff])*\ *(?=\))/gm)


    let  func = async()=>
    { 
        return Argument.match(KeysRegExp)
    }


    const isKeys = await TimeoutAfter(func,TimeLimit)
    if(!isKeys)
    {
        console.warn(`no keys found in argument => `)
        console.warn(Argument)
        return Argument
    }
    
    console.log(`Matched keys`)
    console.log(isKeys)

    let Text = Argument

    for(const key of  isKeys)
    {
        const KeyRegExp = new RegExp(`\\!\\(\\ *${key}\\ *\\)`,`gm`)
        console.log(`replacing key : ${key}`)
        console.log(`with the value = `)
        console.log(Meta[key])
        // console.log(`using the expression `)
        // console.log(KeyRegExp)


        
        Text  = await Text.replace(KeyRegExp,Meta[key])
    }

    console.log(`New Text => `)
    console.log(Text)
    return Text
}


/**
 * - Moves to the next file in {@link layers} 
 * - Sets to the value for {@link currentFile},
 * And reads the commands in it.
 * 
 * @date 16/12/2023 
 *
 * @async
 * @param {any} Argument - used for nothing.
 * @param {object|null } tp - used for nothing.
 * @returns {Promise<void>}
 */
async function NextFile(Argument,tp){
    console.log('Mocing to next Layer')
    console.log(`Layer Index = ${layerIndex}`)
    
    console.log(`Folder => : `)
    const ParentFolder = currentFile.parent;
    console.log(ParentFolder);


    console.log(`Getting next folder`)
    const NextFolder = await GetDirectory(layers[layerIndex],`${ParentFolder.path}`)
    
    
    console.log(`Getting next file`)
    currentFile = await GetFile(layers[layerIndex],NextFolder.path)

    console.log(`increasing Layer Index : ${layerIndex} => ${layerIndex+1}`)

    layerIndex++

    await RunFileCommands(currentFile,tp)

}


async function SetOverviewKey (Argument,tp){
    console.log(`Setting Overview Key to ${Argument}`)
    OverviewKey = Argument;
}

async function SetOverviewLayer (Argument,tp){
    console.log(`Setting Overview Layer to ${Argument}`)
    OverviewLayer = Argument;
    
}


/**
 * Creates a Note with a the provided Name : {@link Name}, @ the provided path {@link Directry}, using the provided Template {@link Template}.
 * 
 * 
 * @date 16/12/2023
 *
 * @param {string} Name - Name of the note 
 * @param {object} Directory - folder Object that will contain the note
 * @param {object} Template - the path to the template used to make this note. 
 * @returns {Promise<object|null>}
 */
async function CreateTemplateNote(Name,Directory,Template,tp){

    console.log(`Creating a Note \n@:${Directory.path}\nwith the name ${Name}\nUsing The Template : ${Template.path}`)

    const isSuccessful = await tp.file.create_new(
        Template,
        Name,
        false,
        Directory
    )
    .then(async(file)=>{
        console.log(file);
        console.log(`Successfully created note at \n${Directory.path}/${Name}.`)
        return file
    })
    .catch(async(error)=>{
        console.warn(`Failed to create note.`);
        console.warn(error);
        return null
    })


    return isSuccessful

}


/**
 * Creates a directry with the provided name {@link Name}.
 * 
 * At the directory {@link Path}.
 * 
 * 
 * @date 16/12/2023 - 20:04:33
 *
 * @param {string} Name - Directry name
 * @param {string} Path - Path where The Directory should be placed at. 
 * @returns {Promise<object|null>}
 */
async function CreateDirectory(Name,Path)
{
    console.log(`\nMaking a directory with the name ${Name} at ${Path}`);
    const isSuccessful = await app.vault.createFolder(`${Path}/${Name}`)
    .then((file)=>{
        console.log(`Successfully created directory at \n${Path}/${Name}`)
        return file
    })
    .catch((error)=>{
        console.warn(`\nFailed to make a Directory.`)
        console.warn(`error : `)
        console.warn(error)
        return null
    })

    return isSuccessful
}


/**
 * Finds a directry with the provided name {@link Name}, at the path/directory  {@link Path}
 * 
 * it will match any directory that have the provided {@link Name}, even if it was numbered. 
 * 
 * if a match is found it returns a Directory(Folder) Object
 * @date 16/12/2023
 *
 * @async
 * @param {String} Name
 * @param {String} Path
 * @returns {Promise<object|null>}
 */
async function GetDirectory(Name,Path)
{

    console.log(`looking for a directory with the \nname: ${Name}`)
    console.log(`at the directory ${Path}`)

    console.log(`getting directory ${Path} . . .`)

    const Directory = await app.vault.getAbstractFileByPath(Path)

    console.log(`Directory`)
    console.log(Directory)

    if(!Directory)
    {
        console.warn(`Directory dose not exist/ could not find directory`)
        return null;
    }

    if(!Directory.children || Directory.children.length === 0 )
    {
        console.warn(`Directory dose not have any children`)
        return null;
    }

    
    const DirNameRegExp = new RegExp(`^(?:\\d{1,}\\ *\\-\\ *)?${Name}$`,`gm`);
    console.log(DirNameRegExp);
    

    for (const dir of Directory.children)
    {
        let isMatch = await DirNameRegExp.test(dir.name);

        console.warn(isMatch)
        if(!isMatch)
        {
            continue
        }

        console.log(`Found Directory`)
        console.log(dir)
        return dir
    }

    console.log(`Directory : ${Name} \nwas not found\nin the path ${Path}`)
}

/**
 * Finds a file with the provided name {@link Name}, at the path/directory  {@link Path}
 * 
 * it will match any file that have the provided {@link Name}, even if it starts with a number that matches this expression  00-{@link Name}. 
 * 
 * if a match is found it returns a Directory(Folder) Object
 * @date 16/12/2023
 *
 * @async
 * @param {String} Name - Name of desired file.
 * @param {String} Path - Path to directory to search.
 * @returns {Promise<object|null>}
 */
async function GetFile(Name,Path)
{

    console.log(`looking for a directory with the \nname :${Name}\nat the directory ${Path}`)

    console.log(`getting directory ${Path} . . .`)

    const Directory = await app.vault.getAbstractFileByPath(Path)

    console.log(`Directory`)
    console.log(Directory)

    if(!Directory)
    {
        console.warn(`File dose not exist/ could not find directory`)
        return null;
    }

    if(Directory.children.length === 0 )
    {
        console.warn(`File dose not have any children`)
        return null;
    }

    
    const DirNameRegExp = new RegExp(`^(?:\\d{1,}\\ *\\-)?${Name}\\.md$`,`gmi`);
    console.log(DirNameRegExp);
    
    for (const file of Directory.children)
    {
        let isMatch = await DirNameRegExp.test(file.name);

        console.log(isMatch)
        if(!isMatch)
        {
            continue
        }

        console.log(`Found File`)
        console.log(file)
        return file
    }

    console.log(`Directory : ${Name} \nwas not found\nin the path ${Path}`)
}

/**
 * Reads the names of all the provided {@link Directory},
 * looks for Directories that have a name that starts with a number, and returns the largest directory number + 1.
 * @date 16/12/2023
 *
 * @async
 * @param {object} Directory
 
 * @returns {Promise<object|null>}
 */
async function GetNextMaxNumber(Directory)
{
    console.log(`Getting next Number in directory =>`)

    console.log(Directory.path)

    if(!Directory)
    {
        console.warn(`Directory not provided`)
        return undefined;
    }

    if(!Directory.children || Directory.children.length === 0 )
    {
        console.warn(`Directory dose not have any children`)
        return 0;
    }

    
    const DirNameRegExp = new RegExp(/\d{1,}\ *(?=\-.+)/gm);
    // console.log(DirNameRegExp);
    
    let Children  = await Directory.children.sort(compare)

    let Max= 0
    for (const dir of  Children)
    {
        let isMatch = await DirNameRegExp.test(dir.name);

        console.log(isMatch)
        if(!isMatch)
        {
            continue
        }

        let func = async()=>
    { 
        return parseInt(dir.name.match(DirNameRegExp)[0])
        }

        let num = await TimeoutAfter(func,TimeLimit)

        if( num > Max )
        {
            Max = num
        }
        
    }
    console.log(`Max numnber = ${Max}`)
    Max++;

    return Max
}


/**
 * Reads the names of all the provided {@link Directory},
 * looks for Directories that have a name that starts with a number, and returns the next availaible number + 1.
 * @date 16/12/2023
 *
 * @async
 * @param {object} Directory - directory where to look for folders.
 * @param {Number} padding - Ammount of digites in the number string.
 
 * @returns {Promise<string|null>}
 */
async function GetNextNumber(Directory,padding)
{
    console.log(`Getting next Number in directory =>`)

    console.log(Directory.path)

    if(!Directory)
    {
        console.warn(`Directory not provided`)
        return null;
    }

    if(!Directory.children || Directory.children.length === 0 )
    {
        console.warn(`Directory dose not have any children`)
        let number = 0;
        let NextNumber = await number.toString().padStart(padding,'0');
        return NextNumber;
    }

    
    const DirNameRegExp = new RegExp(/\d{1,}\ *(?=\-.+)/gm);
    // console.log(DirNameRegExp);
    

    let Children  = await Directory.children.sort(compare)

    let Max= 0

    for (const dir of  Children)
    {
        let isMatch = await DirNameRegExp.test(dir.name);

        console.log(isMatch)
        if(!isMatch)
        {
            continue
        }

        let func = async()=>
    { 
        return parseInt(dir.name.match(DirNameRegExp)[0])
        }

        let num = await TimeoutAfter(func,TimeLimit)

        if(num >= Max+2)
        {
            break
        }
        if( num > Max )
        {
            Max = num
        }
    }

    Max++;

    let NewNumber = await Max.toString().padStart(padding,'0');
    return NewNumber
}


/**
 * Replaces keys in the {@link file}'s Yml blcok, that matches keys in {@link  Meta}, with corresponding value in {@link Meta} for each key.
 * @date 17/12/2023 - 11:51:58
 *
 * @async
 * @param {object} file - File object.
 * @returns {Promise<object>}
 */
async function ReplaceYmlWithMetaIntoFile(file)
{
    // reading File 
    let Text = await app.vault.read(file)
    

    if(!Text)
    {
        console.warn(`Text dose not exist `)
        console.warn(Text)
        return file
    }
    console.log(`Looking for Yml (MetaData) block in File `)
    console.log(file)

    const YmlBlockRegExp = new RegExp(/(?<=\-{3}\n)(.|\n)+(?=\n\-{3}\n)/gm)

    console.log(`Looking for Yml Block`)

    let func = async()=>
    { 
        return Text.match(YmlBlockRegExp)
    }
    const isYmlBlock = await TimeoutAfter(func,TimeLimit)

    
    if(!isYmlBlock)
    {
        console.warn(`Could cound not find Yml block (Meta Data)\n in Text : \n`)
        console.warn(`Text`)
        return file
    }

    console.log(`Yml Block : `)
    console.log(isYmlBlock)

    const keyLineRegExp = new RegExp(/^(?<=\n*)[\u0021-\uffff]+\:\ *.*\n/gmi)
    
    
    console.log(`Looking for Keys in Yml Block`)


    func = async()=>
    { 
        return isYmlBlock[0].match(keyLineRegExp)
    }

    let isYmlKeys = await TimeoutAfter(func,TimeLimit)

    if(!isYmlKeys){
        console.warn(`Could not find keys in Yml Block`)
        console.warn(Text)
        return file
    }

    console.log(`keys`)
    console.log(isYmlKeys)

    console.log(`Loop through keys.`)


    const KeyRegExp = new RegExp (/^(?<=\n*)[\u0021-\uffff]+(?=\:\ *.*\n|\:\ *\n$)/gmi)

    let newBlock = isYmlBlock[0];
    for (const keyline of isYmlKeys)
    {

        func = async()=>
    { 
        return keyline.match(KeyRegExp)
        }

        const key = await TimeoutAfter(func,TimeLimit)



        if(!key)
        {
            console.warn(`could not find Yml key `)
            console.warn(keyline)
            continue
        }
        // console.log(`Line : ${keyline}`)
        // console.log(`key  : ${key[0]}`)
        // console.log(`Val  : ${Meta[key[0]]}`)
        // console.log(`\n//////////////\n\n`)

        if(!Meta[key[0]])
        {
            console.log(`Key dose not exist, skipping key`)
            continue
        }

        if(Array.isArray(Meta[key[0]]))
        {

            let text =""
            for(const entry of Meta[key[0]])
            {
                text +=` - ${entry}\n`
            }
            newBlock = newBlock.replace(keyline,`${key[0]}: \n${text}`)

            continue
        }
        newBlock = newBlock.replace(keyline,`${key[0]}: ${Meta[key[0]]}\n`)

    }

    const TitleRegExp = new RegExp (/^\#{1}\ [\u0020-\uffff]+$/gmi)

    const newText = Text.replace(isYmlBlock[0],newBlock).replace(TitleRegExp,`# ${Meta[titleKey]}`)

    console.log(newText)


    func = async()=>{
        app.vault.modify(
            file,
            newText
        )
        .then((f)=>{
            console.log(`Added MetaData`)
            // new Notice("Added description MetaData");
            // return f
        })
        .catch((err)=>{
            console.warn(err)
            console.warn(`Failed to add MetaData`)
            // new Notice("Failed to add description MetaData");
        })
    }
    await TimeoutAfter(func,TimeLimit);


    return file
}

/**
 * Replaces inline keys in the {@link file}'s text, that matches keys in {@link  Meta}, with corresponding value in {@link Meta} for each key.
 * @date 25/12/2023
 *
 * @async
 * @param {object} file - File object.
 * @returns {Promise<object>}
 */
async function ReplaceInlineValueWithMetaIntoFile(file)
{
    // reading File 
    let Text = await app.vault.read(file)

    console.log(`Looking for Inline Values in File `)
    console.log(file)

    // (?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n
    const inLineKeyValueRegExp = new RegExp (/(?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n/gm)
    const KeyRegExp = new RegExp(/^(?<=\n*?)([\u0021-\uffff]+)(?=\:{2}.*\n?$)/gm)

    let func =  async ()=>
    { 
        return Text.match(inLineKeyValueRegExp)
    }
    const isInlineKey = await TimeoutAfter(func,TimeLimit)

    if(!isInlineKey){
        console.warn(`Could not find Inline Values \n`)
        // console.warn(Text)
        return file
    }

    console.log(isInlineKey)
    console.log(`Loop through keys.`)
    for (const inLine of isInlineKey)
    {

        func =  async ()=>
        { 
            return inLine.match(KeyRegExp);
        }

        const key = await TimeoutAfter(func,TimeLimit)

        if(!key)
        {
            console.warn(`Key does not exist`);
            continue;
        }

        console.log(`key : ${key[0]}`);
        console.log(Meta[key[0]]);
        console.log(`\n\n`);

        if(!Meta[key[0]])
        {
            console.log(`Key dose not exist, skipping key`)
            continue
        }

        Text = Text.replace(inLine,`${key[0]}:: ${Meta[key[0]]}`)
    }

    // console.log(Text)

    func =  async ()=>
    { 
        return app.vault.modify(
            file,
            Text
        )
        .then((f)=>{
            console.log(`Added MetaData`)
            // new Notice("Added description MetaData");
            // return f
        })
        .catch((err)=>{
            console.warn(err)
            console.warn(`Failed to add MetaData`)
            // new Notice("Failed to add description MetaData");
        })
    }

    await TimeoutAfter(func,TimeLimit);
 
   


    return file
}


/**
 * Creates Directories based on provided list {@link BuildList},
 * Starting for the provided directoryRoot {@link BuildRoot}, and returns the last directory where the Document is going be built in.
 * 
 * Only creates Directories if they dont exists.*
 * @date 18/12/2023 - 20:18:10
 *
 * @async
 * @param {object} tp - Templater object to make overview template if provided 
 * @param {string} BuildRoot - The directory to start buiding from
 * @param {string[]} BuildList - List of directories to be built
 * @param {boolean} isNumbered - Gives the option to number the durectory 
 * @param {boolean} MakeOverview - Gives the option to look for Overview tempplate, and Making the overview file in the Overview Directory, given by {@link OverviewLayer}, or to disgaurd the proccess all together. 
 * @returns {Promise<object|null>}
 */
async function MakeBuildPath(tp,BuildRoot,BuildList,isNumbered,MakeOverview){

    let BuildFolder = await app.vault.getAbstractFileByPath(BuildRoot);
    
    console.log(`trying to build document\nStrating from Build root @:\n${BuildRoot}`)
    
    console.log(BuildFolder)

    let DocuemntNumber  =""

    const whiteSpaceRegExp= RegExp(/^\ *$/gm);

    for(const dir of BuildList)
    {
        if(await dir.match(whiteSpaceRegExp))
        {
            console.log(`suggested path is empty/has no name`)
            continue
        }

        let NextDirectory = await GetDirectory(dir,BuildFolder.path)
        
        if(!NextDirectory)
        {
            let DirName= `${dir}`;

            if(isNumbered){
                let DocuemntNumber = await GetNextNumber(BuildFolder,Padding)
                DirName=`${DocuemntNumber}-${dir}`
            }

            console.warn(`creating directory : ${DocuemntNumber}-${dir}`)

            await CreateDirectory(`${DirName}`,BuildFolder.path)
            NextDirectory = await GetDirectory(dir,BuildFolder.path)
        }
        
        BuildFolder = NextDirectory
        
        
        // ignore instrictions and start with the next directory, if we dont want to make Overview. 
        if(!MakeOverview)
        {
            continue
        }
        /// check for overview file 
        if(dir !== OverviewLayer)
        {
            continue
        }

        console.log(`getting overview file`)
        Overview = await GetFile(dir,BuildFolder.path)

        
            

        /// If oveview folder make it
        if(!Overview)
        {
            // getting the template for the overview folder 
            console.log(`overview file was not found, making new overview file`)
            console.log(`getting the template for the overview file`)
            
            let OverviewTemplate = await GetFile("Overview",currentFile.parent.path)
    
            // if the overview template dose not exist, do nothing and continue loop.
            if(!OverviewTemplate)
            {
                console.warn(`template dose not have an Overview`)
                console.warn(OverviewTemplate)
                continue
            }

            // Make the Overview file
            console.log(`making overview file @: ${BuildFolder.path}`)
            Overview = await CreateTemplateNote(dir,BuildFolder,OverviewTemplate,tp);

            // Getting kanbanHelper from MetaData
            let MetaEdit =  await app.plugins.plugins["metaedit"].settings.KanbanHelper;
            
            
            // making sure that that over view key is set/provided
            if(!OverviewKey)
            {
                console.warn(`Overview Key was not provided, script does not know what to keep track of.`)
                continue
            }
            // adding overview to MetaEdit using the Overview key
            await MetaEdit.boards.push({boardName:`${OverviewLayer}`,property:`${OverviewKey}`})

        }
    }

    return BuildFolder ;

}

/**
 * looks for files that end with Template.md {@link Directory}, and returns list of files that match that expression.
 * 
 * @date 18/12/2023
 * @async
 * @param {object} Directory - The directory to search at.
 * @returns {Promise<object[]|null>}
 */
async function GetTemplates(Directory){

    let files = [];
    
    const TemplateRegExp = await RegExp(/^.*(?:Template)\.(md)$/gm)

    console.log(`looking for Templates\n@:${Directory.path}`)

    for(const file of Directory.children)
    {
        const isMatch = file.name.match(TemplateRegExp)
        console.log(file.name)

        if(isMatch)
        {
            console.log(`file ${file.name} is a template`)
            files.push(file)
            continue
        }
        console.log(`file ${file.name} is not a template`)
    }
    return files ;
}


/**
 * Takes a list of tempaltes {@link TemplateList}, Asks the user adding optional templates, and adds the default template.
 * 
 * @date 18/12/2023
 * @async
 * @param {object} TemplateList - The list of tmeplate to search.
 * @param {boolean} isMultiTemplate - If the user can choose multiple templates
 * @returns {Promise<object[]|null>}
 */
async function GetOptionalTemplates(TemplateList,isMultiTemplate,tp){

    let Templates = [];
    let OptionList = []
    
    const DefaultRegExp = await RegExp(/^Description (?:Template)\.(md)$/gm)

    console.log(`Choosing templates form @ :`);
    // console.log(TemplateList);


    let defaultIndex ;

    let text = `Optional Templates`;

    for(const Temp in TemplateList)
    {
        console.log(TemplateList[Temp])
        const isDefault = await TemplateList[Temp].name.match(DefaultRegExp)

        if(isDefault)
        {
            defaultIndex = Temp
            continue
        }
        await OptionList.push(TemplateList[Temp].name)
        

    }
    if(defaultIndex)
    {
        text += `\n- ${TemplateList[defaultIndex].name}`
        Templates.push(TemplateList[defaultIndex])
        TemplateList.splice(defaultIndex,1)
    }

  

    let isChoosing = true;
    let errormsg=""
    
    const noti = new Notice(`${text}`,99999999)


    console.log(`user is choosing`)
    while(isChoosing)
    {
        console.log(`lists`)
        console.log(TemplateList)
        console.log(OptionList)

        if(TemplateList.length == 0)
        {
            console.log(`No more options, exiting the loop`)
            // change loop boolean to false
            isChoosing =  false;
            continue;
        }
   

        // display a dialog using templater
        // let Choise = await tp.system.prompt(text+`\n`+Choises+"\n"+errormsg,"",true)



        let Choise = await tp.system.suggester(OptionList,TemplateList,false,`Optional Templates`)
        errormsg =""

        let index = await OptionList.indexOf(Choise);

        TemplateList.indexOf(TemplateList)
        console.log(`Choise : ${Choise}`)

        if(Choise === '' || Choise == undefined)
        {
            console.log(`user exiting the loop`)
            // change loop boolean to false
            isChoosing =  false;
            continue;
        }
        

        // if the choise is out of bounds re run the loob with a error message
        if(Choise < 0 || Choise > TemplateList.length - 1)
        {
            console.log(`choise  is out of bound`)
            errormsg = "input cannot be lower than 0 or greater than the number of options"
            continue
        }
        
        await Templates.push(Choise)

        text += `\n- ${Choise.name}`

        if(!isMultiTemplate)
        {
            break
        }
        await TemplateList.splice(index-1,1)
        await OptionList.splice(index-1,1)

        noti.setMessage(`${text}\n${errormsg}`);


    }

    setTimeout(noti.hide(),TimeLimit)
    

    return Templates ;

}

/**
 * Gets an list/array of all the values of the {@link SearchKey}, using the {@link SearchQuery}
 * Stores that list/array in {@link Value}
 * @date 02/02/2024 - 21:12:08
 * @param {String} SearchQuery The query of the Search 
 * @param {String} SearchKey The requested Value to be returned
 * @async
 * @returns {Promise<Object[]|null>}
 */
async function GetQueryList(SearchQuery,SearchKey)
{
    let List = [];
    let Dataview =  await app.plugins.plugins["dataview"].api;

    console.log(`Starting a Search Query `)
    console.log(`SearchQuery is : `)
    console.log(SearchQuery)
    console.log(`SearchKey is : `)
    console.log(SearchKey)

    if(!Dataview)
    {
        console.warn(`dataview was not provided, install dataview to be able to use "GetQueryList" command.`)
        new Notice(`dataview was not provided, install dataview to be able to use "GetQueryList" command.`,20000)
        return null
    }
    
    if(SearchQuery == ""|| !SearchQuery)
    {
        console.warn(`Query is was not provided, cannot query nothing, if you want to query all files provide directry\nUsing the command: \nSetSearchQuery :=> Query\nusing the follwing format \n("<directory>") or ("/")\n
        please note that prenthesis are required`);
        new Notice(`Query is was not provided, cannot query nothing, if you want to query all files provide directry \nusing the follwing format \n("<directory>") or ("/")\n
        please note that prenthesis are required`,20000);
        return null
    }

    if(SearchQuery == ""|| !SearchQuery)
    {
        console.warn(`Query key is not provided the sceript dose not know what query to search for\nUse the command\nSetSearchKey :=> key\nto set hte query key.`);
        new Notice(`Query key is not provided the sceript dose not know what query to search for\nUse the command\nSetSearchKey :=> key\nto set hte query key.`,20000)
        return null
    }

    let Pages = await Dataview
    .pages(`${SearchQuery}`)
    // .where(p => p[`🗓️`] > `2022/09/19`)

    for (const page of Pages)
    {
        console.log(page[`${SearchKey}`])
        console.log(page.file.link)
        
        if(!page[`${SearchKey}`])
        {
            continue
        }
        if(Array.isArray(page[`${SearchKey}`]))
        {
            List = [ ...List , ...page[`${SearchKey}`] ]
            continue
        }

        List.push(page[`${SearchKey}`]);

    }
    console.log(`Query List is : `)
    console.log(List)
    List = [...new Set([...List])]
    return List
}



// /**
//  * Gets an array of all the directories inside the given Directory{@link dir}
//  * @date 02/02/2024 - 21:12:08
//  *
//  * @async
//  * @param {String} dir
//  * @returns {Promise<Object[]|null>}
//  */
// async function GetDocuemntsNamesFromDirectory(dir)
// {
//     const Directory = await app.vault.getAbstractFileByPath(`${dir}`)

//     if (!Directory)
//     {
//         console.log(`Directory dose not exist`)
//         new Notice(`Directory dose not exist`)
//         return null
//     }

//     let Documents = []
//     console.log(`Getting Documents`)
//     for(const Doc in Directory.children)
//     {
//         Documents.push(Doc.name);
//     }

//     new Notice(`Got Documents names from Directory ${Directory.name}`)
//     return Documents;
// }


/**
 * Adds th provided {@link file} to {@link Overview} if exists.
 * 
 * @date 18/12/2023
 * @async
 * @param {object} file - The Document to Linnk to.
 * @returns {Promise<boolean>}
 */
async function AddDocuemntToOverview(file){

    if(!file)
    {
        console.warn(`No file provied`)
        console.warn(file)
        return  false
    }

    if(!Overview)
    {
        console.warn(`Cannot add File to overview\bOverview dose not exist`)
        console.warn(Overview)
        return false
    }


    let Text = await app.vault.read(Overview);

    const ListRegExp = new RegExp(/\#{2}\ .+/gm);
    const FileExtentionRegExp = new RegExp(/(?<=^.*)\..+$/gm)


    let func =  async ()=>
    { 
        return Text.match(ListRegExp);
    }

    const isMatch = await TimeoutAfter(func,TimeLimit)
    

    if(!isMatch)
    {
        console.warn(`Could match find overview List`)
        console.warn(isMatch)
        return false
    }

    let filePath = await file.path.replace(FileExtentionRegExp,"");
    let fileName = await file.name.replace(FileExtentionRegExp,"");

    Text = Text.replace(isMatch[0],`${isMatch[0]}\n- [ ] [[${filePath}|${fileName}]]`)


    console.log(`Added file to overview`)
    // console.log(Text)

    func =  async ()=>
    { 
        return app.vault.modify(
        Overview,
        Text
        )
        .then(()=>{
            console.log(`succesfully added new card to Overview`)
            return true
        })
        .catch(()=>{
            console.warn(`failed to add new card to Overview`)
            return false
        })
    }
    
    return await TimeoutAfter(func,TimeLimit)
}



/**
 * Displayes a dialog that contains the provided {@link text}, and askes the user for a one or many choises from the provided {@link list}, stores the user choises in {@link Meta} using a key with the provided name {@link argument} if it is provided. and returns the user choises.
 * @date 25/12/2023
 *
 * @async
 * @param {object} tp - templater object to display dialog, and take user input.
 * @param {string} text - text for the dialog
 * @param {Array} list - list for user to choose from.
 * @param {Object} Options - Set of options for how the functions works 
 * @param {boolean} Options.isMultiple - allow user to choose muliple options.
 * @param {boolean} Options.isOptional - allow user to not choise any option.
 * @param {boolean} Options.isExpanding - allows uer to add an option if the option dose not exist, in the list. 
 * @returns {Promise<string|string[]|null>}
 */
async function getUserChoise(tp,text,list,Options){

    const noti = new Notice(`${text}`,99999999)
    console.log(`choosing from menu :`)
    
    const {isExpanding,isMultiple,isOptional} = Options
    
    
    let optionList = JSON.parse(JSON.stringify(list.toString().split(",")));
    console.log(optionList)
    // store error messages
    let errormsg =``;
    // check if user is in chooser state
    let isChoosing = true;
    let UserChoise
    let choises = 0

    const isList = await (list.length > 0)
    if(!isList)
    {

        if(isExpanding)
        {
            text += `\nAdd Item/s if you could not find them`; 
            noti.setMessage(text)
    
            UserChoise =  await getUserEntry(tp,text,isMultiple,isOptional)
    
            return UserChoise
        }
        return null
    }

    while(isChoosing)
    {
        console.log('is choosing')


        // display a dialog using templater
        // let Choise = await tp.system.prompt(text+MenuList+`\n`+errormsg,"",true)

        let Choise = await tp.system.suggester(optionList,optionList,false,text)
        errormsg =""

        console.log(`Choise dis thing : ${Choise}`)
        if(list.length - 1 - choises < 0)
        {
            console.log(`No more options, exiting the loop`)
            // change loop boolean to false
            isChoosing =  false;

           

            continue;
        }

        if(!Choise)
        {
            if(isExpanding)
            {
                console.log(`Choise is expanding`)
                text += `\nAdd Item/s if you could not find them`; 
                noti.setMessage(text)

                UserChoise =  await getUserEntry(tp,text,isMultiple,isOptional)

                
            }

            // checks the input is mandatory.
            // return null, which will stop the whole script
            if(!isOptional)
            {
                errormsg ="Choise is required"
                new Notice(`${errormsg}`);

            }

            // change loop boolean to false
            console.log(`user exiting the loop`)


            isChoosing =  false;
            continue
        }

        // if the choise is out of bounds re run the loob with a error message
        if(Choise < 0 || Choise > list.length - choises - 1)
        {
            console.warn(`choise  is out of bound`)
            errormsg = "input cannot be lower than 0 or greater than the number of options"
            noti.setMessage(`${text}\n${errormsg}`);

            continue
        }

        if(!isMultiple)
        {
            // change loop boolean to false
            isChoosing =  false;
            // Store choise in argument key
            UserChoise= Choise
            console.log(`choise :`)
            console.log(Choise)

            continue;
        }

        if(!Array.isArray(UserChoise))
        {
            UserChoise = []
        }
        // Add choiose to Array variable 
        UserChoise.push(Choise);
        choises++;
        // Store choise in argument key
        console.log(`choise : ${Choise}`);
        console.log(`Chosen options `);
        console.log(UserChoise);

        console.log(`removing choise from menu`);
        optionList.splice(Choise,1);

        console.log(`new menu `);
        console.log(optionList);
        text += `\n- ${Choise}`

        noti.setMessage(`${text}\n${errormsg}`);


    }

    console.log(`User choise is :`)
    console.log(UserChoise)

    setTimeout(noti.hide(),TimeLimit)

    return UserChoise

}

/**
 * Displayes a dialog that contains the provided {@link text}, and askes the user for one or more entries, stores the user choises in {@link Meta} using a key with the provided name {@link argument} if it is provided. and return users Entry/Entries.
 * @date 25/12/2023
 *
 * @async
 * @param {object} tp - templater object to display dialog, and take user input.
 * @param {string} text - text for the dialog
 * @param {boolean} isMultiple - allow user to choose muliple options.
 * @param {boolean} isOptional - allow user to not choise any option.
 * @returns {Promise<string|string[]|null>}
 */
async function getUserEntry(tp,text,isMultiple,isOptional){

    console.log(`Making a list of items`)

    let IsEntering = true ;
    let errormsg = ""
    let UserEntries = null
    let MenuText = ""

    const whiteSpaceRegExp= RegExp(/^\ *$/gm);

    while(IsEntering)
    {
        console.log('is Entering')
        // display a dialog using templater

        let Entry = await tp.system.prompt(text+MenuText+`\n`+errormsg,"",true)
        // re-setting, menu choises.

        console.log(Entry)
        errormsg =""
        // boolean to check if the input is a only white sapce.
        let isWhiteSpace = whiteSpaceRegExp.test(Entry)

        // if entry is empty or just white space, set error message and continue the loop.
        if(isWhiteSpace )
        {
            console.log(`Entry is white space, invalid input`)
            
            // exit if entry is optional.
            if(isOptional )
            {
                console.log(`Exiting loop`);

                // change loop boolean to false.
                IsEntering =  false;
            }
            errormsg ="Entry cannot be white space"
            continue
        }

        if(!isMultiple)
        {
            console.log(`Setting value`)
            UserEntries = Entry
            IsEntering = false
            continue
        }

        if(!Array.isArray(UserEntries))
        {
            UserEntries=[];
        }

        let isEnlisted =  UserEntries.some((entry)=> entry === Entry )

        if(isEnlisted)
        {
            console.log(`Entry already enlested`)
            errormsg =`Entry already enlested`
            continue
        }
        // push entry to global layer variable 
        UserEntries.push(Entry);
        MenuText +=`\n${Entry}`
        console.log(`adding : ${Entry} => ${UserEntries}`)
    }

    console.log(`Entrie is :  `)
    console.log(UserEntries)




    return  UserEntries
}

/**
 * loops through the {@link layers}, and looks for folders, with the same name as the entries, and it stopes and returnes the last folder found. 
 * @date 25/12/2023
 *
 * @async
 * @returns {Promise<object|undefined>}
 */
async function GetTempaltesFolder(){
    let folder = await app.vault.getAbstractFileByPath(TemplatePath)

    let TemFolder = folder;
    for (const lay of layers)
    {
        console.log(lay)

        folder =  await GetDirectory(lay,folder.path)
        if(!folder)
        {
            console.warn(`Folder was not found, exiting the loop.`)
            break
        }
        TemFolder =folder
    }

    return TemFolder
}


/**
 * Takes in {@link BuildOptions} which decide how the document should be built. 
 * Gets the folders or Makes them if they don't exist, for where the document is suppose to be placed.
 * Then it asks the user to choose tempaltes depnding on which template the user is using.
 * Then it makes the {@link Templates} that the user have chosen, with the corect names.
 * Then adds the {@link Metadata} to those files.
 * Then it adds the Default File (Description Template), to the {@link Overview} file if the {@link Overview} File exists.
 
 * @date 25/12/2023 - 12:50:38
 *
 * @async
 * @param {Object|null} BuildOptions - Used to pass options about how the ducment is to be built. 
 * - {@link BuildRoot} specifies where the script will start building the project from.
 * - {@link HasDirectory} checks if the files will be made in their own directory
 * - {@link isDirectoryNumbered} checks the directory newly Made directories should be Numbered 
 * - {@link isFileNumbered} cheks if the File/s of the ducument themselvs should be numbered
 * - {@link MakeOverview} tells the script to weither or not to make an Overview File
 * - {@link MakeDefault} tells the script to check for the default template in order to add it to the {@link Overview} file, if it exists (might be removed later).
 * - {@link isTemplateName} tells the script weather or not to include the name of the template with the name of the files. 
 * @param {object} tp - Templater object for making files using templates.
 * @returns {Promise<void>}
 */
async function BuildDocument(BuildOptions,tp){
    // getting Build options from the BuildOptions

    let {BuildRoot,HasDirectory,isDirectoryNumbered,isFileNumbered,MakeOverview,MakeDefault,isTemplateName,isMultiTemplate} = BuildOptions;

    let BuildList = layers;

    let BuildDirectory = await MakeBuildPath(tp,BuildRoot,BuildList,isDirectoryNumbered,MakeOverview)

    console.log(`trying to get template folder`)
    TemplateFolder = await GetTempaltesFolder();

    let DocumentDirectory = BuildDirectory

    // checks if the Files should have be in their own Directory. 
    if(HasDirectory)
    {
        let DocumentName = `${Meta[titleKey]}`;

        DocumentDirectory = await GetDirectory(`${DocumentName}`,BuildDirectory.path)

        if(DocumentDirectory)
        {
            console.warn(`Directory already exist, Please choose Different Name.`)
            new Notice(`Directory already exist, Please choose Different Name.`)
            return 
        }
        // check if the directry have a number.
        if(isDirectoryNumbered)
        {
            let DocuemntNumber = await GetNextNumber(BuildDirectory,Padding)
            DocumentName = `${DocuemntNumber}-${Meta[titleKey]}`;
        }
        // await Cretes the directory of the document using the project number and name. 
        DocumentDirectory = await CreateDirectory(`${DocumentName}`,BuildDirectory.path);
    }



    console.log(`Document Directory =>`)
    console.log(DocumentDirectory)

    /// Get the templates from the template Directory 
    const TemplateList = await GetTemplates(TemplateFolder)

    console.log(TemplateList)

    if(!TemplateList)
    {
        console.warn(`No templates found`)
        return
    }

    // get optional tempaltes in the curret template folder 
    const Templates = await GetOptionalTemplates(TemplateList,isMultiTemplate,tp)

    console.log(`Templates`);
    console.log(Templates);

    // if there are no templates do nothing
    if(!Templates)
    {
        console.warn(`No templates provided/found for document`)
        console.warn(Templates)
        return
    }

    // Make the files using the templates.
    for(const Template of Templates)
    {
        // make template file and fill in Metadata
        await MakeDocumentFiles(tp,Template,DocumentDirectory,MakeDefault,isFileNumbered,isTemplateName)
    }

    
}


/**
 * Description placeholder
 * @date 27/12/2023 - 13:56:34
 *
 * @async
 * @param {object} tp - Templater object used to make the templates. 
 * @param {object} Template - Array/list of templates will be used to make the files. 
 * @param {object} DocumentDirectory - Directry of which the files will be places in.
 * @param {boolean} MakeDefault - To check of the utility should look for the default template (a template whth name Description Template).
 * - True : looks for the template and adds it to an overview file if it exists.
 * - Flase : does not look for the default template, and continues as normal. 
 * @param {boolean} isNumbered - Option to add a number to the name of the template. 
 * @returns {Promise<void>}
 */
async function MakeDocumentFiles(tp,Template,DocumentDirectory,MakeDefault,isNumbered,isTemplateName)
{

    const TemplateRegExp = new RegExp(/^.*(?=Template)/gm);
    const DefaultRegExp = new RegExp(/Description/gm);
    
    let file 
    
    let func =  async ()=>
    { 
        return Template.name.match(TemplateRegExp);
    }
    
    const isMatch = await TimeoutAfter(func,TimeLimit);
    // check if the provided tempalte is the default template 
    func =  async ()=>
    { 
        return Template.name.match(DefaultRegExp);
    }
    const isDefault = await TimeoutAfter(func,TimeLimit);

    if(!isMatch)
    {
        console.warn(`name dose not match`)
        console.warn(isMatch)
        return
    }

    
    console.log(`Template : =>`);
    console.log(Template);
    
    
    console.log(Template.name);
    console.log(isMatch[0]);

    let DirName=`${Meta[titleKey]}`

    if(isNumbered){
        console.log(`File is numbered, getting new file number`)
        let DocuemntNumber = await GetNextNumber(DocumentDirectory,Padding)
        DirName=`${DocuemntNumber}-${Meta[titleKey]}`
        // console.warn(`creating directory : ${DocuemntNumber}-${Meta[titleKey]}`)
        
    }

    if(isTemplateName)
    {
        DirName=`${DirName} ${isMatch[0]}`
    }
    // makes the note using the template
    file = await CreateTemplateNote(`${DirName}`,DocumentDirectory,Template,tp)

    // adds Yml metadata, then adds Inline Metadata.
    file = await  ReplaceYmlWithMetaIntoFile(file)
    file = await  ReplaceInlineValueWithMetaIntoFile(file)

    
    if(!MakeDefault)
    {
        return
    }
    // if it is the default template add it to the overview file
    if(isDefault)
    {
        // if overview file exists, add the prorject to it.
        if(Overview)
        {
            console.log(`Adding document to overview.`)
            console.log(Overview)
            await AddDocuemntToOverview(file)
        }
    }
    
}

/**
 * Compares too file names to sort them in an array. 
 * @date 25/12/2023
 *
 * @param {object} a
 * @param {object} b
 * @returns {(1 | -1 | 0)}
 */
function compare( a, b ) {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}


const Commands = {
    SetCreatedKey : async (Argument,tp)=>{
        Argument = await ReplaceValues(Argument)
        await SetCreatedKey(Argument,tp);
    },
    SetModifiedKey : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument)
        await SetModifiedKey(Argument,tp)
    },
    SetTitleKey : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument)
        await SetTitleKey(Argument,tp)
    },
    SetParentKey : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument)
        await SetParentKey(Argument,tp)
    },
    SetOverviewKey :async (Argument,tp) =>{
        Argument = await ReplaceValues(Argument)
        await SetOverviewKey(Argument,tp)
    },
    SetOverviewLayer : async (Argument,tp) =>{
        Argument = await ReplaceValues(Argument)
        await SetOverviewLayer(Argument,tp)
    },
    Dialog : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument)
        await Dialog(Argument,tp)
    },
    Menu : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument)
        menu = await Menu(Argument,tp)
    },
    Select : async (Argument,tp)=>{
        Argument = await ReplaceValues(Argument)

        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: false,
        }

        let choise = await getUserChoise(tp,dialog,menu,Options)

        Meta[Argument] = choise;


        if(!choise || Array.isArray(choise))
        {
            return
        }
        // await Select(Argument,tp)
    },
    SelectAdd : async (Argument,tp)=>{
        Argument = await ReplaceValues(Argument)

        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: true,
        }

        let choise = await getUserChoise(tp,dialog,menu,Options)

        
        
        if(!choise || Array.isArray(choise))
        {
            return
        }
        Meta[Argument] = choise;
        // await Select(Argument,tp)
    },
    SelectLayer : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);

        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: false,
        }

        let choise = await getUserChoise(tp,dialog,menu,Options);

        
        if(!choise  || Array.isArray(choise))
        {
            BreakScript = true;
            return
        }

        Meta[Argument] = choise;
        layers.push(choise);

    },
    AddLayer : async(Argument,tp) =>{
        Argument = await ReplaceValues(Argument);

        await layers.push(Argument);
        console.log(`layer`)
        console.log(layers)
    },
    Options : async(Argument,tp)=>{

        Argument = await ReplaceValues(Argument);
        const Options= {
            isMultiple: true,
            isOptional: true,
            isExpanding: false,
        }

        let choise = await getUserChoise(tp,dialog,[menu],Options);

        Meta[Argument] = choise;

        // await Options(Argument,tp)
    },
    OptionsAdd: async(Argument,tp)=>{

        Argument = await ReplaceValues(Argument);
        const Options= {
            isMultiple: true,
            isOptional: true,
            isExpanding: true,
        }

        let choise = await getUserChoise(tp,dialog,[menu],Options);

        Meta[Argument] = choise;

        // await Options(Argument,tp)
    },
    Check : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);

        const Options= {
            isMultiple: false,
            isOptional: false,
            isExpanding: false,
        }

        let choise = await getUserChoise(tp,dialog,[false,true],Options);;
        

        if(choise === null)
        {
            Meta[Argument] = false
        }
        else
        {
            Meta[Argument] = choise;
        }

        // await Check(Argument,tp)
    },
    Input : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        Meta[Argument] = await getUserEntry(tp,dialog,false,false);
        // await Input(Argument,tp)
    },
    List : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        Meta[Argument] = await getUserEntry(tp,dialog,true,true);
        // await List(Argument,tp)
    },
    SetDate : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        await SetDate(Argument,tp);
    },
    SetDateFormat : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        await SetDateFormat(Argument,tp);
    },
    StoreDate : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        await StoreDate(Argument,tp);
    },
    StoreFormattedDate : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        await StoreFormattedDate(Argument,tp);
    },
    SetSearchQuery : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        SearchQuery = Argument;
    },
    SetSearchKey : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        SearchKey = Argument;
    },
    GetQueryList : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        Meta[Argument] = await GetQueryList(SearchQuery,SearchKey);
        console.log(Meta[Argument])
    },
    GetValue : async (Argument, tp) =>{
        Argument = await ReplaceValues(Argument);
        await GetValue(Argument,tp);
    },
    SetValue : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        await SetValue(Argument,tp);
    },
    StoreValue : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument);
        await StoreValue(Argument,tp);
    },
    NextFile : async(Argument,tp)=>{
        // Argument = await ReplaceValues(Argument)
        await NextFile(Argument,tp);
    },
    DocumentTemplate  : async(Argument,tp)=>{
        // Argument = await ReplaceValues(Argument)
        console.log(`Building Document `);
        await BuildDocument(Argument,tp);

    },
    BuildDocument  : async(Argument,tp)=>{
        // Argument = await ReplaceValues(Argument)
        console.log(`Building Document `);

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
        await BuildDocument(BuildOptions,tp);
        
        

    },
    BuildSubDocument : async(Argument,tp)=>{
        // Argument = await ReplaceValues(Argument)

        const FileExtentionRegExp = new RegExp(/(?<=^.*)\..+$/gm)

        let filePath = await currentFile.path.replace(FileExtentionRegExp,'');
        let fileName = await currentFile.name.replace(FileExtentionRegExp,'');

        Meta[parentKey] = `\"[[${filePath}|${fileName}]]\"`;
        console.log(`Bulding Sub Document`);
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
        await BuildDocument(BuildOptions,tp);
        
    },
    BuildSubNote : async(Argument,tp)=>{
        // Argument = await ReplaceValues(Argument)
        const FileExtentionRegExp = new RegExp(/(?<=^.*)\..+$/gm)

        let filePath = await currentFile.path.replace(FileExtentionRegExp,"");
        let fileName = await currentFile.name.replace(FileExtentionRegExp,"");

        Meta[parentKey] = `\"[[${filePath}|${fileName}]]\"`;
        console.log(`Bulding Sub Note`);
        console.log(Meta[parentKey]);

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
        await BuildDocument(BuildOptions,tp);

    },
    BuildInFile : async(Argument,tp)=>{
        await ReplaceYmlWithMetaIntoFile(currentFile);
        await ReplaceInlineValueWithMetaIntoFile(currentFile);
    },
    MoveMedia : async(Argument,tp)=>{
        Argument = await ReplaceValues(Argument)
        console.log(`Moving Media Files`)

        await MoveMedia(tp,currentFile,Argument,true)
    }
}



/**
 * Takes a function {@link CallBack} retruns its results, if the function takes longer than the given {@link TimeLimit} it will stop the function, and retrun an error.
 * @date 25/12/2023
 *
 * @async
 * @param {Function} CallBack
 * @param {Number} TimeLimit
 * @returns {Promise<*>}
 */
function TimeoutAfter(CallBack,TimeLimit){
    return new Promise(async(resolve,reject)=>{
        
        // console.log(`starting function timer`)
        const Exec = setTimeout(()=>{
            console.log(`Function timed out`)
            clearTimeout(Exec)
            
            reject(null)
        },TimeLimit)


        
        await CallBack().then(response =>{
            clearTimeout(Exec)
            resolve(response);
        }).catch(error=>{
            clearTimeout(Exec)
            console.log(`Function ran in into an error`)
            console.log(error)
            reject(null);
        })
    })
}





/**
 * Reads the provided {@link Text} and looks if there is a Yaml Block encased in between suffex and prefex (---).
 * If the Yaml Block was not found it returns null.
 * @date 28/12/2023
 *
 * @async
 * @param {String} Text
 * @returns {Promise<null|String[]>}
 */
async function GetYmlBlock(Text)
{
    console.log(`Looking for Yml (MetaData) block in File `)
    console.log(currentFile)

    const YmlBlockRegExp = new RegExp(/(?<=\-{3}\n)(.|\n)+(?=\n\-{3}\n)/gm)

    console.log(`Looking for Yml Block`)

    let func = async()=>
    { 
        return Text.match(YmlBlockRegExp)
    }
    return await TimeoutAfter(func,TimeLimit)
}


/**
 * Takes a text {@link YmlBlock} similar to  Yaml format, and returns the top level keys inside the the provided YmlBlock.
 * @date 28/12/2023
 *
 * @async
 * @param {String} YmlBlock
 * @returns {Promise<null|String[]>}.
 */
async function GetKeysFromYmlBlock(YmlBlock)
{
    console.log(`Yml Block : `)
    console.log(YmlBlock)

    const keyLineRegExp = new RegExp(/(?<=^\n*)[\u0021-\uffff]+(?=\:\ *)/gmi)

    console.log(`Looking for Keys in Yml Block`)

    let func = async()=>
    { 
        return YmlBlock.match(keyLineRegExp)
    }

    const Keys = await TimeoutAfter(func,TimeLimit)

    console.log("Keys")
    console.log(Keys)
    return Keys

    
}

/**
 * Searches for the provided {@link key} in the provided {@link YamlBlock}.
 * @date 28/12/2023
 *
 * @async
 * @param {String} YmlBlock - The Block of yaml text Provided
 * @param {String} key - The key to look f or in the {@link YamlBlock}
 * @returns {Promise<null|String[]>}
 */
async function GetKeyBlockInYmlBlock(YmlBlock,key){


    // (?:^banner\:\ *)((\n+\ +\-\ +[\u0021-\uffff][\u0020-\uffff]*)|(\n+\ +[\u0021-\uffff]+\:\ ?)+|([\u0021-\uffff][\u0020-\uffff]*)?)+
    const keyLineRegExp = new RegExp(`(?:^${key}\\:\\ *)((\\n*\\ +\\-\\ +[\\u0021-\\uffff][\\u0020-\\uffff]*)|(\\n*\\ +[\\u0021-\\uffff]+\\:\\ ?)+|([\\u0021-\\uffff][\\u0020-\\uffff]*)?)+`,`gmi`)

    console.log(`Looking for Keys in Yml Block`)

    let func = async()=>
    { 
        return YmlBlock[0].match(keyLineRegExp)
    }

    let KeyBlock = await TimeoutAfter(func,TimeLimit)

    console.log(`keyblock`)
    console.log(KeyBlock)
    return KeyBlock
}


/**
 * Gets the properties in the provided Text {@link KeyBlock}.
 *  - first it tests if the Key contains an object.
 *      - it reads the values of the objects as a YmlBlock.
 *      - then the it Runs the function {@link GetKeysFromYmlBlock}.
 *      - this process is repeated through out ever nested object, untill returns the values of the properties of an object.
 *  - if it is not, then it reads the values of the Key.
 *  - then it returns the value in the appropriate format.
 * @date 28/12/2023
 *
 * @async
 * @param {String} KeyBlock - The Complete block fo text of one Yml property.
 * @param {String} key - The of the KeyBlock (only used for logging purposes)
 * @returns {Promise<null|object|string|string[]>}
 */
async function GetKeyProperties(KeyBlock,key){

    const KeyPropetiesRegExp = new RegExp(/((?<=^[\u0021-\uffff]+\:\ *\n*)((\n+\ +[\u0021-\uffff]+\:\ *)+((\n*\ +\-\ +[\u0021-\uffff][\u0020-\uffff]+)+|([\u0021-\uffff][\u0020-\uffff]*)+)+)+)|((?<=^[\u0021-\uffff]+\:\ *)[\u0021-\uffff][\u0020-\uffff]*)|((?<=\- \ *)[\u0021-\uffff][\u0020-\uffff]*)/gim)

    let func = async()=>
    { 
        return KeyBlock.match(KeyPropetiesRegExp)
    }

    console.log(`looking for propertues for ${key}`)
    const Props = await TimeoutAfter(func,TimeLimit)

    if(!Props)
    {
        return null
    }

    const spacingRegexp = new RegExp(/(?<=^[\u0021-\uffff]+:\ ?\n+)\ +(?=\w.+)/mg)

    func = async()=>
    { 
        return KeyBlock.match(spacingRegexp)
    }

    console.log(`checking if ${key} is an object or not`)
    let space = await TimeoutAfter(func,TimeLimit)
    if(!space)
    {
        console.log(`spaces are not found, key dose not have any properties. (key is not a object)`)
        return await ConvertValue(Props)
    }
    
    let spacing = space[0].length;

    const SpaceRegExp = new RegExp(`^\ {${spacing}}(?=.+|\n$)`,`gm`);

    func = async()=>
    {
        return KeyBlock.replace(SpaceRegExp,"");
    }

    console.log(`removeing spacing from ${key}'s properties`)
    let newYmlBlock = await TimeoutAfter(func,TimeLimit);
    
    if(!newYmlBlock)
    {
        return null;
    }

    // return newYmlBlock;

    const isYmlKeys = await GetKeysFromYmlBlock(newYmlBlock[0])
    console.log(`looking for nested keys in ${key}`)

    if(!isYmlKeys)
    {
        console.log(`no nested keys where found in ${key}`)
        console.log(isYmlKeys)
        return null
    }


    console.log(`looping through nested keys of ${key}`)

    const Properties = {} 
    for (const Key of isYmlKeys)
    {
        const KeyBlock = GetKeyBlockInYmlBlock(newYmlBlock,Key)

        if(!KeyBlock)
        {
            console.log(`nested key block was not found`)
            console.log(KeyBlock)
            Properties[Key] = null
            continue
        }
        Properties[Key] = GetKeyProperties(KeyBlock[0],Key);
    }

    return  Properties
    
}


/**
 * Reads a {@link file}, and looks for a Yaml Block in the file, then reads its properties, and returns those properties in a JSON format. 
 * @date 02/01/2024 - 08:47:22
 *
 * @async
 * @param {object} file - file object to read from.
 * @returns {Promise<null|object>} - json object that contains all yaml properties.
 */
async function GetFileYamlProperties(file)
{
    // console.log(`reading the current value if a virable/key with the name\n${Argument}\nfrom teh currente file \n@${currentFile.path}`)
    
    
    // Getting value using Regexp the none bitch way
    const Text = await app.vault.read(file);
    
    if(!Text)
    {
        console.warn(`Text dose not exist `)
        console.warn(Text)
        return null
    }
    console.log(`Looking for Yml (MetaData) block in File `)
    console.log(file)
    
    const isYmlBlock = await GetYmlBlock(Text)
    
    if(!isYmlBlock)
    {
        console.log(`yml block was not found in file`)
        console.log(isYmlBlock)
        return null
    }
    const isYmlKeys = await GetKeysFromYmlBlock(isYmlBlock[0])
    
    if(!isYmlKeys)
    {
        console.log(`no keys where found in Yaml Block`)
        console.log(isYmlKeys)
        return null
    }
    
    console.log(`looping through keys `)
    const Properties = {} 
    for (const key of isYmlKeys)
    {
        console.log(`${key}`)
        console.log(`getting Key Block for ${key}`)
        const KeyBlock = await GetKeyBlockInYmlBlock(isYmlBlock,key)
        
        if(!KeyBlock)
        {
            console.log(`key block was not found`)
            console.log(KeyBlock)
            Properties[key] = null
            continue
        }
        console.log(KeyBlock[0])
        Properties[key] = await GetKeyProperties(KeyBlock[0],key);
    }
    
    return Properties
}


/**
 * Reads a file object, and looks for inline propeties/keys, then returns those properties, and their values as an object.
 * 
 * @date 30/12/2023 - 16:44:29
 *
 * @async
 * @param {object} file
 * @returns {Promise<object|null>}
 */
async function getFileInlineProps(file){
    
    const Text = await app.vault.read(file);
    
    if(!Text)
    {
        console.warn(`Text dose not exist `)
        console.warn(Text)
        return null
    }
    console.log(`Looking for inline Keys in File `)
    console.log(file)
    
    
    const isInlineKeys = await getInlineKeys(Text)
    
    if(!isInlineKeys){
        console.warn(`Could not find Inline Values \n`)
        // console.warn(Text)
        return file
    }
    
    const Properties = {}
    for(const Key of isInlineKeys){
        console.log(`getting value for inline key ${Key}`)
        
        Properties[Key] = await getInlineValues(Text,Key)
    }

    return Properties
}

/**
 * Reads a text and return and array of inline Keys in the text.
 * @date 30/12/2023 - 16:47:35
 *
 * @async
 * @param {String} Text - Text where the search will be performed
 * @returns {Promise<String[]|null>}
 */
async function getInlineKeys(Text){
    // (?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n
    // \u0021-\u007B-\u003A\u003A
    const inlineKeyRegExp = new RegExp(/^(^[^!:;()'"`.*^#@=/<>,\[\]~\{\}\|\\\-+\n ]+)(?=\:{2}.*\n?$)/gm)

    console.log(`Getting inline keys in Text`)
    let func =  async ()=>
    { 
        return Text.match(inlineKeyRegExp)
    }
    
    return await TimeoutAfter(func,TimeLimit);
    
    
}


/**
 * Gets the value of an inline property with the name {@link key} inside the provided text {@link Text}.
 * if there is no value found it returns null. 
 * @date 30/12/2023 - 16:50:16
 *
 * @async
 * @param {String} Text
 * @param {String} key
 * @returns {Promise<String|Number|Date|Boolean|null>}
 */
async function getInlineValues(Text,key){
    // (?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n
    //  /(?<=\n*?[\u0010-\uffff]+\ {0,}\:\:\ {0,})[\u0021-\uffff][\u0020-\uffff]*(?=\n|$)/gm
    const inLineKeyValueRegExp = new RegExp (`(?<=\\n*?${key}\\ {0,}\\:{2}\\ {0,})[\\u0021-\\uffff]+[\\u0020-\\uffff]*(?=\\n|$)`,`gm`)
    
    console.log(`getting inline Value of ${key}`)
    let func =  async ()=>
    { 
        return Text.match(inLineKeyValueRegExp)
    }
    
    const Value =  await TimeoutAfter(func,TimeLimit);
    if(!Value)
    {
        return null
    }
    
    
    return await ConvertValue(Value)
}



/**
 * Takes String and "tries" to convert them to the appropriate type.
 * 
 * 
 * @date 28/12/2023 - 23:30:19
 * 
 * @async
 * @param {String} Value - the provided value to convert 
 * @returns {Promise<*>} - Could be anything.
 */
async function ConvertValue(Value)
{

    if(!Value)
    {
        return null
    }

    let trueRegxep = RegExp(/true/i)
    let falseRegxep = RegExp(/false/i)
    if(Value.length > 1)
    {
        console.log(`value is an array`)
        let Arr =[]

        for(const val of Value)
        {

            let istrue = val.match(trueRegxep);
            if(istrue)
            {
                Arr.push(true);
                continue
            }

            let isfalse = val.match(falseRegxep)
            if(isfalse)
            {
                Arr.push(false);
                continue
            }

            let parse = parseFloat(val)
            
            if(await !isNaN(parse))
            {
                Arr.push(parse)
                continue
            }

            let datt = await moment(Value[0]).isValid()
            if(datt)
            {
                Arr.push(await moment(Value[0]).format("YYYY-MM-DDTHH:mm:ssZ"))
            }
                    
            Arr.push(val)
        }
        console.log(`Val`)
        console.log(Arr)
        return Arr
    }

    let val = Value[0]

    console.log(`Val`)
    console.log(Value)
    let istrue = Value[0].match(trueRegxep);
    if(istrue)
    {
        console.log(`is bool`)
        return true
    }
    let isfalse = Value[0].match(falseRegxep);
    if(isfalse)
    {
        console.log(`is bool`)
        return false
    }

    let parse = parseFloat(Value[0])

    const whiteSpaceRegExp= RegExp(/\ */gm);

    
    if(!isNaN(parse) && parse.toString().replace(whiteSpaceRegExp,"").length == Value[0].replace(whiteSpaceRegExp,"").length)
    {
        console.log(`is number`)
        console.log(parse)
        return parse
    }

    let datt = await moment(Value[0]).isValid()
    if(datt)
    {
        console.log(`is Date`);
        console.log(await moment(Value[0]).format("YYYY-MM-DDTHH:mm:ssZ"));

        return await moment(Value[0]).format("YYYY-MM-DDTHH:mm:ssZ");
    }

    console.log(`string`);
    console.log(val);
    return val
}



/**
 * Takes a file object, Reads the text in the file, gets Yaml values/properties if any, then reads inline properties if any, and returns an object with all said properties. 
 * 
 * @date 30/12/2023 - 16:32:50
 *
 * @async
 * @param {Object} file
 * @returns {Promise<Object|null>}
 */
async function GetFileProperties(file)
{
    const YamlProps = await GetFileYamlProperties(file)

    const inLineProps= await getFileInlineProps(file)

    console.log(`inline faggots are`)
    console.log(inLineProps)
    return {...inLineProps,...YamlProps}
    
}



/**
 * Reads the given {@link file}, finds all the attachments/media files that don't belong to another document, and then moves them to the given {@link path}.
 * 
 * with the option to number the attachments.
 * @date 02/01/2024 - 08:25:45
 *
 * @async
 * @param {object} tp - templater object, necessary for some functions, but dose nothing. 
 * @param {object} file - file object, required, read to find links in.
 * @param {string} path - the path to where to move attachments files to. 
 * @param {boolean} isNumbered - option to number the the files as they get moved. 
 * @returns {Promise<void>}
 */
async function MoveMedia(tp,file,path,isNumbered)
{
    let MediaLinks = await GetMediaFileLinks(file)

    if(!MediaLinks)
    {
        console.log(`No valid media links where found`)
        return
    }
    
    
    let BuildRoot = path ? '/': file.parent.path
    
    let BuildList = path? path.split('/') : ["Media"]


    let BuildDirectory = await MakeBuildPath(tp,BuildRoot,BuildList,false,false)


    for(const link of MediaLinks)
    {
        let MediaFile = await app.vault.getAbstractFileByPath(`${link}`);

        if(!MediaFile)
        {
            console.log(`File was not found`)
            console.log(`File : ${link}`)
            continue
        }

        if(!isNumbered)
        {
            await app.fileManager.renameFile(MediaFile,`${BuildDirectory.path}/${MediaFile.name}`)
            continue
        }

        let fileNumber = await GetNextNumber(BuildDirectory,Padding)

        const NumberRegExp = RegExp(/^\d{1,}\ *\-\ */gmi)
        let newName = await MediaFile.name.replace(NumberRegExp,"")
        await app.fileManager.renameFile(MediaFile,`${BuildDirectory.path}/${fileNumber}-${newName}`)
    }

}


/**
 * Gets Media links of media attachments, in the current file, and returns a list of the attachments links.
 * 
 * @date 02/01/2024 - 08:42:19
 *
 * @async
 * @param {Object} file - File object to read links from.
 * @returns {Promise<String[]|null>}
 */
async function GetMediaFileLinks(file)
{

    const Text = await app.vault.read(file)

    const MediaLink = RegExp(/(?<=\!\[\[)(?!.*(Banner|Media|icon|Daily|Files|Media|Attachments)).*(?:\.(gif|png|jpeg|mp4|jpg|jpeg|webm|mpeg|acc|flac|kmv|pdf))(?=\]\])/igm);

    let func = async ()=>{
        return Text.match(MediaLink)
    }

    return await TimeoutAfter(func,TimeLimit);

}

/**
 * 
 * A string that contains a regular expression that matches Valid names in every language
 * 
 * it Allows for names that contain or start with (numbers|underscore(_)|dash(-)|equalSgin(=))
 * 
 * probably not going  to use that ever. 
 * @typedef {String} AllLanguageExpresion
 */
const AllLanguageExpresion = `([A-Za-z0-9\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u0860-\\u086A\\u08A0-\\u08B4\\u08B6-\\u08BD\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u09FC\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C80\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D54-\\u0D56\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u1884\\u1887-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1C80-\\u1C88\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312E\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FEA\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AE\\uA7B0-\\uA7B7\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC\\s]|\\uD800[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDF00-\\uDF1F\\uDF2D-\\uDF40\\uDF42-\\uDF49\\uDF50-\\uDF75\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF]|\\uD801[\\uDC00-\\uDC9D\\uDCB0-\\uDCD3\\uDCD8-\\uDCFB\\uDD00-\\uDD27\\uDD30-\\uDD63\\uDE00-\\uDF36\\uDF40-\\uDF55\\uDF60-\\uDF67]|\\uD802[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDC60-\\uDC76\\uDC80-\\uDC9E\\uDCE0-\\uDCF2\\uDCF4\\uDCF5\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDD80-\\uDDB7\\uDDBE\\uDDBF\\uDE00\\uDE10-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE60-\\uDE7C\\uDE80-\\uDE9C\\uDEC0-\\uDEC7\\uDEC9-\\uDEE4\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72\\uDF80-\\uDF91]|\\uD803[\\uDC00-\\uDC48\\uDC80-\\uDCB2\\uDCC0-\\uDCF2]|\\uD804[\\uDC03-\\uDC37\\uDC83-\\uDCAF\\uDCD0-\\uDCE8\\uDD03-\\uDD26\\uDD50-\\uDD72\\uDD76\\uDD83-\\uDDB2\\uDDC1-\\uDDC4\\uDDDA\\uDDDC\\uDE00-\\uDE11\\uDE13-\\uDE2B\\uDE80-\\uDE86\\uDE88\\uDE8A-\\uDE8D\\uDE8F-\\uDE9D\\uDE9F-\\uDEA8\\uDEB0-\\uDEDE\\uDF05-\\uDF0C\\uDF0F\\uDF10\\uDF13-\\uDF28\\uDF2A-\\uDF30\\uDF32\\uDF33\\uDF35-\\uDF39\\uDF3D\\uDF50\\uDF5D-\\uDF61]|\\uD805[\\uDC00-\\uDC34\\uDC47-\\uDC4A\\uDC80-\\uDCAF\\uDCC4\\uDCC5\\uDCC7\\uDD80-\\uDDAE\\uDDD8-\\uDDDB\\uDE00-\\uDE2F\\uDE44\\uDE80-\\uDEAA\\uDF00-\\uDF19]|\\uD806[\\uDCA0-\\uDCDF\\uDCFF\\uDE00\\uDE0B-\\uDE32\\uDE3A\\uDE50\\uDE5C-\\uDE83\\uDE86-\\uDE89\\uDEC0-\\uDEF8]|\\uD807[\\uDC00-\\uDC08\\uDC0A-\\uDC2E\\uDC40\\uDC72-\\uDC8F\\uDD00-\\uDD06\\uDD08\\uDD09\\uDD0B-\\uDD30\\uDD46]|\\uD808[\\uDC00-\\uDF99]|\\uD809[\\uDC80-\\uDD43]|[\\uD80C\\uD81C-\\uD820\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879][\\uDC00-\\uDFFF]|\\uD80D[\\uDC00-\\uDC2E]|\\uD811[\\uDC00-\\uDE46]|\\uD81A[\\uDC00-\\uDE38\\uDE40-\\uDE5E\\uDED0-\\uDEED\\uDF00-\\uDF2F\\uDF40-\\uDF43\\uDF63-\\uDF77\\uDF7D-\\uDF8F]|\\uD81B[\\uDF00-\\uDF44\\uDF50\\uDF93-\\uDF9F\\uDFE0\\uDFE1]|\\uD821[\\uDC00-\\uDFEC]|\\uD822[\\uDC00-\\uDEF2]|\\uD82C[\\uDC00-\\uDD1E\\uDD70-\\uDEFB]|\\uD82F[\\uDC00-\\uDC6A\\uDC70-\\uDC7C\\uDC80-\\uDC88\\uDC90-\\uDC99]|\\uD835[\\uDC00-\\uDC54\\uDC56-\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDEA5\\uDEA8-\\uDEC0\\uDEC2-\\uDEDA\\uDEDC-\\uDEFA\\uDEFC-\\uDF14\\uDF16-\\uDF34\\uDF36-\\uDF4E\\uDF50-\\uDF6E\\uDF70-\\uDF88\\uDF8A-\\uDFA8\\uDFAA-\\uDFC2\\uDFC4-\\uDFCB]|\\uD83A[\\uDC00-\\uDCC4\\uDD00-\\uDD43]|\\uD83B[\\uDE00-\\uDE03\\uDE05-\\uDE1F\\uDE21\\uDE22\\uDE24\\uDE27\\uDE29-\\uDE32\\uDE34-\\uDE37\\uDE39\\uDE3B\\uDE42\\uDE47\\uDE49\\uDE4B\\uDE4D-\\uDE4F\\uDE51\\uDE52\\uDE54\\uDE57\\uDE59\\uDE5B\\uDE5D\\uDE5F\\uDE61\\uDE62\\uDE64\\uDE67-\\uDE6A\\uDE6C-\\uDE72\\uDE74-\\uDE77\\uDE79-\\uDE7C\\uDE7E\\uDE80-\\uDE89\\uDE8B-\\uDE9B\\uDEA1-\\uDEA3\\uDEA5-\\uDEA9\\uDEAB-\\uDEBB]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\-+|\\_+|\\=+)+`

const DirAllowedNameRegExp = new RegExp(`^${AllLanguageExpresion}$`,`gm`);