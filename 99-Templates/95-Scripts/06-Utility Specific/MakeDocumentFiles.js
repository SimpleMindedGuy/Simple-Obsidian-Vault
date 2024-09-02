// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Description placeholder
 * @date 27/12/2023 - 13:56:34
 *
 * @async
 * @param {object} Template - Array/list of templates will be used to make the files. 
 * @param {object} DocumentDirectory - Directory of which the files will be places in.
 * @param {boolean} addToOverview - To check of the utility should look for the default template (a template with name Description Template).
 * - True : looks for the template and adds it to an overview file if it exists.
 * - False : does not look for the default template, and continues as normal. 
 * @param {boolean} isNumbered - Option to add a number to the name of file. 
 * @param {boolean} isTemplateName - Option to add the name of Template to the name of file. 
 * @returns {Promise<void>}
 */
async function MakeDocumentFiles(Template, DocumentDirectory, addToOverview, isNumbered, isTemplateName) {
  // Getting global values if they exist
  let tp = await window?.pkvs?.load("tp");
  let Padding = await window?.pkvs?.load("Padding") ?? 2;

  let Meta = await window?.pkvs?.load("Meta") ?? {};
  let titleKey = await window?.pkvs?.load("titleKey") ?? "title";
  let TimeLimit = await window?.pkvs?.load("TimeLimit") ?? 3000;


  if (!tp) {
    console.log(`06-Utility Specific: MakeDocumentFiles:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

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
    console.warn(`06-Utility Specific: MakeDocumentFiles:\ntemplater is not provided`)
    console.warn(tp)
    return null
  }



  const TemplateRegExp = new RegExp(/^.*(?=Template)/gm);
  const DefaultRegExp = new RegExp(/Description/gm);

  let file

  let func = async () => {
    return Template.name.match(TemplateRegExp);
  }

  const isMatch = await tp.user.Timeout(func, TimeLimit);
  // check if the provided template is the default template 
  func = async () => {
    return Template.name.match(DefaultRegExp);
  }
  const isDefault = await tp.user.Timeout(func, TimeLimit);

  if (!isMatch) {
    console.warn(`06-Utility Specific: MakeDocumentFiles: \nname dose not match`)
    console.warn(isMatch)
    return
  }


  console.log(`06-Utility Specific: MakeDocumentFiles: \nTemplate : =>`);
  console.log(Template);

  let DirName = `${Meta[titleKey]}`

  // If numbered option then add numbers to name
  if (isNumbered) {
    console.log(`06-Utility Specific: MakeDocumentFiles: \nFile is numbered, getting new file number`)
    let DocumentNumber = await tp.user.GetNextNumber(DocumentDirectory, Padding)
    DirName = `${DocumentNumber}-${Meta[titleKey]}`
    // console.warn(`creating directory : ${DocumentNumber}-${Meta[titleKey]}`)

  }
  // If name of the template is to be added to the file name. 
  if (isTemplateName) {
    DirName = `${DirName} ${isMatch[0]}`
  }
  // Makes the note using the template

  file = await tp.user.CreateTemplateNote(`${DirName}`, DocumentDirectory, Template, false)

  // Replace meta keys with values in document text
  // Read file text.
  let text = await app.vault.read(file);
  console.log(`06-Utility Specific: MakeDocumentFiles: \nReading Text From file\nText value is \n`, text)
  console.log(`06-Utility Specific: MakeDocumentFiles: \nReplacing valuee for text`)
  // Find all meta keys and replace them with the corresponding value
  let newText = await tp.user.ReplaceValues(text);

  // Encase the modify process in a function, to be used in a timeout function.
  func = async () => {
    return app.vault.modify(
      file,
      newText
    )
      .then(() => {

        return true
      })
      .catch(() => {
        return false
      })
  }
  // Run modification function inside a timeout function
  await tp.user.Timeout(func, 5000);

  // Adds Yml metadata, then adds Inline Metadata.
  console.log(`06-Utility Specific: MakeDocumentFiles: \nAdding Yaml to File`, file);
  file = await tp.user.AddYamlValue(Meta, file)
  console.log(`06-Utility Specific: MakeDocumentFiles: \nAdding DV Inline to File`);
  file = await tp.user.AddInlineValue(Meta, file)

  // Check if script should add the A card linking to the default file in the overview File.
  if (!addToOverview) {
    console.log(`06-Utility Specific: MakeDocumentFiles: \nDon't Make a kanban card`)
    return
  }
  // If it is the default template add it to the overview file
  if (isDefault) {
    //  Get Overview global value
    let OverviewPath = await window?.pkvs?.load("OverviewPath");
    let Overview = await app.vault.getAbstractFileByPath(OverviewPath)
    console.log(`06-Utility Specific: MakeDocumentFiles: \nOverview Path \n`, OverviewPath, `\nOverview File : \n`, Overview);
    // If overview file exists, add the project to it.
    if (Overview) {
      console.log(`06-Utility Specific: MakeDocumentFiles: \nAdding document to overview.`)
      console.log(Overview)
      await tp.user.AddDocumentToKanban(file, Overview)
    }
  }

}

module.exports = MakeDocumentFiles
