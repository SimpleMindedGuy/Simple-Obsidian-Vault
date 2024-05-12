// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Replaces expressions that hold the a key name in the provided Text {@link Arguemnt}
 * with corresponding values in of those keys in {@link Meta}
 * 
 * - the expression would look something like > !(key name)
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - provided text
 
 * 
 * @returns {Promise<string|null>}
 */
async function ReplaceValues(Argument){
    
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`05-Writing-text: ReplaceValues:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`05-Writing-text: ReplaceValues:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    // Check and argument is provided
    if(!Argument)
    {
        console.warn(`04-Writing-text: ReplaceValues:\nno argument provided`)
        console.warn(Argument)
        return Argument
    }
    // Find key to match for values
    const KeysRegExp = new RegExp(/(?<=\!\(\ *)([\u0000-\u0009|\u0010-\u0029|\u0030-\uffff])*\ *(?=\))/gm)

    
    let  func = async()=>
    { 
        return Argument.match(KeysRegExp)
    }


    const isKeys = await tp.user.Timeout(func,TimeLimit)

    // if there is no keys found then return the original text
    if(!isKeys)
    {
        return Argument
    }
    
    console.log(`04-Writing-text: ReplaceValues:\nMatched keys`)
    console.log(isKeys)

    let Text = Argument

    // get meta global key
    let Meta = await window?.pkvs?.load("Meta") ?? {}

    // loop over found keys and replace them with values from meta
    for(const key of  isKeys)
    {
        const KeyRegExp = new RegExp(`!\\(\\ *${key}\\ *\\)`,`gm`)
        console.log(`04-Writing-text: ReplaceValues:\nreplacing key : ${key}\nwith the value = `)
        console.log(Meta[key])
        // console.log(`04-Writing-text: 01-ReplaceValues: \nusing the expression `)
        // console.log(KeyRegExp)


        
        Text  = await Text.replace(KeyRegExp,Meta[key])
    }

    

    console.log(`04-Writing-text: ReplaceValues:\nNew Text => `)
    console.log(Text)
    return Text
}

module.exports = ReplaceValues