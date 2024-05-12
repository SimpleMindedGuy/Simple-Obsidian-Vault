// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the {@link modifiedKey} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @returns {Promise<void>}
 */
async function SetModifiedKey(Argument){
    console.log(`01-Commands: SetModifiedKey:\nSetting Modified Date key/variables to ${Argument}`);

    if(!Argument)
    {

        console.warn(`01-Commands: SetModifiedKey:\nCannot set ( modifiedKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }
    let modifiedKey = Argument;
    console.log(modifiedKey);
    // store global value
    await window?.pkvs?.store("modifiedKey" , modifiedKey);
}

module.exports = SetModifiedKey