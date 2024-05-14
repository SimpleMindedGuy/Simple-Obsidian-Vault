// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Takes a text from a file and returns the Commands block if any 
 * if it there is no command block it returns null
 * @date 16/12/2023
 *
 * @async
 * @param {?string} Text
 * @returns {Promise<string|null>}
 */
async function GetCommandsBlock(Text)
{
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`06-Utility Specific: GetCommandsBlock:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: GetCommandsBlock:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    const CommandBlockRegExp = new RegExp(/(?<={{3}:{3})(.*?)(?=:{3}}{3})/smgi);

    console.log(`06-Utility Specific: GetCommandsBlock:\nGetting Command block`)
    if(!Text)
    {
        console.warn(`06-Utility Specific: GetCommandsBlock:\nText provided is undefined`)
        console.warn(Text)
        return null
    }

    let  func = async ()=>
    { 
        return Text.match(CommandBlockRegExp);
    }

    console.log(`06-Utility Specific: GetCommandsBlock:\nMatching block`)

    // console.log(Text)

    const isMatch = await tp.user.Timeout(func,TimeLimit)

    if(!isMatch)
    {
        console.warn(`06-Utility Specific: GetCommandsBlock:\nText dose not include a command block`)
        console.warn(isMatch)
        return null
    }
    let commandsBlock = isMatch[0];

    return  commandsBlock;
}

module.exports = GetCommandsBlock