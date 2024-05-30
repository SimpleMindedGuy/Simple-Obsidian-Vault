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
async function SetValue(Argument) {

  const Bracet = new RegExp(/((?<=\ *\[)([\u0000-\u0008|\u0010-\uffff])+(?=\ *\]$))/gm)

  console.log(`01-Commands: SetValue:\nSetting Value to the global 'value' variable`);
  let tp = await window?.pkvs?.load("tp");

  if (!tp) {
    console.log(`01-Commands: GetUserChoice:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

    // Getting Templater object for running functions
    tp = {}
    const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

    for (const fun of tpInternalFunctions) {
      tp[fun.name] = fun.static_object;
    }

    tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();


  }

  // if templater is not provided exist loop
  if (!tp) {
    console.warn(`01-Commands: GetUserChoice:\ntemplater is not provided`)
    console.warn(tp)
    return null
  }


  let func = async () => {
    return Argument.match(Bracet)
  }

  const TimeLimit = await window?.pkvs?.load("TimeLimit");

  const isValid = await tp.user.Timeout(func, TimeLimit);


  let currentValue = window?.pkvs?.load("currentValue");


  if (!isValid) {

    currentValue = Argument
    console.warn(currentValue)
    window?.pkvs?.store("currentValue", currentValue);
    return
  }

  currentValue = isValid[0].split(",");

  console.warn(currentValue)

  window?.pkvs?.store("currentValue", currentValue);
}

module.exports = SetValue
