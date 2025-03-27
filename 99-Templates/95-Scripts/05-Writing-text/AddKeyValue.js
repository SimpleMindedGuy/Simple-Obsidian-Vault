// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Replaces keys  that the expression : "!(key)", in the {@link File}'s text, that matches keys in {@link Values}, with corresponding value in {@link Values} for each key.
 * @date 25/12/2023
 *
 * @async
 * @param {object} Values - Object containing the values to be written
 * @param {object} File - File object.
 * @returns {Promise<object>}
 */
async function AddKeyValue(Values, File) {
  // Getting Templater object for running functions
  let tp = await window?.pkvs?.load("tp");

  if (!tp) {
    console.log(
      `05-Writing-text: AddKeyValue:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`
    );

    // Getting Templater object for running functions
    tp = {};
    const tpInternalFunctions = await app.plugins.getPlugin(
      "templater-obsidian"
    ).templater.functions_generator.internal_functions.modules_array;

    for (const fun of tpInternalFunctions) {
      tp[fun.name] = fun.static_object;
    }

    tp["user"] = await app.plugins
      .getPlugin("templater-obsidian")
      .templater.functions_generator.user_functions.user_script_functions.generate_object();
  }

  // If templater is not provided exist loop
  if (!tp) {
    console.warn(`05-Writing-text: AddKeyValue:\ntemplater is not provided`);
    console.warn(tp);
    return;
  }

  // reading File
  let Text = await app.vault.read(File);

  console.log(
    `05-Writing-text: AddKeyValue:\nLooking for Inline Values in File `
  );
  console.log(File);

  // Find key to match for values
  const KeysRegExp = new RegExp(
    /\!\([\u0000-\u0009|\u0010-\u0029|\u0030-\uffff]+\)/gm
  );

  let func = async () => {
    return Text.match(KeysRegExp);
  };

  const isKeys = await tp.user.Timeout(func, TimeLimit);

  // if there is no keys found then return the original text
  if (!isKeys) {
    return File;
  }


  for (const [key, value] of Object.entries(Values)) {
    const keyRegExp = new RegExp(`\\!\\(${key}\\)`, 'gm');

    const isMatch = Text.match(keyRegExp)

    func = async () => {
      return Text.match(keyRegExp);
    };

    if (!isMatch) {
      continue;
    }
    Text = await Text.replace(keyRegExp, value);

    console.log(`05-Writing-text: AddKeyValue:\nreplacing value/s for \nkey\t:\t${key}\nExpression :\n`, keyRegExp, `\nvalue\t:\t`, value);
    // console.log(`05-Writing-text: AddKeyValue:\nreplacing value/s for \nkey\t:\t${key}\nvalue\t:\t`, value, `\nReplaced Text : \n`, Text)

  }

  func = async () => {
    return app.vault
      .modify(File, Text)
      .then((f) => {
        console.log(`05-Writing-text: AddKeyValue:\nAdded MetaData`);
        // new Notice("Added description MetaData");
        // return f
      })
      .catch((err) => {
        console.warn(err);
        console.warn(`05-Writing-text: AddKeyValue:\nFailed to add MetaData`);
        // new Notice("Failed to add description MetaData");
      });
  };

  await tp.user.Timeout(func, TimeLimit);

  return File;
}

module.exports = AddKeyValue;
