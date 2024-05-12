// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads a {@link Text}, and looks for a Yaml Block in the Text, then reads it's properties, and returns those properties in a JSON format. 
 * @date 02/01/2024 - 08:47:22
 *
 * @async
 * @param {string} Text - String to read yaml properties from.
 * @returns {Promise<null|object>} - json object that contains all yaml properties.
 */
async function GetTextYamlProperties(Text)
{
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`04-Reading-Text: GetTextYamlProperties:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`04-Reading-Text: GetTextYamlProperties:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

    
    if(!Text)
    {
        console.warm(`04-Reading-Text GetTextYamlProperties:\nText dose not exist `)
        console.warn(Text)
        return null
    }
    console.log(`04-Reading-Text GetTextYamlProperties:\nLooking for Yml (MetaData) block in File `)
    console.log(Text)
    
    const isYmlBlock = await tp.user.GetYmlBlock(Text)
    
    if(!isYmlBlock)
    {
        console.log(`04-Reading-Text GetTextYamlProperties:\nyml block was not found in file`)
        console.log(isYmlBlock)
        return null
    }
    const isYmlKeys = await tp.user.GetKeysFromYmlBlock(isYmlBlock)
    
    if(!isYmlKeys)
    {
        console.log(`04-Reading-Text GetTextYamlProperties:\nno keys where found in Yaml Block`)
        console.log(isYmlKeys)
        return null
    }
    
    console.log(`04-Reading-Text GetTextYamlProperties:\nlooping through keys `)
    const Properties = {} 
    for (const key of isYmlKeys)
    {
        console.log(`04-Reading-Text GetTextYamlProperties:\n${key}\ngetting Key Block for ${key}`)
        const KeyBlock = await tp.user.GetKeyBlockInYmlBlock(isYmlBlock,key)
        
        if(!KeyBlock)
        {
            console.log(`04-Reading-Text GetTextYamlProperties:\nkey block was not found`)
            console.log(KeyBlock)
            Properties[key] = null
            continue
        }
        console.log(KeyBlock)
        Properties[key] = await tp.user.GetKeyProperties(KeyBlock,key);
    }
    
    return Properties
}

module.exports = GetTextYamlProperties;