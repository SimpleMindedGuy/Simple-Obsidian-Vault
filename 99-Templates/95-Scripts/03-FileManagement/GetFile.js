// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Finds a file with the provided name {@link Name}, at the path/directory  {@link Path}
 * 
 * it will match any file that have the provided {@link Name}, even if it starts with a number that matches this expression  00-{@link Name}. 
 * 
 * if a match is found it returns a Directory(Folder) Object
 * @date 16/12/2023
 *
 * @async
 * @param {String} Name - Name of desired file.
 * @param {String} Path - Path to directory to search.
 * @returns {Promise<object|null>}
 */
async function GetFile(Name,Path)
{

    console.log(`03-FileManagement: GetFile:\nlooking for a directory with the \nname :${Name}\nat the directory ${Path}`)

    const Directory = await app.vault.getAbstractFileByPath(Path)

    console.log(`03-FileManagement: GetFile:\nDirectory`)
    console.log(Directory)

    if(!Directory)
    {
        console.warn(`03-FileManagement: GetFile:\nFile dose not exist/ could not find directory`)
        return null;
    }

    if(Directory.children.length === 0 )
    {
        console.warn(`03-FileManagement: GetFile:\nFile dose not have any children`)
        return null;
    }

    
    const DirNameRegExp = new RegExp(`^(?:\\d{1,}\\ *\\-)?${Name}\\.md$`,`gmi`);
    console.log(DirNameRegExp);
    
    for (const file of Directory.children)
    {
        let isMatch = await DirNameRegExp.test(file.name);

        console.log(isMatch)
        if(!isMatch)
        {
            continue
        }

        console.log(`03-FileManagement: GetFile:\nFound File`)
        console.log(file)
        return file
    }

    console.log(`03-FileManagement: GetFile:\nFile : ${Name} \nwas not found\nin the path ${Path}`)
}

module.exports = GetFile
