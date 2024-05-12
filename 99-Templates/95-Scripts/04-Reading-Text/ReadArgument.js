// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads a **Line** and returns the Argument of a command in the line if any.
 * returns null if there is no Argument for a command found.
 * @date 16/12/2023 
 *
 * @async
 * @param {string} Line
 * @returns {Promise<string|null>}
 */
async function ReadArgument (Line){
    
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`04-Reading-Text: ReadArgument:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`04-Reading-Text: ReadArgument:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

    const ArgumentRegExp = new RegExp(/((?<=\w*\=\ *\>\ *\{\n*)([\u0000-\u0008|\u0010-\uffff])(\n*[\u0000-\u0008|\u0010-\uffff])*(?=\n*\}))|((?<=\w*\=\ *\>\ *)\[([\u0000-\u0008|\u0010-\uffff])+(?:\]))|(?<=\w*\=\ *\>\ *)(?:[^\u0020|\[|\]|\{|\}|\n|\\|\/][\u0010-\uffff]*[^\u0020|\[|\]|\{|\}|\n|\\|\/]*)/gmi)



    let  func = async()=>
    { 
        return Line.match(ArgumentRegExp)
    }
    const isMatch = await tp.user.Timeout(func,TimeLimit)

    if(!isMatch)
    {
        console.warn(`04-Reading-Text: ReadArgument:\nno line provided`)
        console.warn(Line)
        return null
    }

    const Arguemnt = isMatch[0]

    return Arguemnt
}

module.exports = ReadArgument
