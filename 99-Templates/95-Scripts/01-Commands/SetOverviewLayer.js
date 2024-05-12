// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the name of the overview file (kanban)
 *
 * @async
 * @param {*} Argument
 * @returns {void}
 */
async function SetOverviewLayer (Argument){
    console.log(`01-Commands: SetOverviewLayer:\nSetting Overview Layer to ${Argument}`)
    OverviewLayer = Argument;

    // store global value
    await window?.pkvs?.store("OverviewLayer" , OverviewLayer);
}

module.exports = SetOverviewLayer