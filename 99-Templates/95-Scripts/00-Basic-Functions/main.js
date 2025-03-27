// In The Name of Allah, The Most Beneficent, The Most Merciful

/**
 * @date 16/12/2023 
 *
 * @typedef {string} createdKey - Stores the Name of variable/key that will be used to store the Created date of a document
 * @typedef {string} modifiedKey - Stores the Name of variable/key that will be used to store the date of which the document was last modified.
 * 
 * @typedef {string} titleKey - Stores the Name of variable/key that will be used to store the Title of the document.
 * 
 * @typedef {string} parentKey - Stores the Name of variable/key that will be used to store a link to the parent document of the document.
 * 
 * @typedef {string|null} OverviewKey - Stores the Name of variable/key that will be used to specify which key is used to link the Overview File, with the documents associated with that overview file.
 * @typedef {string|null} OverviewLayer - Stores the Name of layer of which the overview file will be made at.
 */
let createdKey = "Created",
  modifiedKey = "Modified",
  titleKey = "Title",
  parentKey = "Parent",
  OverviewKey = null,
  OverviewLayer = null;

/**
 * @async 
 * 
 * @param {?boolean} Active  Active file
 * - {true} : read the active file, and ignore the NewDocument File
 * - {false} : read the newDocument File
 */
async function main(Active) {

  // setting default values for global keys

  // Getting Templater object for running functions
  const tp = {}
  const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

  for (const fun of tpInternalFunctions) {
    tp[fun.name] = fun.static_object;
  }

  tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();

  if (!tp) {
    console.log(`00-Basic-Functions: main: \nTemplater Object not found, please make sure the Templater plugin is enabled`);
    return;
  }

  // initialising Global variables.
  await tp.user.GV_Init();

  // Get the default config path
  const ConfigPath = await window.pkvs?.load("ConfigPath");
  let Meta = await window?.pkvs?.load("Meta") ?? {};

  // Read the Config file
  console.log(`00-Basic-Functions: main: \nGetting Config File `);
  let currentFile = await app.vault.getAbstractFileByPath(ConfigPath);

  await window.pkvs?.store("currentFilePath", currentFile.path);


  // use the function from the user Functions to run commands
  console.log(`00-Basic-Functions: main: \nRunning config file commands `);
  await tp.user.RunFileCommands(currentFile)

  createdKey = await window?.pkvs?.load("createdKey");

  Meta[createdKey] = await new moment().toISOString();

  await window.pkvs?.store("Meta", Meta);

  if (!Active) {
    // getting the path for new document
    let NewDocumentPath = await window.pkvs?.load("NewDocumentPath")
    // Reading the NewDocument file
    console.log(`00-Basic-Functions: main: \nreading the New Document file`)
    currentFile = await app.vault.getAbstractFileByPath(NewDocumentPath)

    // run Commands for the current file.
    await window.pkvs?.store("currentFilePath", currentFile.path);
    await tp.user.RunFileCommands(currentFile, tp)

    // Make sure that the Meta value is synced.
    Meta = await window.pkvs?.load("Meta");
    console.warn("00-Basic-Functions: main: \nMeta")
    console.warn(Meta)

    return
  }

  // Reading the current active file, and storing the value in global key ( for other scripts to access it later on.)
  currentFile = await app.workspace.getActiveFile()
  await window.pkvs?.store("currentFilePath", currentFile.path);

  console.warn(`00-Basic-Functions: main: \nReading active file `)


  // Run Commands for the current file.
  await tp.user.RunFileCommands(currentFile)

  // Make sure that the Meta value is synced.
  Meta = await window.pkvs?.load("Meta");
  console.warn(`00-Basic-Functions: main: \nMeta`);
  console.warn(Meta);


  // Remove the Command Block form the current file
  await tp.user.RemoveCommandBlock(currentFile)

  // Remove all global keys set by the script.
  await tp.user.GV_Clear();
}
module.exports = main
