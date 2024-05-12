// In The Name of Allah, The Most Beneficent, The Most Merciful
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

    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`04-Reading-Text: GetFileProperties:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`04-Reading-Text: GetFileProperties:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    const YamlProps = await tp.user.GetTextYamlProperties(file)

    const inLineProps= await tp.user.GetTextInlineProps(file)

    console.log(`04-Reading-Text: GetFileProperties:\ninline faggots are`)
    console.log(inLineProps)
    return {...inLineProps,...YamlProps}
    
}

module.exports = GetFileProperties