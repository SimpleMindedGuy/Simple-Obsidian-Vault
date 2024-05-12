// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the {@link currentDateFormat} value to the provided {@link Argument} 
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired date value.
 * 
 * @returns {Promise<void>}
 */
async function SetDateFormat(Argument){

    console.log(`01-Commands: SetDateFormat:\nSetting Date format to => ${Argument}`)


    let currentDateFormat = await window?.pkvs?.load("currentDateFormat");

    
    currentDateFormat = Argument
    
    await window?.pkvs?.store("currentDateFormat",Argument);

    return currentDateFormat

}

module.exports = SetDateFormat