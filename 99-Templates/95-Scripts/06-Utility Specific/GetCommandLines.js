// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Takes a text {@link commandBlock} and looks for comands lines in it. and returns the command lines.
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {?string} CommandBlock
 * @returns {Promise<string[] | null>}
 */
async function GetCommandLines(CommandBlock){
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`06-Utility Specific: GetCommandLines:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

        // Getting Templater object for running functions
        tp = {}
        const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

        for (const fun of tpInternalFunctions) {
            tp[fun.name] = fun.static_object;  
        }

        tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();

        
    }
    
    // If templater is not provided exist loop
    if(!tp)
    {
        console.warn(`06-Utility Specific: GetCommandLines:\ntemplater is not provided`)
        console.warn(tp)
        return
    }
    // Match All command lines
    const CommandRegExp = new RegExp(/(\w+)\ *\:\ *(.+)?(\=\>\ *.*|\[.*\]\ *\=\>\ *.*|(?:\{(\n.*)+?)(?<=\n\}))/g);

    // If commands block was not provided not provided return null
    if(!CommandBlock)
    {
        console.warn(`06-Utility Specific: GetCommandLines:\nNo command block provided`)
        console.warn(CommandBlock)
        return null
    }

    

    let  func =   async ()=>
    { 
        return CommandBlock.match(CommandRegExp);
    }

    
    let CommandLines = await tp.user.Timeout(func,TimeLimit);

    // If no command likes where found return null
    if(!CommandLines)
    {
        console.warn(`06-Utility Specific: GetCommandLines:\nNo Commands found in the Command block`)
        console.warn(CommandLines)
        return null
    }

    return CommandLines;
}
module.exports = GetCommandLines