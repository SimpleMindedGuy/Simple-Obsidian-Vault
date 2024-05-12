// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Gets Media links of media attachments, in the current file, and returns a list of the attachments links.
 * 
 * @date 02/01/2024 - 08:42:19
 *
 * @async
 * @param {Object} File - File object to read links from.
 * @returns {Promise<String[]|null>}
 */
async function GetMediaFilesLinks(File)
{

    // Getting global values if they exist
    let tp = await window?.pkvs?.load("tp");


    if(!tp)
    {
        console.log(`06-Utility Specific: GetMediaFilesLinks:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: GetMediaFilesLinks:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

        
    const Text = await app.vault.read(File)

    const MediaLink = RegExp(/(?<=\!\[\[)(?!.*(Banner|Media|icon|Daily|Files|Media|Attachments)).*(?:\.(gif|png|jpeg|mp4|jpg|jpeg|webm|mpeg|acc|flac|mkv|flv|pdf))(?=\]\])/igm);

    let func = async ()=>{
        return Text.match(MediaLink)
    }

    return await tp.user.Timeout(func,TimeLimit);

}

module.exports = GetMediaFilesLinks