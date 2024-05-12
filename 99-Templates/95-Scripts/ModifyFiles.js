// In The Name of Allah, The Most Beneficent, The Most Merciful

TimeLimit = 5000
async function main(){
    console.log(`Looking into files in current active file's directory`)

    const currentFile = await app.workspace.getActiveFile()

    console.warn(`Reading active file `)
    console.log(currentFile)

    if(!currentFile)
    {
        console.log(`Could not get current file`)
        return 
    }

    const currentDirectory = await app.vault.getAbstractFileByPath(currentFile.parent.path)


    if(!currentDirectory)
    {
        console.log(`Could not get directory `);
        return
    }
    

    getChildren(currentDirectory)


}
module.exports = main;


async function getChildren(folder)
{
    if(!folder)
    {
        console.log(`no folder provided`)
        return
    }

    if(!folder.children)
    {
        console.log(`folder have no children`)
        await getChildren(folder)
        return
    }


    for (const child of folder.children)
    {
        if(!child.children)
        {
            console.log(`${child.name}`)
            await modifyFile(child)
            continue
        }

        console.log(`Looking into folder : ${child.name}`)
        await getChildren(child)
    }

}


async function modifyFile(file){


    if(!file)
    {
        console.log(`no file to modify`)
    }
    
    // const Text = await app.vault.read(file)
    
    // let newText = await YamlEditing(Text,"😶")
    
    // console.log(newText)
    
    const Expression = RegExp (/^\- \[ \] /gmi);    
    const Text = await app.vault.read(file);

    const replaceText = `- [-] `;    
    const newText = await Text.replace(Expression,`${replaceText}`)

    await app.vault.modify(
        file,
        newText
    )
    .then(()=>{
        console.log(`its fine`)
    })
    .catch(()=>{
        console.log(`its not fine`)
        
    })

    
}


