// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Stores the {@link CurrentDate} value in {@link Meta} using the Key provided {@link Argument}.
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired key to store date value in Meta.
 * 
 * @returns {Promise<void>}
 */
async function StoreDate(Argument){
    
    let currentDate = await window?.pkvs?.load("currentDate");

    let Meta = await window?.pkvs?.load('Meta') ?? {}
    
    console.log(`01-Commands: StoreDate:\nStoring Current date => \n${currentDate}\nin variable called => ${Argument}`)


    //  if current date is null make new date 
    if(!currentDate)
    {
        let currentDateFormat = await window?.pkvs?.load("currentDateFormat") ?? "YYYY-MM-DDTHH:mm:ss.SSSZ"

        currentDate = await moment().format(currentDateFormat)
    
    }
    Meta[Argument] = currentDate

    await window?.pkvs?.store("Meta",Meta);

    return currentDate
}



module.exports = StoreDate