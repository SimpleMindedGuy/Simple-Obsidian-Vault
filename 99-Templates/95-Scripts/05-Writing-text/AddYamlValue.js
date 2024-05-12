// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Replaces keys in the {@link File}'s Yml block, that matches keys in {@link  Meta}, with corresponding value in {@link Meta} for each key.
 * @date 17/12/2023 - 11:51:58
 *
 * @async
 * @param {object} Values - Object containing the values to be written 
 * @param {object} File - File object.
 * @returns {Promise<object>}
 */
async function AddYamlValue(Values,File)
{
    
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`05-Writing-text: AddYamlValue:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`05-Writing-text: AddYamlValue:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    // reading File 
    let Text = await app.vault.read(File)
    

    if(!Text)
    {
        console.warn(`05-Writing-text: AddYamlValue:\nText dose not exist `)
        console.warn(Text)
        return File
    }

    console.log(`05-Writing-text: AddYamlValue:\nLooking for Yml (MetaData) block in File `)
    console.log(File)
    
    const isYmlBlock = await tp.user.GetYmlBlock(Text)
    
    if(!isYmlBlock)
    {
        console.log(`05-Writing-text: AddYamlValue:\nyml block was not found in file`)
        console.log(isYmlBlock)
        return null
    }

    const isYmlKeys = await tp.user.GetKeysFromYmlBlock(isYmlBlock)
    
    if(!isYmlKeys)
    {
        console.log(`05-Writing-text: AddYamlValue:\nno keys where found in Yaml Block`)
        console.log(isYmlKeys)
        return null
    }


    

    let newBlock = isYmlBlock;

    for (const key of isYmlKeys)
    {
        // if(!key)
        // {
        //     console.warn(`05-Writing-text: AddYamlValue:\ncould not find Yml key `)
        //     console.log(key)
        //     continue
        // }


        
        if(!Values[key])
        {
            console.log(`05-Writing-text: AddYamlValue:\nKey => ${key} does not exist, skipping key`)
            continue
        }

        console.log(`05-Writing-text: AddYamlValue:\nkey  : ${key}\nVal  :\n `)
        console.log(Values[key])

        const KeyRegExp = new RegExp (`^(?<=\\n*)[${key}]+(\\:\\ *.*\\n|\\:\\ *\\n$)`,`gmi`)

        if(Array.isArray(Values[key]))
        {

            let text =""
            for(const entry of Values[key])
            {
                text +=` - ${entry}\n`
            }
            newBlock = newBlock.replace(KeyRegExp,`${key}: \n${text}`)

            continue
        }
        newBlock = newBlock.replace(KeyRegExp,`${key}: ${Values[key]}\n`)

    }

    const newText = Text.replace(isYmlBlock,newBlock)


    func = async()=>{
        app.vault.modify(
            File,
            newText
        )
        .then((file)=>{
            console.log(`05-Writing-text: AddYamlValue:\nAdded MetaData`)
            // new Notice("Added description MetaData");
            // return file
        })
        .catch((err)=>{
            console.warn(err)
            console.warn(`05-Writing-text: AddYamlValue:\nFailed to add MetaData`)
            // new Notice("Failed to add description MetaData");
        })
    }
    await tp.user.Timeout(func,TimeLimit);


    return File
}
module.exports = AddYamlValue
