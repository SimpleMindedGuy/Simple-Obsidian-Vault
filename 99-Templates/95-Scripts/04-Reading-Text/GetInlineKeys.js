// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads a text and return and array of inline Keys in the text.
 * @date 30/12/2023 - 16:47:35
 *
 * @async
 * @param {String} Text - Text where the search will be performed
 * @returns {Promise<String[]|null>}
 */
async function GetInlineKeys(Text){

    // Getting global values if they exist
    let tp = await window?.pkvs?.load("tp");


    if(!tp)
    {
        console.log(`06-Utility Specific: GetInlineKeys:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: GetInlineKeys:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

    
    // (?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n
    // \u0021-\u007B-\u003A\u003A
    const inlineKeyRegExp = new RegExp(/^(^[^!:;()'"`.*^#@=/<>,\[\]~\{\}\|\\\-+\n ]+)(?=\:{2}.*\n?$)/gm)

    console.log(`06-Utility Specific: GetInlineKeys:\nGetting inline keys in Text`)
    let func =  async ()=>
    { 
        return Text.match(inlineKeyRegExp)
    }
    
    return await tp.user.Timeout(func,TimeLimit);
    
    
}
module.exports = GetInlineKeys