// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads a String, and looks for inline properties/keys, then returns those properties, and their values as an object.
 * 
 * @date 30/12/2023 - 16:44:29
 *
 * @async
 * @param {object} Text
 * @returns {Promise<object|null>}
 */
async function GetTextInlineProps(Text){

    // Getting global values if they exist
    let tp = await window?.pkvs?.load("tp");


    if(!tp)
    {
        console.log(`06-Utility Specific: MakeDocumentFiles:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: MakeDocumentFiles:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }


        
    if(!Text)
    {
        console.warn(`06-Utility Specific: MakeDocumentFiles:\nText dose not exist `)
        console.warn(Text)
        return null
    }
    console.log(`06-Utility Specific: MakeDocumentFiles:\nLooking for inline Keys in File `)
    console.log(Text)
    
    
    const isInlineKeys = await tp.user.GetInlineKeys(Text)
    
    if(!isInlineKeys){
        console.warn(`06-Utility Specific: MakeDocumentFiles:\nCould not find Inline Values \n`)
        // console.warn(Text)
        return Text
    }
    
    const Properties = {}
    for(const Key of isInlineKeys){
        console.log(`06-Utility Specific: MakeDocumentFiles:\nGetting value for inline key ${Key}`)
        
        Properties[Key] = await tp.user.GetInlineKeys(Text,Key)
    }

    return Properties
}

module.exports = GetTextInlineProps