async function YamlEditing(Text,key)
{
    
    if(!Text){
        return null
    }
    // console.log(`Input`)
    // console.log(Text)
    const YamlBlock = await GetYmlBlock(Text);

    if(!YamlBlock)
    {
        // console.log(`Could not find Yaml Block in Text`)
        return Text
    }

    // console.log(`Yaml Block`)
    // console.log(YamlBlock);
    
    const KeyBlock = await GetKeyBlockInYmlBlock(YamlBlock,key)

    if(!KeyBlock)
    {
        // console.log(`Could not find Key Block in Yaml Block`)
        return Text
    }

    // console.log(`Key Block`);
    // console.log(KeyBlock);

    const Props = await GetKeyProperties(KeyBlock)

    
    if(!Props)
    {
        // console.log(`Could not find Props in Key Block`)
        return Text
    }

    // console.log(`Props`)
    // console.log(Props)

    const YmlBlockRegExp = new RegExp(/(?<=\-{3}\n)(.|\n)+(?=\n\-{3}\n)/gm)
    const keyLineRegExp = new RegExp(`(?:^${key}\\:\\ *)((\\n*\\ +\\-\\ +[\\u0021-\\uffff][\\u0020-\\uffff]*)|(\\n*\\ +[\\u0021-\\uffff]+\\:\\ ?)+|([\\u0021-\\uffff][\\u0020-\\uffff]*)?)+`,`gmi`)


    const quotes = new RegExp(/(?<=(?<=^\').*)'$|^\'(?=.*\'$)/gm)
    const dashes = new RegExp(/(?<=^(?:\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+)(\-|\:)/gm)
    const FirstLetter = new RegExp (/(?<=^(?:(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+\ )?)[a-z]/)


    let newYamlBlock =  YamlBlock;
    let newKeyBlock = KeyBlock;
    
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gmi;
    
    console.log(KeyBlock)

    console.log(`props`)
    console.log(Props)
    if(!Array.isArray(Props))
    {
        // console.log(`not an array`)
        // console.log(Props)

        const type = typeof Props;
        // console.log(`Prop's type is : ${type}`)

        

        if (type == "string")
        {
            let newProp = Props;

            newProp = newProp.replace(quotes,"")
            newProp = newProp.replace(dashes,"")

            const firstChar = newProp.match(FirstLetter) ??  null
            if (firstChar)
            {
                newProp = newProp.replace(FirstLetter,firstChar[0].toUpperCase())
            }

            newKeyBlock = newKeyBlock.replace(Props,`\n - ${newProp}`)


            newYamlBlock = newYamlBlock.replace(keyLineRegExp,newKeyBlock)
            
            
            const newText = await Text.replace(YmlBlockRegExp,newYamlBlock)

            // console.log(`output`)
            // console.log(newKeyBlock)
            // console.log(newText)

            return newText
                       
        }
        
        // console.log(`Props is not a valid type\nremove value forever this cannot be reversed`)


        newKeyBlock = newKeyBlock.replace(Props,"")
        newYamlBlock = newYamlBlock.replace(KeyBlock,newKeyBlock)
        
        const newText = await Text.replace(YamlBlock,newYamlBlock)
        // console.log(`output`)
        // console.log(newKeyBlock)
        // console.log(newText)

        return newText
    }



    for (const prop of Props)
    {
        // console.log(`Prop is : `);
        // console.log(prop);

        const type = typeof prop;
        // console.log(`Prop's type is : ${type}`)


        if (type == "string")
        {
            let newProp = prop;

            newProp = newProp.replace(quotes,"")
            newProp = newProp.replace(dashes,"")
            const firstChar = newProp.match(FirstLetter) ??  null
            if (firstChar)
            {
                newProp = newProp.replace(FirstLetter,firstChar[0].toUpperCase())
            }

            
            const Expression = RegExp (/^😐(\ |\:)?ok\ *$/gmi);    

            newProp = newProp.replace(Expression,`😐 OK`)
            // console.log(`Props is a valid type\n`)
            newKeyBlock = newKeyBlock.replace(prop,newProp)        

            
            // console.log(newKeyBlock)
            continue 
        }

        // let newProp = prop;

        newKeyBlock = newKeyBlock.replace(prop,"")
    }

    newKeyBlock = newKeyBlock.replace(/^\ \-\ *\n/gm,"")
    newYamlBlock = newYamlBlock.replace(keyLineRegExp,newKeyBlock)
    
    
    
    const newText = await Text.replace(YmlBlockRegExp,newYamlBlock)
    // console.log(`output`)
    // console.log(newKeyBlock)
    // console.log(newText)
    return newText
}

/**
 * Reads the provided {@link Text} and looks if there is a Yaml Block encased in between suffex and prefex (---).
 * If the Yaml Block was not found it returns null.
 * @date 28/12/2023
 *
 * @async
 * @param {String} Text
 * @returns {Promise<null|String[]>}
 */
async function GetYmlBlock(Text)
{
    console.log(`Looking for Yml (MetaData) block in File `)
    
    

    const YmlBlockRegExp = new RegExp(/(?<=\-{3}\n)(.|\n)+(?=\n\-{3}\n)/gm)


    let func = async()=>
    { 
        return Text.match(YmlBlockRegExp)
    }
    const Matches =  await TimeoutAfter(func,TimeLimit)
    if(!Matches)
    {
        return null
    }
    
    
    return Matches[0] 
}



/**
 * Searches for the provided {@link key} in the provided {@link YamlBlock}.
 * @date 28/12/2023
 *
 * @async
 * @param {String} YmlBlock - The Block of yaml text Provided
 * @param {String} key - The key to look f or in the {@link YamlBlock}
 * @returns {Promise<null|String[]>}
 */
async function GetKeyBlockInYmlBlock(YmlBlock,key){

    // (?:^${key}\:\ *)((\n*\ +\-\ +[\u0021-\uffff][\u0020-\uffff]*)|(\n*\ +[\u0021-\uffff]+\:\ ?)+|([\u0021-\uffff][\u0020-\uffff]*)?)+
    // Regular Expression to the Block of values for the given key inside the given  YmlBlock
    const keyLineRegExp = new RegExp(`(?:^${key}\\:\\ *)((\\n*\\ +\\-\\ +[\\u0021-\\uffff][\\u0020-\\uffff]*)|(\\n*\\ +[\\u0021-\\uffff]+\\:\\ ?)+|([\\u0021-\\uffff][\\u0020-\\uffff]*)?)+`,`gmi`)



    // matching function rapper to be used in the TimeoutAfter function, for them 
    let func = async()=>
    { 
        return YmlBlock.match(keyLineRegExp)
    }

    // getting the key block from the YmlBlock using the timeout function to avoid problems.
    let KeyBlock = await TimeoutAfter(func,TimeLimit)
    console.log(`KeyBlock`)
    console.log(KeyBlock)

    // return null if the KeyBlock does not exit.
    if(!KeyBlock)
    {
        return null
    }
    
    // return the first match.
    return KeyBlock[0] 
}


/**
 * Gets the properties in the provided Text {@link KeyBlock}.
 *  - first it tests if the Key contains an object.
 *      - it reads the values of the objects as a YmlBlock.
 *      - then the it Runs the function {@link GetKeysFromYmlBlock}.
 *      - this process is repeated through out ever nested object, untill returns the values of the properties of an object.
 *  - if it is not, then it reads the values of the Key.
 *  - then it returns the value in the appropriate format.
 * @date 28/12/2023
 *
 * @async
 * @param {String} KeyBlock - The Complete block fo text of one Yml property.
 * @returns {Promise<null|object|string|string[]>}
 */
async function GetKeyProperties(KeyBlock){

    // Regular Expression to the Block of values for the given keyBlock
    const KeyPropetiesRegExp = new RegExp(/((?<=^[\u0021-\uffff]+\:\ *\n*)((\n+\ +[\u0021-\uffff]+\:\ *)+((\n*\ +\-\ +[\u0021-\uffff][\u0020-\uffff]+)+|([\u0021-\uffff][\u0020-\uffff]*)+)+)+)|((?<=^[\u0021-\uffff]+\:\ *)[\u0021-\uffff][\u0020-\uffff]*)|((?<=\- \ *)[\u0021-\uffff][\u0020-\uffff]*)/gim)

    // Wrapper function to get key properties to be used in the TimeOut function. 
    let func = async()=>
    { 
        return KeyBlock.match(KeyPropetiesRegExp)
    }

    // console.log(`looking for Properties for ${key}`)
    const Props = await TimeoutAfter(func,TimeLimit)

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

    let isArray = await TimeoutAfter(func,TimeLimit)

    // if the regular expression returns any values, then return values of the array.
    if(isArray)
    {
        // console.log(`is an array`)
        // convert values of the array from string, to appropriate values.
        return await ConvertValue(Props)
    }

    // Regular expression to check if the key is an object with nested values.
    // if key have any spaces on the line below it, and there is no values next to it.
    const spacingRegexp = new RegExp(/(?<=^[\u0021-\uffff]+:\ ?\n+)\ +(?=\w.+)/mg)
    func = async()=>
    { 
        return KeyBlock.match(spacingRegexp)
    }

    // console.log(`checking if ${key} is an object or not`)
    let isNested = await TimeoutAfter(func,TimeLimit)
    if(!isNested)
    {
        // console.log(`spaces are not found, key dose not have any properties. (key is not a object)`)
        return await ConvertValue(Props[0])
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

    // console.log(`removeing spacing from ${key}'s properties`)
    // getting the nested keys as a yaml block.
    let nestedYmlBlock = await TimeoutAfter(func,TimeLimit);
    
    // if there is no yamlBlock return null
    if(!nestedYmlBlock)
    {
        return null;
    }

    
    // getting keys from nested Yaml Block 
    const isYmlKeys = await GetKeysFromYmlBlock(nestedYmlBlock)

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
        
        const nestedKeyBlock = GetKeyBlockInYmlBlock(nestedYmlBlock,Key)

        if(!nestedKeyBlock)
        {
            // console.log(`nested key block was not found`)
            // console.log(KeyBlock)
            Properties[Key] = null
            continue
        }
        Properties[Key] = GetKeyProperties(nestedKeyBlock,Key);
    }

    return  Properties
    
}


/**
 * Takes String and "tries" to convert them to the appropriate type.
 * 
 * 
 * @date 28/12/2023 - 23:30:19
 * 
 * @async
 * @param {String[]|String} Value - the provided value to convert 
 * @returns {Promise<*>} - Could be anything.
 */
async function ConvertValue(Value)
{

    // console.log(`converting value`)
    // console.log(Value)
    if(!Value)
    {
        return null
    }

    let trueRegxep = RegExp(/true/i)
    let falseRegxep = RegExp(/false/i)
    if(Array.isArray(Value))
    {
        // console.log(`value is an array`)
        let Arr =[]

        for(const val of Value)
        {

            let istrue = val.match(trueRegxep);
            if(istrue)
            {
                Arr.push(true);
                continue
            }

            let isfalse = val.match(falseRegxep)
            if(isfalse)
            {
                Arr.push(false);
                continue
            }

            let parse = parseFloat(val)
            
            if(await !isNaN(parse))
            {
                Arr.push(parse)
                continue
            }

            let datt = await moment(val).isValid()
            if(datt)
            {
                Arr.push(await moment(val).format("YYYY-MM-DDTHH:mm:ssZ"))
            }
                    
            Arr.push(val)
        }
        // console.log(`Val`)
        // console.log(Arr)
        return Arr
    }

    let val = Value

    // console.log(`not an array `)
    // console.log(`Val`)
    // console.log(Value)
    let istrue = Value.match(trueRegxep);
    if(istrue)
    {
        // console.log(`is bool`)
        return true
    }
    let isfalse = Value.match(falseRegxep);
    if(isfalse)
    {
        // console.log(`is bool`)
        return false
    }

    let parse = parseFloat(Value)

    const whiteSpaceRegExp= RegExp(/\ */gm);

    
    if(!isNaN(parse) && parse.toString().replace(whiteSpaceRegExp,"").length == Value.replace(whiteSpaceRegExp,"").length)
    {
        console.log(`is number`)
        console.log(parse)
        return parse
    }

    let datt = await moment(Value).isValid()
    if(datt)
    {
        // console.log(`is Date`);
        // console.log(await moment(Value).format("YYYY-MM-DDTHH:mm:ssZ"));

        return await moment(Value).format("YYYY-MM-DDTHH:mm:ssZ");
    }

    // console.log(`string`);
    // console.log(val);
    return val
}


/**
 * Takes a function {@link CallBack} retruns its results, if the function takes longer than the given {@link TimeLimit} it will stop the function, and retrun an error.
 * @date 25/12/2023
 *
 * @async
 * @param {Function} CallBack
 * @param {Number} TimeLimit
 * @returns {Promise<*>}
 */
function TimeoutAfter(CallBack,TimeLimit){
    return new Promise(async(resolve,reject)=>{
        
        // console.log(`starting function timer`)
        const Exec = setTimeout(()=>{
            console.log(`Function timed out`)
            clearTimeout(Exec)
            
            reject(null)
        },TimeLimit)


        
        await CallBack().then(response =>{
            clearTimeout(Exec)
            resolve(response);
        }).catch(error=>{
            clearTimeout(Exec)
            console.log(`Function ran in into an error`)
            console.log(error)
            reject(null);
        })
    })
}