// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the {@link titleKey} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @returns {Promise<void>}
 */
async function SetTitleKey(Argument){
    console.log(`01-Commands: SetTitleKey:\nSetting Title Date key/variable to ${Argument}`);

    if(!Argument)
    {
        console.warn(`01-Commands: SetTitleKey:\nCannot set ( titleKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }

    let titleKey = Argument;
    console.log(titleKey);
    // store global value
    await window?.pkvs?.store("titleKey" , titleKey);
    
}

module.exports = SetTitleKey