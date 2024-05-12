// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Sets the {@link currentValue} value to provided {@link Argument}.
 * 
 * 
 * @date 16/12/2023
 *
 * @async
 * @param {string} Argument - the desired new value 

 * 
 * @returns {Promise<void>}
 */
async function SetValue(Argument){

    const Bracet= new RegExp(/((?<=\ *\[)([\u0000-\u0008|\u0010-\uffff])+(?=\ *\]$))/gm)

    console.log(`01-Commands: SetValue:\nSetting Value to the global 'value' variable`)

    let  func = async()=>
    { 
        return Argument.match(Bracet)
    }

    const isValid = await TimeoutAfter(func,TimeLimit)


    let currentValue = window?.pkvs?.load("currentValue");


    if(!isValid)
    {
        
        currentValue = Argument
        console.warn(currentValue)
        window?.pkvs?.store("currentValue" , currentValue);
        return
    }
    
    currentValue = isValid[0].split(",");

    console.warn(currentValue)

    window?.pkvs?.store("currentValue" , currentValue);
}

module.exports = SetValue
