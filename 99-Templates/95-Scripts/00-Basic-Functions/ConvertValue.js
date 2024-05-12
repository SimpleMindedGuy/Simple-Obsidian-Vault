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

    // console.log(`converting value`)
    // console.log(Value)
    if(!Value)
    {
        return null
    }

    let trueRegxep = RegExp(/true/i)
    let falseRegxep = RegExp(/false/i)
    if(Array.isArray(Value))
    {
        // console.log(`value is an array`)
        let Arr =[]

        for(const val of Value)
        {

            let istrue = val.match(trueRegxep);
            if(istrue)
            {
                Arr.push(true);
                continue
            }

            let isfalse = val.match(falseRegxep)
            if(isfalse)
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

            let datt = await moment(val).isValid()
            if(datt)
            {
                Arr.push(await moment(val).format("YYYY-MM-DDTHH:mm:ssZ"))
            }
                    
            Arr.push(val)
        }
        // console.log(`Val`)
        // console.log(Arr)
        return Arr
    }

    let val = Value

    // console.log(`not an array `)
    // console.log(`Val`)
    // console.log(Value)
    let istrue = Value.match(trueRegxep);
    if(istrue)
    {
        // console.log(`is bool`)
        return true
    }
    let isfalse = Value.match(falseRegxep);
    if(isfalse)
    {
        // console.log(`is bool`)
        return false
    }

    let parse = parseFloat(Value)

    const whiteSpaceRegExp= RegExp(/\ */gm);

    
    if(!isNaN(parse) && parse.toString().replace(whiteSpaceRegExp,"").length == Value.replace(whiteSpaceRegExp,"").length)
    {
        console.log(`is number`)
        console.log(parse)
        return parse
    }

    let datt = await moment(Value).isValid()
    if(datt)
    {
        // console.log(`is Date`);
        // console.log(await moment(Value).format("YYYY-MM-DDTHH:mm:ssZ"));

        return await moment(Value).format("YYYY-MM-DDTHH:mm:ssZ");
    }

    // console.log(`string`);
    // console.log(val);
    return val
}
module.exports = ConvertValue;