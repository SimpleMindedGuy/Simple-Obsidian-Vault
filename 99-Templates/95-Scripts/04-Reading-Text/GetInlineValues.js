// In The Name of Allah, The Most Beneficent, The Most Merciful
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
async function GetInlineValues(Text,key){

    // Getting global values if they exist
    let tp = await window?.pkvs?.load("tp");


    if(!tp)
    {
        console.log(`06-Utility Specific: GetInlineValues:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: GetInlineValues:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }


    // (?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n
    //  /(?<=\n*?[\u0010-\uffff]+\ {0,}\:\:\ {0,})[\u0021-\uffff][\u0020-\uffff]*(?=\n|$)/gm
    const inLineKeyValueRegExp = new RegExp (`(?<=\\n*?${key}\\ {0,}\\:{2}\\ {0,})[\\u0021-\\uffff]+[\\u0020-\\uffff]*(?=\\n|$)`,`gm`)
    
    console.log(`06-Utility Specific: GetInlineValues:\ngetting inline Value of ${key}`)
    let func =  async ()=>
    { 
        return Text.match(inLineKeyValueRegExp)
    }
    
    const Value =  await tp.user.Timeout(func,TimeLimit);
    if(!Value)
    {
        return null
    }
    
    
    return await tp.user.ConvertValue(Value)
}

module.exports = GetInlineValues