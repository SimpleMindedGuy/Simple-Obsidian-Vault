// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads the {@link currentFilePath} and looks for a key that matches the value of {@link Argument} and then it takes its value if any, and assigns it to the variable {@link currentValue}.
 * 
 * - First it looks for  the value inside the YML block, then if nothing is found, it will look for an inline value. 
 * - the function will test the value is a number, and if it is a boolean, then if it is an array, then if it is a string. 
 * - if nothing is found then th returns null
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired new value 
 * 
 * @returns {Promise<*>}
 */
async function GetValue(Argument){
    
    let currentFilePath = await window?.pkvs?.load("currentFilePath");
    console.log(`01-Commands: GetValue:\nreading the current value of a variable/key with the\nname : ${Argument}\nfrom teh current file \n@ ${currentFilePath}`)

    let currentFileProperties = await window?.pkvs?.load("currentFileProperties");

    let currentFile = await app.vault.getAbstractFileByPath(currentFilePath)
    
    
    
    if(!currentFileProperties)
    {
        if(!currentFile)
        {
            console.log(`01-Commands: GetValue:\nCurrent file is null, cannot read file`)

            return 
        }
        console.log(`01-Commands: GetValue:\nGetting current file properties.`)


        // Getting Templater object for running functions
        let tp = await window?.pkvs?.load("tp");

        if(!tp)
        {
            console.log(`01-Commands: GetValue:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
            console.warn(`01-Commands: GetValue:\ntemplater was not provided`)
            console.warn(tp)
            return null
        }


        currentFileProperties = await tp.user.GetFileProperties(currentFile)

        window?.pkvs?.store("currentFileProperties" , currentFileProperties);
    }

    console.log(`01-Commands: GetValue:\nGetting property =>`)
    console.log(Argument)
    console.log(`01-Commands: GetValue:\nfrom current file properties, and storing it in the global value variable.`)
    

    let currentValue = await currentFileProperties[Argument];

    window?.pkvs?.store("currentValue" , currentValue);

    return currentValue
}

module.exports = GetValue