// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Stores the {@link currentValue} value in {@link Meta} using a key/variable provided in {@link Argument}.
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - They of which to store the value in the global variable {@link Meta}
 * 
 * @returns {Promise<void>}
 */
async function StoreValue(Argument){

    let Meta = await window?.pkvs?.load('Meta') ?? {}

    let currentValue = await window?.pkvs?.load('currentValue') ?? null
    
    console.log(`01-Commands: StoreValue:\nStoring Value =>\n${currentValue}\nin a key/variable called => ${Argument}`)


    Meta[Argument] = currentValue;

    await window?.pkvs?.store("Meta",Meta);

}

module.exports = StoreValue
