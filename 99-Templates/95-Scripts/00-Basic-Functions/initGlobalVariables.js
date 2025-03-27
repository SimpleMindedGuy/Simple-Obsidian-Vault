
/**
 * Uses the plugin PKVS to set default key values that are important for the script functionality.
 * 
 * this may cause to OverRide some values tha could already be set by some users.
 *
 * @async
 * @returns {void}
 */
async function SetDefaultsForGlobalValues() {


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

  // Templater Object for accessing functions in multiple places so i don't have to re-write this everywhere i use it
  await window.pkvs?.store("tp", tp);

  // default value for breaking the script.
  await window.pkvs?.store("BreakScript", BreakScript);


  // default time limit for timing out functions 
  await window.pkvs?.store("TimeLimit", TimeLimit);

  // default padding value for numbered files and 
  await window.pkvs?.store("Padding", Padding);

  // default dialog value
  await window.pkvs?.store("dialog", dialog);


  // default menu value 
  await window.pkvs?.store("menu", []);



  // default value for the current file.
  await window.pkvs?.store("currentFilePath", null)


  // default value for properties of the current file.
  await window.pkvs?.store("currentFileProperties", null)


  // default value for the folder of the directory.
  await window.pkvs?.store("TemplateFolder", {})

  // default value for layers to build.
  await window.pkvs?.store("layers", [])


  // default value for the current layer of the file.
  await window.pkvs?.store("layerIndex", 0)


  // default overview file.
  await window.pkvs?.store("OverviewPath", null)

  // default meta object value. 
  await window.pkvs?.store("TemplatePath", {
    tags: [],
    aliases: [],
  })



  // default time values and formats. 
  await window.pkvs?.store("currentDateFormat", "YYYY-MM-DDTHH:mm:ss.SSSZ")
  await window.pkvs?.store("currentDate", await moment());
  await window.pkvs?.store("currentValue", null)


  // default query search values.
  await window.pkvs?.store("SearchQuery", "")
  await window.pkvs?.store("SearchKey", "")
  await window.pkvs?.store("SearchData", null)


  // default values for file metadata specific keys.
  await window.pkvs?.store("createdKey", "Created")
  await window.pkvs?.store("modifiedKey", "Modified")
  await window.pkvs?.store("titleKey", "Title")
  await window.pkvs?.store("parentKey", "Parent")
  await window.pkvs?.store("OverviewKey", null)
  await window.pkvs?.store("OverviewLayer", null)


  // default files paths.
  TemplatePath = await app.plugins.getPlugin('templater-obsidian').settings.templates_folder
  await window.pkvs?.store("TemplatePath", TemplatePath)
  await window.pkvs?.store("ConfigPath", `${TemplatePath}/Config.md`)
  await window.pkvs?.store("NewDocumentPath", `${TemplatePath}/NewDocument.md`)
  await window.pkvs?.store("SubNotePath", `${TemplatePath}/60-SubNote`)


}
module.exports = SetDefaultsForGlobalValues;
