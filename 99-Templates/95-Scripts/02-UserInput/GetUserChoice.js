// In The Name of Allah, The Most Beneficent, The Most Merciful

/**
 * Displays a dialog that contains the provided {@link text}, and asks the user for a one or many chaises from the provided {@link list}, stores the user chaises in {@link Meta} using a key with the provided name {@link argument} if it is provided. and returns the user chaises.
 * @date 25/12/2023
 *
 * @async
 * @param {string} text - text for the dialog
 * @param {Array} list - list for user to choose from.
 * @param {Object} Options Set of options for how the functions works 
 * @param {boolean} Options.isMultiple - allow user to choose multiple options.
 * @param {boolean} Options.isOptional - allow user to not choice any option.
 * @param {boolean} Options.isExpanding - allows uer to add an option if the option dose not exist, in the list. 
 * @returns {Promise<string|string[]|null>}
 */
async function GetUserChoice(text,list,Options){

    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`02-UserInput: GetUserChoice:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`02-UserInput: GetUserChoice:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    const noti = new Notice(`${text}`,99999999)
    console.log(`02-UserInput: GetUserChoice:\nchoosing from menu :`)
    
    const {isExpanding,isMultiple,isOptional} = Options
    
    // Parsing the list of options
    let optionList = JSON.parse(JSON.stringify(list.toString().split(",")));
    console.log(optionList)
    // store error messages
    let errors =``;
    // check if user is in chooser state
    let isChoosing = true;
    let UserChoice
    let choices = 0

    // loop until user is not in chooser state.
    while(isChoosing)
    {
        console.log('02-UserInput: GetUserChoice:\nis choosing')


        // check if the list of options is empty.
        if(optionList.length <= 0)
        {
            console.log(`02-UserInput: GetUserChoice:\nNo options, exiting the loop`)
            // change loop boolean to false
            isChoosing =  false;
            continue;
        }
        // display a dialog using templater
        let Choice = await tp.system.suggester(optionList,optionList,false,text)
        errors =""
        
        console.log(`02-UserInput: GetUserChoice:\nChoice dis thing : ${Choice}`)
        

        // check if the user chose an option.
        if(!Choice)
        {
            

            // checks the input is mandatory.
            // if the input is mandatory then stop the script ( stopping the script only works using global values, or you have to implement you're own checks based on function's return)
            if(!isOptional)
            {
                errors ="Choice is required"
                new Notice(`${errors}`);
                await window?.pkvs?.store("BreakScript",true);
                return null
            }

            // change loop boolean to false
            console.log(`02-UserInput: GetUserChoice:\nuser exiting the loop`)


            isChoosing =  false;
            continue
        }


        // if user can only chose one option exit the loop.
        if(!isMultiple)
        {
            // change loop boolean to false
            isChoosing =  false;
            // Store choise in argument key
            UserChoice= Choice
            console.log(`02-UserInput: GetUserChoice:\nchoice :`)
            console.log(Choice)

            continue;
        }

        // if the choice is not a list
        if(!Array.isArray(UserChoice))
        {
            UserChoice = []
        }
        // Add choice to Array variable 
        UserChoice.push(Choice);
        choices++;
        // Store choice in argument key
        console.log(`02-UserInput: GetUserChoice:\nchoice : ${Choice}\nChosen options `);
        console.log(UserChoice);

        console.log(`02-UserInput: GetUserChoice:\nremoving choice from menu`);
        let Index = optionList.indexOf(Choice);
        optionList.splice(Index,1);

        console.log(`02-UserInput: GetUserChoice:\nnew menu `);
        console.log(optionList);
        text += `\n- ${Choice}`

        noti.setMessage(`${text}\n${errors}`);


    }

    // if use can dd to the list.
    if(isExpanding)
    {
        console.log(`02-UserInput: GetUserChoice:\nChoise is expanding`)
        text += `\nAdd Item/s if you could not find them`; 
        noti.setMessage(text)

        // get user input 
        // pass the same options to the function.
        let Expanding = await tp.user.GetUserEntry(text,isMultiple,isOptional)

        console.log(`02-UserInput: GetUserChoice:\nExpanding list is `)
        console.log(Expanding)

        // if the user added nothing, set expanding list as an empty list (array) 
        if(!Expanding)
        {
            Expanding =[]
            console.log(`02-UserInput: GetUserChoice:\nExpanding is null convert to empty array `)
            console.log(Expanding)
        }
        // if the user chosen nothing, set choices list as add an empty list (array) 
        if(!UserChoice)
        {
            UserChoice =[]
            console.log(`02-UserInput: GetUserChoice:\nUserChoice is null convert to empty array `)
            console.log(UserChoice)
        }
        
        // if the expanding value is not an array, put it in array
        if(!Array.isArray(Expanding)){
            Expanding = [Expanding]
            console.log(`02-UserInput: GetUserChoice:\nExpanding is not an array convert to array `)
            console.log(Expanding)
        }

        // if the choices value is not an array, put it in array
        if(!Array.isArray(UserChoice))
        {
            UserChoice = [UserChoice]
            console.log(`02-UserInput: GetUserChoice:\nUserChoice is not an array convert to array `)
            console.log(UserChoice) 
        }
        // combine both Lists into on list, without duplicates.
        UserChoice =  [...new Set([ ...UserChoice , ...Expanding])]
        
    }

    console.log(`02-UserInput: GetUserChoice:\nUser choice is :`)
    console.log(UserChoice)

    // hide current interface options
    setTimeout(noti.hide(),TimeLimit)

    return UserChoice

}


module.exports = GetUserChoice
