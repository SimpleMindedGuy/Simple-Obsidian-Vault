// In The Name of Allah, The Most Beneficent, The Most Merciful


/**
 * Name of the folder that contains the commands files.
 *
 * Used to later look for the provided name of the {@link command} file.
 *
 *
 * @type {boolean}
 */
const CommandsFolder = "99-Commands";

/**
 * 
 * This function Looks in the for the user command folder inside the templater folder, and searches for a file with the provided name {@link command}, and then uses the commands written in that file as a function, to run on the currently open file.
 *
 * this is intended to replace buttons with simeple templater fuintion
 *
 * example : tp.user.command("MakeSubNote")
 * this should also solve the problem of trailing spaces or inserting the command's text in the current working file.
 *
 *
 * in my current implementation, this folder is called ("99-Commands").
 *
 * @async
 * @param {String} command name of the user command file that exists in the Commands folder.
 * @returns {void}
 */
async function command(command) {

  console.log("hello world, this is command file : \n", command)

  // Getting Templater object for running functions
  const tp = {}
  const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

  for (const fun of tpInternalFunctions) {
    tp[fun.name] = fun.static_object;
  }

  tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();
  tp['settings'] = await app.plugins.getPlugin('templater-obsidian').settings;

  if (!tp) {
    console.log(`00-Basic-Functions: command: \nTemplater Object not found, please make sure the Templater plugin is enabled`);
    return;
  }

  await tp.user.GV_Init();

  /// Config file commands start
  // Get the default config path
  const ConfigPath = await window.pkvs?.load("ConfigPath");
  let Meta = await window?.pkvs?.load("Meta") ?? {};

  // Read the Config file
  console.log(`00-Basic-Functions: command: \nGetting Config File `);
  let currentFile = await app.vault.getAbstractFileByPath(ConfigPath);

  await window.pkvs?.store("currentFilePath", currentFile.path);


  // use the function from the user Functions to run commands
  console.log(`00-Basic-Functions: command: \nRunning config file commands `);
  await tp.user.RunFileCommands(currentFile)

  createdKey = await window?.pkvs?.load("createdKey");

  Meta[createdKey] = await new moment().toISOString();

  /// Config file commands end

  /// Set Command environment start
  // Setting File where commands are going to run to the currently Opened file 
  currentFile = await app.workspace.getActiveFile()
  console.log(`00-Basic-Functions: command:\ncurrentFile:`, currentFile.path);
  const currentFilePath = currentFile.path;

  await window.pkvs?.store("currentFilePath", currentFilePath);
  await window.pkvs?.store("Meta", Meta);
  /// Set Command environment end


  /// Running command file start
  // Run Commands for the current file.
  // chekc if the command file exists inside the templater folder > 99-Commands folder.
  const commandFile = await app.vault.getAbstractFileByPath(`${tp.settings.templates_folder}/${CommandsFolder}/${command}.md`);
  if (!commandFile) {
    console.error(`00-Basic-Functions: command: \nCould not find commands folder or command file (nothing has changed)\n1.ensure that the passed command name matches the name of the required file.\n2.ensure that the commands  folder with the name ${CommandsFolder} exists inside templaters folder, and contains the commands files in it.`);
    return;
  }
  // Run Commands for the current file.
  await tp.user.RunFileCommands(commandFile)
  /// Running command file end


  // Remove all global keys set by the script.
  // await tp.user.GV_Clear();

  return;

}
module.exports = command
