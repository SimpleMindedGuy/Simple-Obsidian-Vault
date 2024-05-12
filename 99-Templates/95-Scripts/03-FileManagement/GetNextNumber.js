// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Reads the names of all the provided {@link Directory},
 * looks for Directories that have a name that starts with a number, and returns the next available number + 1.
 * @date 16/12/2023
 *
 * @async
 * @param {object} Directory - directory where to look for folders.
 * @param {Number} padding - Amount of digits in the number string.
 
 * @returns {Promise<string|null>}
 */
async function GetNextNumber(Directory,padding)
{
    console.log(`03-FileManagement: GetNextNumber:\nGetting next Number in directory =>`)
    console.log(Directory.path)

    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`03-FileManagement: MakeBuildPath:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`03-FileManagement: MakeBuildPath:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    
    

    // if no directory provided do nothing and return null
    if(!Directory)
    {
        console.warn(`03-FileManagement: GetNextNumber:\nDirectory not provided`)
        return null;
    }

    // if directory have no children(files/directories), return 0.
    if(!Directory.children || Directory.children.length === 0 )
    {
        console.warn(`03-FileManagement: GetNextNumber:\nDirectory dose not have any children`)
        let number = 0;
        let NextNumber = await number.toString().padStart(padding,'0');
        return NextNumber;
    }

    // number at the start of directory name expression
    const DirNameRegExp = new RegExp(/\d{1,}\ *(?=\-.+)/gm);;
    

    // make sure that directories sorted by name
    let Children  = await Directory.children.sort(( a, b )=>{
        if ( a.name < b.name ){
            return -1;
        }
        if ( a.name > b.name ){
            return 1;
        }
        return 0;
    })

    let Max= 0

    // looping over children and get highest numbered file name, and add 1 to i
    for (const dir of  Children)
    {
        // number expression.
        let isMatch = await DirNameRegExp.test(dir.name);

        console.log(isMatch)
        if(!isMatch)
        {
            continue
        }

        let func = async()=>
        { 
            return parseInt(dir.name.match(DirNameRegExp)[0])
        }

        // get the number
        let num = await tp.user.Timeout(func,TimeLimit)

        // if current number is larger than the last Max number by 2,then exist the loop
        // this is use to get in between numbers like 10 15 20 > would return 11
        if(num >= Max+2)
        {
            break
        }
        if( num > Max )
        {
            Max = num
        }
            
    }

    Max++;



    let NewNumber = await Max.toString().padStart(padding,'0');
    return NewNumber
}

module.exports = GetNextNumber