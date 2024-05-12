// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Adds a Link to the provided {@link file} to the first list of the provided {@link Kanban} if exists.
 * 
 * 
 * @date 18/12/2023
 * @async
 * @param {object} file - The Document to Link to.
 * @param {object} Kanban - The kanban that the {@link file} is going to be added to.
 * @returns {Promise<boolean>}
 */
async function AddDocumentToKanban(file,Kanban){

    // Getting Templater object for running functions
    let tp = await window?.pkvs?.load("tp");



    if(!tp)
    {
        console.log(`05-Writing-text: AddDocumentToKanban:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`05-Writing-text: AddDocumentToKanban:\ntemplater is not provided`)
        console.warn(tp)
        return
    }
    
    if(!file)
    {
        console.warn(`05-Writing-text: AddDocumentToKanban:\nNo file provied`)
        console.warn(file)
        return  false
    }

    if(!Kanban)
    {
        console.warn(`05-Writing-text: AddDocumentToKanban:\nCannot add File to overview\bOverview dose not exist`)
        console.warn(Kanban)
        return false
    }


    let Text = await app.vault.read(Kanban);

    const ListRegExp = new RegExp(/\#{2}\ .+/gm);
    const FileExtensionRegExp = new RegExp(/(?<=^.*)\..+$/gm)


    let func =  async ()=>
    { 
        return Text.match(ListRegExp);
    }

    const isMatch = await tp.user.Timeout(func,TimeLimit)
    

    if(!isMatch)
    {
        console.warn(`05-Writing-text: AddDocumentToKanban:\nCould match find overview List`)
        console.warn(isMatch)
        return false
    }

    let filePath = await file.path.replace(FileExtensionRegExp,"");
    let fileName = await file.name.replace(FileExtensionRegExp,"");

    Text = Text.replace(isMatch[0],`${isMatch[0]}\n- [ ] [[${filePath}|${fileName}]]`)


    console.log(`05-Writing-text: AddDocumentToKanban:\nAdded file to overview`)
    // console.log(Text)

    func =  async ()=>
    { 
        return app.vault.modify(
        Kanban,
        Text
        )
        .then(()=>{
            console.log(`05-Writing-text: AddDocumentToKanban:\nsuccessfully added new card to Overview`)
            return true
        })
        .catch(()=>{
            console.warn(`05-Writing-text: AddDocumentToKanban:\nfailed to add new card to Overview`)
            return false
        })
    }
    
    return await tp.user.Timeout(func,TimeLimit)
}
module.exports = AddDocumentToKanban