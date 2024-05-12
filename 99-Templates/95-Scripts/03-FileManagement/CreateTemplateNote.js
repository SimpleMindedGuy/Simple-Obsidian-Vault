// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Creates a Note with a the provided Name : {@link Name}, @ the provided path {@link Directory}, using the provided Template {@link Template}.
 * 
 * 
 * @date 16/12/2023
 *
 * @param {string} Name - Name of the note.
 * @param {object} Directory - folder Object that will contain the note.
 * @param {object} Template - The path to the template used to make this note. 
 * @param {boolean} [Open] - Opens the file after the file is created.
 * @returns {Promise<object|null>}
 */
async function CreateTemplateNote(Name,Directory,Template,Open){

    console.log(`03-FileManagement: CreateTemplateNote:\nCreating a Note \n@:${Directory.path}\nwith the name ${Name}\nUsing The Template : ${Template.path}`)

    // Getting Templater object for running functions


    let tp = await window?.pkvs?.load("tp");

    if(!tp)
    {
        console.log(`03-FileManagement: CreateTemplateNote:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
        console.warn(`03-FileManagement: CreateTemplateNote:\ntemplater is not provided`)
        console.warn(tp)
        return
    }

    const isSuccessful = await tp.file.create_new(
        Template,
        Name,
        Open ?? false,
        Directory
    )
    .then(async(file)=>{
        console.log(file);
        console.log(`03-FileManagement: CreateTemplateNote:\nSuccessfully created note at \n${Directory.path}/${Name}.`)
        return file
    })
    .catch(async(error)=>{
        console.warn(`03-FileManagement: CreateTemplateNote:\nFailed to create note.`);
        console.warn(error);
        return null
    })


    return isSuccessful

}


module.exports = CreateTemplateNote
