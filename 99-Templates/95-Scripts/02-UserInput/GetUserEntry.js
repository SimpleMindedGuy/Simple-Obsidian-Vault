// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Displays a dialog that contains the provided {@link text}, and asks the user for one or more entries, stores the user chooses in {@link Meta} using a key with the provided name {@link argument} if it is provided. and return users Entry/Entries.
 * @date 25/12/2023
 *
 * @async
 * @param {string} text - text for the dialog
 * @param {boolean} isMultiple - allow user to choose multiple options.
 * @param {boolean} isOptional - allow user to not choice any option.
 * @returns {Promise<string|string[]|null>}
 */
async function GetUserEntry(text,isMultiple,isOptional){

    console.log(`02-UserInput: GetUserEntry:\nMaking a list of items`)

    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`02-UserInput: GetUserEntry:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`02-UserInput: GetUserEntry:\ntemplater is not provided`)
        console.warn(tp)
        return
    }
    

    let IsEntering = true ;
    let errormsg = ""
    let UserEntries = null
    let MenuText = ""

    const whiteSpaceRegExp= RegExp(/^\ *$/gm);

    while(IsEntering)
    {
        console.log('02-UserInput: GetUserEntry:\nis Entering')
        // display a dialog using templater

        let Entry = await tp.system.prompt(text+MenuText+`\n`+errormsg,"",false)
        // re-setting, menu choices.

        console.log(Entry)
        errormsg =""
        // boolean to check if the input is a only white space.
        let isWhiteSpace = whiteSpaceRegExp.test(Entry)

        // if entry is empty or just white space, set error message and continue the loop.
        if(isWhiteSpace || Entry === null )
        {
            console.log(`02-UserInput: GetUserEntry:\nEntry is white space, invalid input`)

            // exit if entry is optional.
            if(isOptional )
            {
                console.log(`02-UserInput: GetUserEntry:\nExiting loop`);

                // change loop boolean to false.
                IsEntering =  false;
            }
            errormsg ="Entry cannot be white space"
            continue
            return UserEntries ?? Null
            
        }

        // if user can only chose one option exit the loop.
        if(!isMultiple)
        {
            console.log(`02-UserInput: GetUserEntry:\nSetting value`)
            UserEntries = Entry
            IsEntering = false
            continue
        }

        if(!Array.isArray(UserEntries))
        {
            UserEntries=[];
        }

        let isEnlisted =  UserEntries.some((entry)=> entry === Entry )

        if(isEnlisted)
        {
            console.log(`02-UserInput: GetUserEntry:\nEntry already enlisted`)
            errormsg =`Entry already enlisted`
            continue
        }

        // push entry to global layer variable 
        UserEntries.push(Entry);
        MenuText +=`\n${Entry}`
        console.log(`02-UserInput: GetUserEntry:\nadding : ${Entry} => ${UserEntries}`)
    }

    console.log(`02-UserInput: GetUserEntry:\nEntire is :  `)
    console.log(UserEntries)

    return  UserEntries
}


module.exports = GetUserEntry