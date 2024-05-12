// In The Name of Allah, The Most Beneficent, The Most Merciful
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


    // Getting global values if they exist
    let tp = await window?.pkvs?.load("tp");


    if(!tp)
    {
        console.log(`06-Utility Specific: GetKeyBlockInYmlBlock:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: GetKeyBlockInYmlBlock:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

        
    // (?:^${key}\:\ *)((\n*\ +\-\ +[\u0021-\uffff][\u0020-\uffff]*)|(\n*\ +[\u0021-\uffff]+\:\ ?)+|([\u0021-\uffff][\u0020-\uffff]*)?)+
    // Regular Expression to the Block of values for the given key inside the given  YmlBlock
    const keyLineRegExp = new RegExp(`(?:^${key}\\:\\ *)((\\n*\\ +\\-\\ +[\\u0021-\\uffff][\\u0020-\\uffff]*)|(\\n*\\ +[\\u0021-\\uffff]+\\:\\ ?)+|([\\u0021-\\uffff][\\u0020-\\uffff]*)?)+`,`gmi`)



    // matching function rapper to be used in the TimeoutAfter function, for them 
    let func = async()=>
    { 
        return YmlBlock.match(keyLineRegExp)
    }

    // getting the key block from the YmlBlock using the timeout function to avoid problems.
    let KeyBlock = await tp.user.Timeout(func,TimeLimit)
    console.log(`06-Utility Specific: GetKeyBlockInYmlBlock:\nKeyBlock`)
    console.log(KeyBlock)

    // return null if the KeyBlock does not exit.
    if(!KeyBlock)
    {
        return null
    }
    
    // return the first match.
    return KeyBlock[0] 
}

module.exports = GetKeyBlockInYmlBlock;