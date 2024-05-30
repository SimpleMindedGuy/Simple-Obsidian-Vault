// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Provide object for overview, tells the script to create a Kanban file
 * @typedef {Object|null} Overview
 * - If value is null then just do nothing. 
 * @property {string} Key - The key that is going to be modified when moving a card in kanban from one list to another.
 * @property {string} Layer - The folder where the kanban file will be created at.
 */


/**
 * Creates Directories based on provided list {@link BuildList},
 * Starting for the provided directoryRoot {@link BuildRoot}, and returns the last directory where the Document is going be built in.
 * 
 * Only creates Directories if they dont exists.*
 * @date 18/12/2023 - 20:18:10
 *
 * @async
 * @param {string} BuildRoot - The directory to start building from
 * @param {string[]} BuildList - List of directories to be built
 * 
 * @param {Object} Options Set of options for how the functions works 
 * @param {boolean} Options.isNumbered - allow user to choose multiple options.
 * @param {Overview} Options.Overview  - Provide object for overview, tells the script to create a Kanban file
 * @param {boolean} isNumbered - Gives the option to number the directory 
 * @param {boolean} MakeOverview - Gives the option to look for Overview template, and Making the overview file in the Overview Directory, given by {@link OverviewLayer}, or to discard the process all together. 
 * @returns {Promise<object|null>}
 */
async function MakeBuildPath(BuildRoot, BuildList, Options) {

  // Getting Templater object for running functions


  let tp = await window?.pkvs?.load("tp");
  let Padding = await window?.pkvs?.load("Padding") ?? 2;

  if (!tp) {
    console.log(`06-Utility Specific: MakeBuildPath:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
    console.warn(`06-Utility Specific: MakeBuildPath:\ntemplater is not provided`)
    console.warn(tp)
    return
  }




  // getting The directory where the build new directories are going to be built. 
  let BuildFolder = await app.vault.getAbstractFileByPath(BuildRoot);

  console.log(`06-Utility Specific: MakeBuildPath:\ntrying to build document\nStarting from Build root\n@:${BuildRoot}`)
  console.log(BuildFolder)

  let DocumentNumber = ""

  const { Overview, isNumbered } = Options;

  const whiteSpaceRegExp = RegExp(/^\ *$/gm);

  // loop over list of directories
  // each directory will contain the one after it. 
  // if a directory already exists, no new directory will be created.
  for (const dir of BuildList) {
    // check if name is only white space
    if (await dir.match(whiteSpaceRegExp)) {
      // escape the creating the directory, if the name is only white space
      console.log(`06-Utility Specific: MakeBuildPath:\nsuggested path is empty/has no name`)
      continue
    }

    // check if the directory already exists
    let NextDirectory = await tp.user.GetDirectory(dir, BuildFolder.path)

    // if directory does not exist, create new directory. 
    if (!NextDirectory) {
      let DirName = `${dir}`;

      // if numbered object is checked get the next number for the directory.
      if (isNumbered) {
        let DocumentNumber = await tp.user.GetNextNumber(BuildFolder, Padding)
        DirName = `${DocumentNumber}-${dir}`
      }

      console.warn(`06-Utility Specific: MakeBuildPath:\ncreating directory : ${DocumentNumber}-${dir}`)


      NextDirectory = await tp.user.CreateDirectory(`${DirName}`, BuildFolder.path)
    }

    BuildFolder = NextDirectory

    let currentFilePath = window?.pkvs?.load("currentFilePath");
    let currentFile = await app.vault.getAbstractFileByPath(currentFilePath)

    // ignore instructions and start with the next directory, if we don't want to make Overview. 
    if (!Overview) {
      continue
    }
    // check for overview file 
    if (dir !== Overview.Layer) {
      continue
    }
    if (!currentFile) {
      console.log(`06-Utility Specific: MakeBuildPath:\ncurrentFile was not provided/dose not exist.\ncannot create overview file`)
      continue
    }

    // check for overview file 
    console.log(`06-Utility Specific: MakeBuildPath:\ngetting overview file`)
    let OverviewFile = await tp.user.GetFile(dir, BuildFolder.path)




    /// If there is no folder make it
    if (!OverviewFile) {
      // getting the template for the overview folder 
      console.log(`06-Utility Specific: MakeBuildPath:\noverview file was not found, making new overview file\ngetting the template for the overview file`)

      let OverviewTemplate = await tp.user.GetFile("Overview", currentFile.parent.path)

      // if the overview template dose not exist, do nothing and continue loop.
      if (!OverviewTemplate) {
        console.warn(`06-Utility Specific: MakeBuildPath:\ntemplate dose not have an Overview`)
        console.warn(OverviewTemplate)
        continue
      }

      // Make the Overview file
      console.log(`06-Utility Specific: MakeBuildPath:\nmaking overview file @: ${BuildFolder.path}`)
      OverviewFile = await tp.user.CreateTemplateNote(dir, BuildFolder, OverviewTemplate, false);
      // set Overview file Global value
      await window?.pkvs?.store("OverviewPath", OverviewFile.path)

      // Getting kanbanHelper from MetaData
      let MetaEdit = await app.plugins.plugins["metaedit"].settings.KanbanHelper;


      // making sure that that over view key is set/provided
      if (!OverviewKey) {
        console.warn(`06-Utility Specific: MakeBuildPath:\nOverview Key was not provided, script does not know what to keep track of.`)
        continue
      }
      // adding overview to MetaEdit using the Overview key
      await MetaEdit.boards.push({ boardName: `${OverviewLayer}`, property: `${OverviewKey}` })

    }
  }

  return BuildFolder;

}

module.exports = MakeBuildPath;
