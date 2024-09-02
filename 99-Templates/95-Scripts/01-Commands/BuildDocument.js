// In The Name of Allah, The Most Beneficent, The Most Merciful

/**
 * Takes in {@link BuildOptions} which decide how the document should be built. 
 * Gets the folders or Makes them if they don't exist, for where the document is suppose to be placed.
 * Then it asks the user to choose templates depending on which template the user is using.
 * Then it makes the {@link Templates} that the user have chosen, with the correct names.
 * Then adds the {@link Metadata} to those files.
 * Then it adds the Default File (Description Template), to the {@link Overview} file if the {@link Overview} File exists.
 
 * @date 25/12/2023 - 12:50:38
 *
 * @async
 * @param {Object|null} BuildOptions  Used to pass options about how the document is to be built. 
 * - {@link BuildRoot} Specifies where the script will start building the project from.
 * - {@link HasDirectory} Checks if the files will be made in their own directory
 * - {@link isDirectoryNumbered} Checks the directory newly Made irectories should be Numbered 
 * - {@link isFileNumbered} Checks if the File/s of the document themselves should be numbered
 * - {@link MakeOverview} Tells the script to whether or not to make an Overview File
 * - {@link MakeDefault} Tells the script to check for the default template in order to add it to the {@link Overview} file, if it exists (might be removed later).
 * - {@link isTemplateName} Tells the script weather or not to include the name of the template with the name of the files. 
 * @returns {Promise<void>}
 */
async function BuildDocument(BuildOptions) {

  // Getting Templater object for running functions
  let tp = await window?.pkvs?.load("tp");
  let Meta = await window?.pkvs?.load("Meta") ?? {};
  let titleKey = await window?.pkvs?.load("titleKey");
  let padding = await window?.pkvs?.load("padding") ?? 2;



  if (!tp) {
    console.log(`01-Commands: BuildDocument:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
    console.warn(`01-Commands: BuildDocument:\ntemplater is not provided`)
    console.warn(tp)
    return
  }

  // Getting Build options from the BuildOptions

  const { BuildRoot, HasDirectory, isDirectoryNumbered, isFileNumbered, MakeOverview, MakeDefault, isTemplateName, isMultiTemplate } = BuildOptions;


  let BuildList = await window.pkvs.load("layers") ?? [];


  const BuildPathOptions = {
    isNumbered: isDirectoryNumbered,
    Overview: null
  }

  const Key = await window.pkvs.load("OverviewKey") ?? null
  const Layer = await window.pkvs.load("OverviewLayer") ?? null

  if (Key && Layer) {
    BuildPathOptions.Overview = {
      Key: Key,
      Layer: Layer
    }
  }
  let BuildDirectory = await tp.user.MakeBuildPath(BuildRoot, BuildList, BuildPathOptions)

  console.log(`01-Commands: BuildDocument:\ntrying to get template folder`)
  let TemplateFolder = await tp.user.GetTemplatesFolder();

  // Contains the final Directory where the files are going to be contained.
  let DocumentDirectory = BuildDirectory

  // Checks if the Files should have be in their own Directory. 
  if (HasDirectory) {
    // Get the title of the document from meta
    let DocumentName = `${Meta[titleKey]}`;
    DocumentName.trim();

    // Check if a Directory (Folder) with the same name exist
    DocumentDirectory = await tp.user.GetDirectory(`${DocumentName}`, BuildDirectory.path)

    // If a Directory (Folder) with the same name exists, return and tell the user to chose a different name.
    if (DocumentDirectory) {
      console.warn(`01-Commands: BuildDocument:\nDirectory already exist, Please choose Different Name.`)
      new Notice(`Directory already exist, Please choose Different Name.`, 5000)
      return
    }
    // Check if the directory should have a number.
    if (isDirectoryNumbered) {

      // Get new number.
      let DocumentNumber = await tp.user.GetNextNumber(BuildDirectory, padding)
      // Add number at the start of the name
      DocumentName = `${DocumentNumber}-${DocumentName}`;
    }

    DocumentName.trim();
    // await Create the directory of the document using the project number and name. 
    DocumentDirectory = await tp.user.CreateDirectory(`${DocumentName}`, BuildDirectory.path);
  }



  console.log(`01-Commands: BuildDocument:\nDocument Directory =>`)
  console.log(DocumentDirectory)

  // Get the templates from the template Directory 
  const TemplateList = await tp.user.GetTemplates(TemplateFolder)

  if (!TemplateList) {
    console.warn(`01-Commands: BuildDocument:\nNo templates found`)
    return
  }

  // Get optional templates in the current template folder 
  const Templates = await tp.user.GetOptionalTemplates(TemplateList, isMultiTemplate)



  // If there are no templates do nothing
  if (!Templates) {
    console.warn(`01-Commands: BuildDocument:\nNo templates provided/found for document`)
    console.warn(Templates)
    return
  }


  console.log(`01-Commands: BuildDocument:\nTemplates`);
  console.log(Templates);
  // Make the files using the templates.
  for (const Template of Templates) {
    // Make template file and fill in Metadata
    console.log(`01-Commands: BuildDocument:\nMaking template : ${Template.name}`);
    await tp.user.MakeDocumentFiles(Template, DocumentDirectory, MakeDefault, isFileNumbered, isTemplateName)
  }


}

module.exports = BuildDocument
