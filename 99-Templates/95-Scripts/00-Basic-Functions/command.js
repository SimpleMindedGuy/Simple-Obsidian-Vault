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

  // chekc if the command file exists inside the templater folder > 99-Commands folder.
  const commandFile = await app.vault.getAbstractFileByPath(`${tp.settings.templates_folder}/${CommandsFolder}/${command}.md`);


  if (!commandFile) {

    console.error(`00-Basic-Functions: command: \nCould not find commands folder or command file (nothing has changed)\n1.ensure that the passed command name matches the name of the required file.\n2.ensure that the commands  folder with the name ${CommandsFolder} exists inside templaters folder, and contains the commands files in it.`);
    return;
  }


  // Reading the current active file, and storing the value in global key ( for other scripts to access it later on.)
  const currentFile = await app.workspace.getActiveFile()
  await window.pkvs?.store("currentFilePath", currentFile.path);

  console.warn(`00-Basic-Functions: command: \nReading active file.`)
  const FileText = await app.vault.read(currentFile)

  // Run Commands for the current file.
  await tp.user.RunFileCommands(currentFile)

  // Make sure that the Meta value is synced.
  Meta = await window.pkvs?.load("Meta") ?? {};
  console.warn(`00-Basic-Functions: command: \nMeta`);
  console.warn(Meta);

  // Remove the Command Block form the current file
  await tp.user.RemoveCommandBlock(currentFile)

  // Remove all global keys set by the script.
  await RemoveDefaultsForGlobalValues()


  console.log(`00-Basic-Functions: command:\nReading file: ${File.name}`);

  FileText = await app.vault.read(File);
  console.log(FileText);
  console.log(
    `/////////////////////\n00-Basic-Functions: command:\nReading file CommandBlock`
  );

  const FileCommandsBlock = await tp.user.GetCommandsBlock(FileText);

  console.log(FileCommandsBlock);

  console.log(
    `/////////////////////\n00-Basic-Functions: command:\nReading file Commands`
  );

  const CommandLines = await tp.user.GetCommandLines(FileCommandsBlock);

  console.log(CommandLines);

  console.log(
    `/////////////////////\n00-Basic-Functions: command:\nRunning file Commands`
  );

  if (!CommandLines) {
    console.warn(`00-Basic-Functions: command:\nNo command lines provided`);
    console.warn(CommandLines);
    return;
  }

  // run Commands for the current file.
  await window.pkvs?.store("currentFilePath", currentFile.path);

  // Make sure that the Meta value is synced.
  Meta = await window.pkvs?.load("Meta");
  console.warn("00-Basic-Functions: command: \nMeta");
  console.warn(Meta);

  return;

}




