// In The Name of Allah, The Most Beneficent, The Most Merciful

/**
 * Takes a function {@link CallBack} returns its results, if the function takes longer than the given {@link TimeLimit} it will stop the function, and returns an error.
 * @date 25/12/2023
 *
 * @async
 * @param {Function} CallBack
 * @param {Number} TimeLimit
 * @returns {Promise<*>}
 */
function TimeOut(CallBack,TimeLimit=5000){
    return new Promise(async(resolve,reject)=>{
        
        // console.log(`starting function timer`)
        const Exec = setTimeout(()=>{
            console.warn(`00-Basic-Functions: 00-Timeout:\nFunction timed out`)
            clearTimeout(Exec)
            
            reject(null)
        },TimeLimit)


        
        await CallBack().then(response =>{
            clearTimeout(Exec)
            resolve(response);
        }).catch(error=>{
            clearTimeout(Exec)
            console.warn(`00-Basic-Functions: 00-Timeout:\nFunction ran in into an error`)
            console.error(error)
            reject(null);
        })
    })
}
module.exports = TimeOut
