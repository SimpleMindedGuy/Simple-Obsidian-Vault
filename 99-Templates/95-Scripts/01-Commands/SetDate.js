// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * takes a date value {@link Argument}, reads it in  the format {@link currentDateFormat} and then sets the date value to {@link currentDate}. 
 * 
 * - if the provided Date value is not valid according to the format, the function will do nothing.
 * - if the provided Date value is valid accoding the to the format, then the {@link currentDate} will be set to the date vaule, in an ISO format.
 * - if there is not date value provided, then the {@link currenDate} is set to a new date value in an ISO format.
 * 
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired date value.
 * @param {string} [DateFormat] - optional value for adding the date format, this would OverRide global value of {@link currentDateFormat}
 * @returns {Promise<void>}
 */
async function SetDate(Argument , DateFormat){
    
    console.log(`01-Commands: SetDate:\nSetting Current date value to  ${Argument}`)



    let currentDate
    // if date is not provided use global value
    // if said global value does not exist, use ISO format
    let currentDateFormat = DateFormat ?? await window?.pkvs?.load("currentDateFormat") ?? "YYYY-MM-DDTHH:mm:ss.SSSZ"


    // if there is no argument provided, make a new date, and return.
    if(!Argument)
    {
        currentDate = await moment(Argument).format(currentDateFormat)
        console.warn(`01-Commands: SetDate:\nno date provided`)
        console.warn(`01-Commands: SetDate:\nSetting Current date value to a new date `)
        console.warn(currentDate)
        return currentDate
    }
    let isValid = moment(Argument, currentDateFormat).isValid();
    
    if(!isValid)
    {
        console.warn(`01-Commands: SetDate:\nDate provided is not valid for current Date format\nProvided Date : ${Argument}\nCurrent Format : ${currentDateFormat}`)
        console.warn(`01-Commands: SetDate:\nthe date will be read using moment(Date)`)

        currentDate = await moment(Argument)

        await window?.pkvs?.store("currentDate", currentDate);

        return currentDate
        
    }
    currentDate =  Argument ? await moment(Argument).format(currentDateFormat) : new moment().format(currentDateFormat) ;

    console.log(`01-Commands: SetDate:\nSetting Current date value to a new date `)
    console.log(currentDate)

    await window?.pkvs?.store("currentDate", currentDate);

    return currentDate
    
}

module.exports = SetDate