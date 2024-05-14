// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Takes a list of tempaltes {@link TemplateList}, Asks the user adding optional templates, and adds the default template.
 * 
 * @date 18/12/2023
 * @async
 * @param {object} TemplateList - The list of tmeplate to search.
 * @param {boolean} isMultiTemplate - If the user can choose multiple templates
 * @returns {Promise<object[]|null>}
 */
async function GetOptionalTemplates(TemplateList,isMultiTemplate){

    let tp = await window?.pkvs?.load("tp");
    let TimeLimit = await window?.pkvs?.load("TimeLimit") ?? 3000;

    if(!tp)
    {
        console.log(`06-Utility Specific: MakeBuildPath:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`06-Utility Specific: MakeBuildPath:\ntemplater is not provided`)
        console.warn(tp)
        return null
    }



    let Templates = [];
    let OptionList = []
    
    const DefaultRegExp = await RegExp(/^(Description|Default) (?:Template)\.(md)$/gm)

    console.log(`06-Utility Specific: GetOptionalTemplates:\nChoosing templates form @ :`);

    let defaultIndex ;

    let text = `Optional Templates`;

    for(const Temp in TemplateList)
    {
        console.log(TemplateList[Temp])
        const isDefault = await TemplateList[Temp].name.match(DefaultRegExp)

        if(isDefault)
        {
            defaultIndex = Temp
            continue
        }
        await OptionList.push(TemplateList[Temp].name)
        

    }
    if(defaultIndex)
    {
        text += `\n- ${TemplateList[defaultIndex].name}`
        Templates.push(TemplateList[defaultIndex])
        TemplateList.splice(defaultIndex,1)
    }

  

    let isChoosing = true;
    let errors=""
    
    const noti = new Notice(`06-Utility Specific: GetOptionalTemplates:\n${text}`,99999999)


    console.log(`06-Utility Specific: GetOptionalTemplates:\nuser is choosing`)
    while(isChoosing)
    {
        console.log(`06-Utility Specific: GetOptionalTemplates:\nlists`)
        console.log(TemplateList)
        console.log(OptionList)

        if(TemplateList.length == 0)
        {
            console.log(`06-Utility Specific: GetOptionalTemplates:\nNo more options, exiting the loop`)
            // change loop boolean to false
            isChoosing =  false;
            continue;
        }
   

        let Choice = await tp.system.suggester(OptionList,TemplateList,false,`Optional Templates`)
        errors =""

        let index = await OptionList.indexOf(Choice);

        TemplateList.indexOf(TemplateList)
        console.log(`06-Utility Specific: GetOptionalTemplates:\nChoose : ${Choice}`)

        if(Choice === '' || Choice == undefined)
        {
            console.log(`06-Utility Specific: GetOptionalTemplates:\nuser exiting the loop`)
            // change loop boolean to false
            isChoosing =  false;
            continue;
        }
        

        // if the choice is out of bounds re run the loop with a error message
        if(Choice < 0 || Choice > TemplateList.length - 1)
        {
            console.log(`06-Utility Specific: GetOptionalTemplates:\nChoice is out of bound`)
            errors = "input cannot be lower than 0 or greater than the number of options"
            continue
        }
        
        await Templates.push(Choice)

        text += `\n- ${Choice.name}`

        if(!isMultiTemplate)
        {
            break
        }
        await TemplateList.splice(index-1,1)
        await OptionList.splice(index-1,1)

        noti.setMessage(`06-Utility Specific: GetOptionalTemplates:\n${text}\n${errors}`);


    }

    setTimeout(noti.hide(),TimeLimit)
    

    return Templates ;

}
module.exports = GetOptionalTemplates;