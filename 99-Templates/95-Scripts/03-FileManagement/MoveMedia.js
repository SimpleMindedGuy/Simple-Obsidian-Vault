// In The Name of Allah, The Most Beneficent, The Most Merciful

/**
 * Reads the given {@link file}, finds all the attachments/media files that don't belong to another document, and then moves them to the given {@link path}.
 * 
 * with the option to number the attachments.
 * @date 02/01/2024 - 08:25:45
 *
 * @async
 * @param {object} file - file object, required, read to find links in.
 * @param {string} path - the path to where to move attachments files to. 
 * @param {boolean} isNumbered - option to number the the files as they get moved. 
 * @param {boolean} padding - how many 0 the script would add to the left if each number for padding Default value :  2. 
 * @returns {Promise<void>}
 */
async function MoveMedia(file, path, isNumbered, padding = 2) {

  // Getting Templater object for running functions
  let tp = await window?.pkvs?.load("tp");



  if (!tp) {
    console.log(`03-FileManagement:: MoveMedia:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

    // Getting Templater object for running functions
    tp = {}
    const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

    for (const fun of tpInternalFunctions) {
      tp[fun.name] = fun.static_object;
    }

    tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();


  }

  // If templater is not provided exist loop
  if (!tp) {
    console.warn(`03-FileManagement:: MoveMedia:\ntemplater is not provided`)
    console.warn(tp)
    return
  }

  let MediaLinks = await tp.user.GetMediaFileLinks(file)

  if (!MediaLinks) {
    console.log(`03-FileManagement: MoveMedia:\nNo valid media links where found`)
    return
  }



  const BuildRoot = path ? '/' : file.parent.path

  const BuildList = path ? path.split('/') : ["Media"]

  console.log(`03-FileManagement: MoveMedia:\nFound Medialinks\n`, MediaLinks, `\nBuildRoot: ${BuildRoot}\nBuildList: `, BuildList)


  const BuildOptions = {
    isNumbered: false,
    Overview: null,
  }
  let BuildDirectory = await tp.user.MakeBuildPath(BuildRoot, BuildList, BuildOptions)


  for (const link of MediaLinks) {
    let MediaFile = await app.vault.getAbstractFileByPath(`${link}`);

    if (!MediaFile) {
      console.log(`03-FileManagement: MoveMedia:\nFile was not found\nFile : ${link}`)
      continue
    }

    if (!isNumbered) {
      await app.fileManager.renameFile(MediaFile, `${BuildDirectory.path}/${MediaFile.name}`)
      continue
    }


    let fileNumber = await tp.user.GetNextNumber(BuildDirectory, padding)

    const NumberRegExp = RegExp(/^\d{1,}\ *\-\ */gmi)
    let newName = await MediaFile.name.replace(NumberRegExp, "")
    await app.fileManager.renameFile(MediaFile, `${BuildDirectory.path}/${fileNumber}-${newName}`)
  }

}

module.exports = MoveMedia
