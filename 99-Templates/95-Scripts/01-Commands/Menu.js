// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Creates a new menu
 * Sets the {@link menu} to some other value
 * 
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @returns {Promise<String[]|[]>}
 */
async function Menu(Argument){

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

    console.log(`01-Commands: Menu:\nSetting new Menu to`);

    // Get Global value for menu
    let list = []
    
    // if Argument is null or undefined, set the menu to empty value
    if(!Argument)
    {
        console.warn(`01-Commands: Menu:\nCannot get new menu values form Null/Undefined`)
        console.warn(`01-Commands: Menu:\nSeeing menu to an empty menu`)
        console.log(Argument)
        await window?.pkvs?.store("menu" , list);
        return list
    }

    // Check if the argument is a valid array string. 
    const Bracet= new RegExp(/((?<=\ *\[)([\u0000-\u0008|\u0010-\uffff])+(?=\ *\]))/gm)

    let  func = async()=>
    { 
        return Argument.match(Bracet)
    }
    const isMatch = await tp.user.Timeout(func,TimeLimit);

    // If there the string is not a valid Array string, set the value to an Empty Array
    if(!isMatch)
    {
        console.warn(`01-Commands: Menu:\nNo menu items found\nSetting menu to an empty menu`)
        console.log(isMatch)

        await window?.pkvs?.store("menu" , list);
        return  list
    }

    // Make a list of the matched String.
    list = isMatch[0].split(",")

    for (const item in list)
    {
        if(item == 'toNString')
        {
            continue;
        }

        if(!list[item])
        {
            continue;
        }

        
        // Trim the String values from spaces
        list[item] = list[item].trim();
        // remove undefined values
        if(list[item] == undefined){
            list = list.splice(item,1);
        }
    }

    // make sure that directories sorted by name
    let sortedList  = await list.sort(( a, b )=>{
        if ( a < b ){
            return -1;
        }
        if ( a > b ){
            return 1;
        }
        return 0;
    })


    // store global value
    await window?.pkvs?.store("menu" , sortedList);
    return sortedList
}

module.exports = Menu