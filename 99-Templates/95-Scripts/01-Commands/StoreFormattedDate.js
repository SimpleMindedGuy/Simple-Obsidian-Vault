// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Stores the {@link CurrentDate} value formatted using {@link currentDateFormat} in {@link Meta} using the Key provided {@link Argument}.
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired key to store date value in Meta.
 * @param {string} [DateFormat] - optional value for adding the date format, this would OverRide global value of {@link currentDateFormat}

 * @returns {Promise<void>}
 */
async function StoreFormattedDate(Argument,DateFormat){

    // use provided date format, if not provided get date formate global key, if not use ISO format
    let currentDateFormat = DateFormat ?? await window?.pkvs?.load("currentDateFormat") ?? "YYYY-MM-DDTHH:mm:ss.SSSZ"

    // use global value for current date
    let currentDate = await window?.pkvs?.load("currentDate") ?? await moment().format(currentDateFormat);


    console.log(`01-Commands: StoreFormattedDate:\nStoring Current date => ${currentDate} \nwith format : ${currentDateFormat}  \nin a key/variable ${Argument}`)

    // just in case that current date is still null
    if(!currentDate)
    {
        currentDate = await moment().format("YYYY-MM-DDTHH:mm:ssZ");
    }

    // make new formatted date using the current date value and current date format
    const formattedDate =  await moment(currentDate).format(currentDateFormat) ;

    let Meta = await window?.pkvs?.load('Meta') ?? {}

    // add the value to meta
    Meta[Argument] = formattedDate;


    await window?.pkvs?.store('Meta',Meta) 

    console.log(`01-Commands: StoreFormattedDate:\nStoring Current date => ${currentDate}\nusing format => ${currentDateFormat}\nin variable called \n${Argument}\nStoring Text date in  ${Argument} =>  ${Meta[Argument]}`)

    return formattedDate

}

module.exports = StoreFormattedDate
