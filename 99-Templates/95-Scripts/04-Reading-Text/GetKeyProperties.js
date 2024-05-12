// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Gets the properties in the provided Text {@link KeyBlock}.
 *  - first it tests if the Key contains an object.
 *      - it reads the values of the objects as a YmlBlock.
 *      - then the it Runs the function {@link GetKeysFromYmlBlock}.
 *      - this process is repeated through out ever nested object, until returns the values of the properties of an object.
 *  - if it is not, then it reads the values of the Key.
 *  - then it returns the value in the appropriate format.
 * @date 28/12/2023
 *
 * @async
 * @param {String} KeyBlock - The Complete block fo text of one Yml property.
 * @returns {Promise<null|object|string|string[]>}
 */
async function GetKeyProperties(KeyBlock){

    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`04-Reading-Text: GetTextYamlProperties:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`04-Reading-Text: GetTextYamlProperties:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }

        
    // Regular Expression to the Block of values for the given keyBlock
    const KeyPropertiesRegExp = new RegExp(/((?<=^[\u0021-\uffff]+\:\ *\n*)((\n+\ +[\u0021-\uffff]+\:\ *)+((\n*\ +\-\ +[\u0021-\uffff][\u0020-\uffff]+)+|([\u0021-\uffff][\u0020-\uffff]*)+)+)+)|((?<=^[\u0021-\uffff]+\:\ *)[\u0021-\uffff][\u0020-\uffff]*)|((?<=\- \ *)[\u0021-\uffff][\u0020-\uffff]*)/gim)

    // Wrapper function to get key properties to be used in the TimeOut function. 
    let func = async()=>
    { 
        return KeyBlock.match(KeyPropertiesRegExp)
    }

    // console.log(`looking for Properties for ${key}`)
    const Props = await tp.user.Timeout(func,TimeLimit)

    // return null if the block have no properties
    if(!Props)
    {
        return null
    }

    
    // regular expression to check if the block is an array or not, returns the values.
    const ArrayPatternRegexp = new RegExp(/(?<=^[\u0021-\uffff]+:\ ?\n+)(\n?\ +(?=\-\ ((\w|(?<emoji>(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])))|\"(\w|\k<emoji>)|\'\w)).+)+/g)

    // Wrapper function to get array values to be used in the TimeOut function.
    func = async()=>{
        return KeyBlock.match(ArrayPatternRegexp)
    }

    let isArray = await tp.user.Timeout(func,TimeLimit)

    // if the regular expression returns any values, then return values of the array.
    if(isArray)
    {
        // console.log(`is an array`)
        // convert values of the array from string, to appropriate values.
        return await tp.user.ConvertValue(Props)
    }

    // Regular expression to check if the key is an object with nested values.
    // if key have any spaces on the line below it, and there is no values next to it.
    const spacingRegexp = new RegExp(/(?<=^[\u0021-\uffff]+:\ ?\n+)\ +(?=\w.+)/mg)
    func = async()=>
    { 
        return KeyBlock.match(spacingRegexp)
    }

    // console.log(`checking if ${key} is an object or not`)
    let isNested = await tp.user.Timeout(func,TimeLimit)
    if(!isNested)
    {
        // console.log(`spaces are not found, key dose not have any properties. (key is not a object)`)
        return await tp.user.ConvertValue(Props[0])
    }
    
    // getting after the spaces of nested keys
    let spacing = isNested[0].length;

    // regular expression to read the nested key values as a Yaml Block.
    const SpaceRegExp = new RegExp(`^\ {${spacing}}(?=.+|\n$)`,`gm`);

    // Wrapper function to get nested key values to be used in the TimeOut function.
    func = async()=>
    {
        return KeyBlock.replace(SpaceRegExp,"");
    }

    // console.log(`removing spacing from ${key}'s properties`)
    // getting the nested keys as a yaml block.
    let nestedYmlBlock = await tp.user.Timeout(func,TimeLimit);
    
    // if there is no yamlBlock return null
    if(!nestedYmlBlock)
    {
        return null;
    }

    
    // getting keys from nested Yaml Block 
    const isYmlKeys = await tp.user.GetKeysFromYmlBlock(nestedYmlBlock)

    // console.log(`looking for nested keys in ${key}`)
    // return null if no keys were found.
    if(!isYmlKeys)
    {
        // console.log(`no nested keys where found in ${key}`)
        // console.log(isYmlKeys)
        return null
    }


    // console.log(`looping through nested keys of ${key}`)

    const Properties = {} 
    // loop over keys in nested yamlBlock as if it is a normal Yaml Block. 
    // return ing the value as a JS object. 
    for (const Key of isYmlKeys)
    {
        
        const nestedKeyBlock = await tp.user.GetKeyBlockInYmlBlock(nestedYmlBlock,Key)

        if(!nestedKeyBlock)
        {
            // console.log(`nested key block was not found`)
            // console.log(KeyBlock)
            Properties[Key] = null
            continue
        }
        Properties[Key] = await tp.user.GetKeyProperties(nestedKeyBlock,Key);
    }

    return  Properties
    
}


module.exports = GetKeyProperties;
