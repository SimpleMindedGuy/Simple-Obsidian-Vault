// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Replaces inline keys in the {@link File}'s text, that matches keys in {@link  Meta}, with corresponding value in {@link Meta} for each key.
 * @date 25/12/2023
 *
 * @async
 * @param {object} Values - Object containing the values to be written 
 * @param {object} File - File object.
 * @returns {Promise<object>}
 */
async function ReplaceInlineValueWithMetaIntoFile(Values,File)
{

        
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`05-Writing-text: AddInlineValue:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`05-Writing-text: AddInlineValue:\ntemplater is not provided`)
        console.warn(tp)
        return
    }


    // reading File 
    let Text = await app.vault.read(File)

    console.log(`05-Writing-text: AddInlineValue:\nLooking for Inline Values in File `)
    console.log(File)

    // (?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n
    const inLineKeyValueRegExp = new RegExp (/(?<=\n*?)([\u0010-\uffff]+)\ {0}\:\: .*\n/gm)
    const KeyRegExp = new RegExp(/^(?<=\n*?)([\u0021-\uffff]+)(?=\:{2}.*\n?$)/gm)

    let func =  async ()=>
    { 
        return Text.match(inLineKeyValueRegExp)
    }
    const isInlineKey = await tp.user.Timeout(func,TimeLimit)

    if(!isInlineKey){
        console.warn(`05-Writing-text: AddInlineValue:\nCould not find Inline Values \n`)
        // console.warn(Text)
        return File
    }

    console.log(isInlineKey)
    console.log(`05-Writing-text: AddInlineValue:\nLoop through keys.`)
    
    for (const inLine of isInlineKey)
    {

        func =  async ()=>
        { 
            return inLine.match(KeyRegExp);
        }

        const key = await tp.user.Timeout(func,TimeLimit)

        if(!key)
        {
            console.warn(`05-Writing-text: AddInlineValue:\nKey does not exist`);
            continue;
        }

        console.log(`05-Writing-text: AddInlineValue:\nkey : ${key[0]}`);
        console.log(Values[key[0]]);

        if(!Values[key[0]])
        {
            console.log(`05-Writing-text: AddInlineValue:\nKey dose not exist, skipping key`)
            continue
        }

        Text = Text.replace(inLine,`${key[0]}:: ${Values[key[0]]}`)
    }

    // console.log(Text)

    func =  async ()=>
    { 
        return app.vault.modify(
            File,
            Text
        )
        .then((f)=>{
            console.log(`05-Writing-text: AddInlineValue:\nAdded MetaData`)
            // new Notice("Added description MetaData");
            // return f
        })
        .catch((err)=>{
            console.warn(err)
            console.warn(`05-Writing-text: AddInlineValue:\nFailed to add MetaData`)
            // new Notice("Failed to add description MetaData");
        })
    }

    await tp.user.Timeout(func,TimeLimit);
 
   


    return File
}

module.exports = ReplaceInlineValueWithMetaIntoFile
