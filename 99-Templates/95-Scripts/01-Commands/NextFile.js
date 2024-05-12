// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * - Moves to the next file in {@link layers} 
 * - Sets to the value for {@link currentFilePath},
 * And reads the commands in it.
 * 
 * @date 16/12/2023 
 *
 * @async
 * @returns {Promise<void>}
 */
async function NextFile(){

    // Getting Global values
    let layers = await window?.pkvs?.load("layers");
    let layerIndex = await window?.pkvs?.load("layerIndex");
    let currentFilePath = await window?.pkvs?.load("currentFilePath");

    let currentFile = await app.vault.getAbstractFileByPath(currentFilePath);
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`01-Commands: GetUserChoice:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`01-Commands: GetUserChoice:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

      


    console.log(`01-Commands: NextFile:\nMoving to next Layer\nLayer Index = ${layerIndex}\nFolder => : `)

    // get the current directory, from the current File
    const CurrentDirectory = currentFile.parent;
    console.log(CurrentDirectory);


    console.log(`01-Commands: NextFile:\nGetting next folder`)
    const NextFolder = await tp.user.GetDirectory(layers[layerIndex],`${CurrentDirectory.path}`)
    
    
    console.log(`01-Commands: NextFile:\nGetting next file`)
    currentFile = await tp.user.GetFile(layers[layerIndex],NextFolder.path)

    console.log(`01-Commands: NextFile:\nincreasing Layer Index : ${layerIndex} => ${layerIndex+1}`)

    layerIndex++


  
    await tp.user.RunFileCommands(currentFile)

}

module.exports = NextFile
