// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the {@link createKey} to some other value.
 * @date 16/12/2023 
 *
 * @async
 * @param {string|undefined} Argument
 * @returns {Promise<void>}
 */
async function SetCreatedKey(Argument){

    
    console.log(`01-Commands: SetCreatedKey:\nSetting Created Date key/viable to ${Argument}`);

    if(!Argument)
    {

        console.warn(`01-Commands: SetCreatedKey:\nCannot set ( createdKey ) to null/undefined `)
        console.warn(Argument);
        return 
    }
    let createdKey = Argument;
    
    console.log(createdKey);
    // store global value
    await window?.pkvs?.store("createdKey" , createdKey);
}


module.exports = SetCreatedKey