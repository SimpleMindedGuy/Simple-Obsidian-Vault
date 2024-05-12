// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads the Provided file, and removes all the command blocks if any. 
 * 
 * @date 31/12/2023
 *
 * @async
 * @param {Object} file
 * @returns {Promise<void>}
 */
async function RemoveCommandBlock(file){

    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`05-Writing-text: RemoveCommandBlock:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`05-Writing-text: RemoveCommandBlock:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    const CommandBlockRegExp = new RegExp(/(?<=[^!:;()'"`.*^#@=/<>,\[\]~\{\}\|\\\-+]+)^\n*{{3}:{3}(.*?)\:{3}}{3}\n*(?=[^!:;()'"`.*^#@=/<>,\[\]~\{\}\|\\\-+]*)/smgi);

    let Text = await app.vault.read(file)

    if(!Text)
    {
        console.log(`04-Writing-File-text: RemoveCommandBlock:\nCould not read File`)
        console.log(file.path)
        // return false;
    }

    let func = async ()=>{
        return Text.replace(CommandBlockRegExp,"")
    }

    Text = await tp.user.Timeout(func,TimeLimit)



    
    return await app.vault.modify(
    file,
    Text
    )
    .then(()=>{
        console.log(`04-Writing-File-text: RemoveCommandBlock:\nremoved Command Block`)
        return true
    })
    .catch(()=>{
        console.warn(`04-Writing-File-text: RemoveCommandBlock:\nfailed failed to remove command block`)
        return false
    })
    // Text = await 
}

module.exports = RemoveCommandBlock