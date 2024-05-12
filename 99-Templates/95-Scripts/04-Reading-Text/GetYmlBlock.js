// In The Name of Allah, The Most Beneficent, The Most Merciful
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
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`04-Reading-Text: GetYmlBlock:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`04-Reading-Text: GetYmlBlock:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

    console.log(`04-Reading-Text: GetYmlBlock:\nLooking for Yml (MetaData) block in File `)
    
    const YmlBlockRegExp = new RegExp(/(?<=\-{3}\n)(.|\n)+(?=\n\-{3}\n)/gm)


    let func = async()=>
    { 
        return Text.match(YmlBlockRegExp)
    }
    const Matches =  await tp.user.Timeout(func,TimeLimit)
    if(!Matches)
    {
        return null
    }
    
    
    return Matches[0] 
}

module.exports = GetYmlBlock;