// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Creates a directory with the provided name {@link Name}.
 * 
 * At the directory {@link Path}.
 * 
 * 
 * @date 16/12/2023 - 20:04:33
 *
 * @param {string} Name - Directory name
 * @param {string} Path - Path where The Directory should be (created/placed) at. 
 * @returns {Promise<object|null>}
 */
async function CreateDirectory(Name,Path)
{
    
    console.log(`03-FileManagement: CreateDirectory: \nMaking a directory with the name ${Name} at ${Path}`);
    const isSuccessful = await app.vault.createFolder(`${Path}/${Name}`)
    .then((file)=>{
        console.log(`03-FileManagement: CreateDirectory: \nSuccessfully created directory at \n${Path}/${Name}`)
        return file
    })
    .catch((error)=>{
        console.warn(`03-FileManagement: CreateDirectory: \nFailed to make a Directory.\nerror : `)
        console.warn(error)
        return false
    })

    return isSuccessful
}

module.exports = CreateDirectory
