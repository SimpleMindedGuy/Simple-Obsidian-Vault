// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the {@link parentKey} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @returns {Promise<void>}
 */
async function SetParentKey(Argument){
    console.log(`01-Commands: SetParentKey:\nSetting Parent Date key/variable to ${Argument}`);

    if(!Argument)
    {
        console.warn(`01-Commands: SetParentKey:\nCannot set ( parentKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }
    let parentKey = Argument;
    console.log(parentKey);
    // store global value
    await window?.pkvs?.store("parentKey" , parentKey);
}



module.exports = SetParentKey
