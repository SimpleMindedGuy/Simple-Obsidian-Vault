// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads a **Line** and returns the Command in the line if any.
 * returns null if there is no Command found.
 * 
 * 
 * @date 16/12/2023 
 * @async
 * @param {string} Line
 * @returns {Promise<string|null>}
 */
async  function ReadCommand (Line){

    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`04-Reading-Text: ReadCommand:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`04-Reading-Text: ReadCommand:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

    const CommandRegExp = new RegExp(/(\w+)(?=\ *\:\ *)/s);


    let  func = async()=>
    { 
        return Line.match(CommandRegExp);
    }

    const isMatch = await tp.user.Timeout(func,TimeLimit)

    if(!isMatch)
    {
        console.warn(`04-Reading-Text: ReadCommand:\nno line provided`)
        console.warn(Line)
        return null
    }
    const Command  = isMatch[0]

    return Command
}

module.exports = ReadCommand
