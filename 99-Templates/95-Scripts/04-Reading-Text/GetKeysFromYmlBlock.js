// In The Name of Allah, The Most Beneficent, The Most Merciful
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

    // Getting global values if they exist
    let tp = await window?.pkvs?.load("tp");


    if(!tp)
    {
        console.log(`06-Utility Specific: GetKeysFromYmlBlock:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: GetKeysFromYmlBlock:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }



    console.log(`06-Utility Specific: GetKeysFromYmlBlock:\nYml Block : `)
    console.log(YmlBlock)

    const keyLineRegExp = new RegExp(/(?<=^\n*)[\u0021-\uffff]+(?=\:\ *)/gmi)

    console.log(`06-Utility Specific: GetKeysFromYmlBlock:\nLooking for Keys in Yml Block`)

    let func = async()=>
    { 
        return YmlBlock.match(keyLineRegExp)
    }

    const Keys = await tp.user.Timeout(func,TimeLimit)

    console.log("06-Utility Specific: GetKeysFromYmlBlock:\nKeys")
    console.log(Keys)
    return Keys

    
}

module.exports = GetKeysFromYmlBlock;