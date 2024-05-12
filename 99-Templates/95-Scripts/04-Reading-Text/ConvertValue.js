// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Takes String and "tries" to convert them to the appropriate type.
 * 
 * 
 * @date 28/12/2023 - 23:30:19
 * 
 * @async
 * @param {String[]|String} Value - the provided value to convert 
 * @returns {Promise<*>} - Could be anything.
 */
async function ConvertValue(Value)
{

    if(!Value)
    {
        return null
    }

    let trueRegExp = RegExp(/true/i)
    let falseRegExp = RegExp(/false/i)
    if(Array.isArray(Value))
    {
        let Arr =[]

        for(const val of Value)
        {

            let isTrue = val.match(trueRegExp);
            if(isTrue)
            {
                Arr.push(true);
                continue
            }

            let isFalse = val.match(falseRegExp)
            if(isFalse)
            {
                Arr.push(false);
                continue
            }

            let parse = parseFloat(val)
            
            if(await !isNaN(parse))
            {
                Arr.push(parse)
                continue
            }

            let dateVal = await moment(val).isValid()
            if(dateVal)
            {
                Arr.push(await moment(val).format("YYYY-MM-DDTHH:mm:ssZ"))
            }
                    
            Arr.push(val)
        }
        return Arr
    }

    let val = Value

    let isTrue = Value.match(trueRegExp);
    if(isTrue)
    {
        return true
    }
    let isFalse = Value.match(falseRegExp);
    if(isFalse)
    {
        return false
    }

    let parse = parseFloat(Value)

    const whiteSpaceRegExp= RegExp(/\ */gm);

    
    if(!isNaN(parse) && parse.toString().replace(whiteSpaceRegExp,"").length == Value.replace(whiteSpaceRegExp,"").length)
    {
        return parse
    }

    let dateVal = await moment(Value).isValid()
    if(dateVal)
    {

        return await moment(Value).format("YYYY-MM-DDTHH:mm:ssZ");
    }

    return val
}


module.exports = ConvertValue;