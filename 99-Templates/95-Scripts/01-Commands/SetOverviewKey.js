// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the key that is going to be edited when the cards are moved from one list to another in the Overview File (kanban).
 *
 * @async
 * @param {*} Argument
 * @returns {void}
 */
async function SetOverviewKey (Argument){
    console.log(`01-Commands: SetOverviewKey:\nSetting Overview Key to ${Argument}`)
    OverviewKey = Argument;
    // store global value
    await window?.pkvs?.store("OverviewKey" , OverviewKey);

}
module.exports = SetOverviewKey