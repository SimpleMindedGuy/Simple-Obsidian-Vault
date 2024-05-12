// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Finds a directly with the provided name {@link Name}, at the path/directory  {@link Path}
 * 
 * it will match any directory that have the provided {@link Name}, even if it was numbered. 
 * 
 * if a match is found it returns a Directory(Folder) Object
 * @date 16/12/2023
 *
 * @async
 * @param {String} Name
 * @param {String} Path
 * @returns {Promise<object|null>}
 */
async function GetDirectory(Name,Path)
{

    console.log(`03-FileManagement: GetDirectory:\nlooking for a directory with the \nname: ${Name}\nat the directory ${Path}`)

    // trying to get directory @Path
    const Directory = await app.vault.getAbstractFileByPath(Path)

    // if directory dose not exist return null 
    if(!Directory)
    {
        console.warn(`03-FileManagement: GetDirectory:\nDirectory dose not exist/ could not find directory`)
        return null;
    }

    // if directory hve no children return null
    if(!Directory.children || Directory.children.length === 0 )
    {
        console.warn(`03-FileManagement: GetDirectory:\nDirectory dose not have any children`)
        return null;
    }

    // Ignore number to match name @Path
    const DirNameRegExp = new RegExp(`^(?:\\d{1,}\\ *\\-\\ *)?${Name}$`,`gm`);
    console.log(DirNameRegExp);
    
    // Loop over directory children, and find the directory with the provide Name 
    for (const dir of Directory.children)
    {
        // check if the child's name matches the required Directory Name.
        let isMatch = await DirNameRegExp.test(dir.name);

        // if there are no matches, continue to next child
        if(!isMatch)
        {
            continue
        }

        // if there are matches, return the child object 
        console.log(`03-FileManagement: GetDirectory:\nFound Directory`)
        console.log(dir)
        return dir
    }

    // if child was not found, return null
    console.log(`03-FileManagement: GetDirectory:\nDirectory ${Name} \nwas not found\n@ the path ${Path}`)
    return null
}

module.exports = GetDirectory
