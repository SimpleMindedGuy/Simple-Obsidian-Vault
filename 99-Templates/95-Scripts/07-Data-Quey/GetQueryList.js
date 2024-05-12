// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Gets an list/array of all the values of the {@link SearchKey}, using the {@link SearchQuery}
 * Stores that list/array in {@link Value}
 * @date 02/02/2024 - 21:12:08
 * @param {String} SearchQuery The query of the Search 
 * @param {String} SearchKey The requested Value to be returned
 * @async
 * @returns {Promise<Object[]|null>}
 */
async function GetQueryList(SearchQuery,SearchKey)
{
    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`07-Data-Quey: GetQueryList:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`07-Data-Quey: GetQueryList:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    let Dataview =  await app.plugins.plugins["dataview"].api;

    let List = [];


    if(!Dataview)
    {
        console.warn(`07-Data-Quey: GetQueryList:\ndataview was not provided, install dataview to be able to use "GetQueryList" command.`)
        new Notice(`dataview was not provided, install dataview to be able to use "GetQueryList" command.`,20000)
        return null
    }
    
    if(SearchQuery == ""|| !SearchQuery)
    {
        console.warn(`07-Data-Quey: GetQueryList:\nQuery is was not provided, cannot query nothing, if you want to query all files provide directly\nUsing the command: \nSetSearchQuery :=> Query\nusing the following format \n("<directory>") or ("/")\n
        please note that parenthesis are required`);
        new Notice(`Query is was not provided, cannot query nothing, if you want to query all files provide directly \nusing the following format \n("<directory>") or ("/")\n
        please note that parenthesis are required`,20000);
        return null
    }

    if(SearchQuery == ""|| !SearchQuery)
    {
        console.warn(`07-Data-Quey: GetQueryList:\nQuery key is not provided the script dose not know what query to search for\nUse the command\nSetSearchKey :=> key\nto set hte query key.`);
        new Notice(`Query key is not provided the script dose not know what query to search for\nUse the command\nSetSearchKey :=> key\nto set hte query key.`,20000)
        return null
    }

    console.log(`07-Data-Quey: GetQueryList:\nStarting a Search Query\nSearchQuery is : ${SearchQuery}\n SearchKey is : ${SearchKey}`)


    let Pages = await Dataview
    .pages(`${SearchQuery}`)
    // .where(p => p[`🗓️`] > `2022/09/19`)

    for (const page of Pages)
    {
        // console.log(page[`${SearchKey}`])
        
        if(!page || !page[`${SearchKey}`] || page[`${SearchKey}`] == '')
        {
            continue
        }
        if(Array.isArray(page[`${SearchKey}`]))
        {
            List = [...new Set([ ...List , ...page[`${SearchKey}`] ])]
            continue
        }

        List.push(page[`${SearchKey}`]);

    }
    List = [...List].filter((item) => item!== undefined && item!== null && item!== '')
    console.log(`07-Data-Quey: GetQueryList:\nQuery List is : `)
    console.log(List)
    
    return List
}
module.exports = GetQueryList