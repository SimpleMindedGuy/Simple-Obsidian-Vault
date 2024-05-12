// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the {@link dialog} to some other value
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @param {object|null} tp
 * @returns {Promise<void>}
 */
async function Dialog(Argument){
    console.log(`01-Commands: 08-Dialog:\nSetting next Dialog to`);
    console.log(Argument);

    if(!Argument)
    {
        console.warn(`01-Commands: 08-Dialog:\ncannot set dialog to null`)
        console.warn(Argument)
        return 
    }

    const WhiteSpaceRegExp = new RegExp(/^\ +|\ {2,}|\ +$/gm)
    const NewLineRegExp = new RegExp(/^\n+|\n{2,}|\n+$/gm)

    let dialog = await Argument.replace(NewLineRegExp,"").replace(WhiteSpaceRegExp,"");

    // store global value
    await window?.pkvs?.store("dialog" , dialog);

    
}

module.exports = Dialog