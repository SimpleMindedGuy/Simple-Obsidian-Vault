// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * loops through the {@link layers}, and looks for folders, with the same name as the entries, and it stops and returns the last folder found. 
 * @date 25/12/2023
 *
 * @async
 * @returns {Promise<object|undefined>}
 */
async  function GetTemplatesFolder(){


    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`06-Utility Specific: GetTemplatesFolder:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

        // Getting Templater object for running functions
        tp = {}
        const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

        for (const fun of tpInternalFunctions) {
            tp[fun.name] = fun.static_object;  
        }

        tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();

        
    }
    
    // if templater is not provided exist loop
    if(!tp)
    {
        console.warn(`06-Utility Specific: GetTemplatesFolder:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }


    let TemplatePath = await window.pkvs.load("TemplatePath") ;
    let layers = await window.pkvs.load("layers") ?? [];

    if(!TemplatePath)
    {
        return null   
    }

    let folder = await app.vault.getAbstractFileByPath(TemplatePath)

    let TemFolder = folder;
    for (const lay of layers)
    {
        console.log(lay)

        folder =  await tp.user.GetDirectory(lay,folder.path)
        if(!folder)
        {
            console.warn(`06-Utility Specific: GetTemplatesFolder:\nFolder was not found, exiting the loop.`)
            break
        }
        TemFolder = folder
    }

    return TemFolder
}

module.exports = GetTemplatesFolder