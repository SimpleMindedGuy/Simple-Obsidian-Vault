
/**
 * Uses the plugin PKVS remove Global Keys and value that were used to run the script.
 * 
 *
 * @async
 * @returns {void}
 */
async function RemoveDefaultsForGlobalValues() {

  // default value for breaking the script.
  await window.pkvs?.delete("tp");

  // default value for breaking the script.
  await window.pkvs?.delete("BreakScript");


  // default time limit for timing out functions 
  await window.pkvs?.delete("TimeLimit");

  // default padding value for numbered files and 
  await window.pkvs?.delete("Padding");

  // default dialog value
  await window.pkvs?.delete("dialog");


  // default menu value 
  await window.pkvs?.delete("menu");



  // default value for the current file.
  await window.pkvs?.delete("currentFilePath")


  // default value for properties of the current file.
  await window.pkvs?.delete("currentFileProperties")


  // default value for the folder of the directory.
  await window.pkvs?.delete("TemplateFolder")

  // default value for layers to build.
  await window.pkvs?.delete("layers")


  // default value for the current layer of the file.
  await window.pkvs?.delete("layerIndex")


  // default overview file.
  await window.pkvs?.delete("OverviewPath")

  // default meta object value. 
  await window.pkvs?.delete("Meta")



  // default time values and formats. 
  await window.pkvs?.delete("currentDateFormat")
  await window.pkvs?.delete("currentDate");
  await window.pkvs?.delete("currentValue")


  // default query search values.
  await window.pkvs?.delete("SearchQuery", "")
  await window.pkvs?.delete("SearchKey", "")
  await window.pkvs?.delete("SearchData")


  // default values for file metadata specific keys.
  await window.pkvs?.delete("createdKey")
  await window.pkvs?.delete("modifiedKey")
  await window.pkvs?.delete("titleKey")
  await window.pkvs?.delete("parentKey")
  await window.pkvs?.delete("OverviewKey")
  await window.pkvs?.delete("OverviewLayer")


  // default files paths.
  await window.pkvs?.delete("TemplatePath")
  await window.pkvs?.delete("ConfigPath")
  await window.pkvs?.delete("NewDocumentPath")
  await window.pkvs?.delete("SubNotePath")


}
module.exports = RemoveDefaultsForGlobalValues;
