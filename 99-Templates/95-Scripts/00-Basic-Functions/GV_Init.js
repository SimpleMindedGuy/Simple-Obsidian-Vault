// In The Name of Allah, The Most Beneficent, The Most Merciful

/**
 * Stops the script from executing and applies no changes to anything. 
 * Conditions : 
 * - When user does not provide a valid mandatory value. 
 * @date 03/02/2024 - 01:03:21
 *
 * @type {boolean}
 */
let BreakScript = false;

/**
 * The time given for a function before it finishes.
 * if the function dose not return anything, the function is then suspended, and it the value null is given. 
 * this prevents the script from soft locking the vault or leading to data loss
 * @date 26/12/2023 - 14:26:29
 *
 * @type {number}
 */
let TimeLimit = 5000;


/**
 * specifies the amount of digits used in The names of numbered files
 * @date 27/12/2023 - 15:32:33
 *
 * @type {number}
 */
let Padding = 2;

/**
 * @date 16/12/2023 
 * used to store Text that will be displayed in dialogs;
 * @type {string}
 * 
*/

let dialog;


/**
 * A variable to holds a list set by the function {@link Menu}, this list is then later user to display options along with the {@link dialog} for the user to chose one or more from those options.
 * 
 * Functions that use menu are 
 * - {@link SelectLayer}
 * - {@link Select}
 * - {@link Option}
 * - {@link Check}
 * @date 27/12/2023 
 *
 * @type {Array<string>}
 */
let menu = [];


/**
 * @type {String} 
 * - String that contains the path of the current file
 * - I'm storing the path purely because of laziness, because I didn't want to solve the problem of circular references
*/
let currentFilePath;

/**
 * @type {Object|null} 
 * - Object that contains the properties/values if any of the file of {@link currentFilePath}
 * - only set when the user is trying to get a value from the current file, using the command {@link GetValue}
 * - the currentFile changes, then the value is reset to an empty object.
*/
let currentFileProperties = null;


/** 

 * @date 16/12/2023 
 * @type {string[]} layers
 * - Array that stores the paths 
 * - used to Store Build Path, and also refers to the path of templates staring from the TemplateRoot Folder
 * - Each layer is a directory.
 * - if a directory exists it will use it. 
 * - Document directory will be built on the last layer
 * - Build Path starts from root Directory of the vault by default
*/
let layers = [];

/**
 * @type {number} 
 * - the Index of the current layer working in, based on the values stored in the {@link layers} array
*/
let layerIndex = 0;

/**
 * @type {String|null} 
 * - The overview file path if any.
*/
let OverviewPath = null;

/** 
 * 
 * @date 16/12/2023 
 * @typedef {Object}  Meta
 * used to store properties and values to be used in documents, mostly used for writing metadata.
 * - All said properties will be added to the document's files, assuming that those properties exist in the Yml port of said document
 *  - if not the script will then look for any expression of properties within the documents text (this might not work yet)
 * 
 * 
 * @property {string[]} tags - Array of strings
 * - Stores Tags that will be added to document
 * @property {string[]} aliases - Array of strings
 * - Stores The alias for the document.
 * @property {?*} [otherprops] - other properties may be added to be written to the document
 */
let Meta = {
  tags: [],
  aliases: [],

};


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
  OverviewLayer = null



/**
 * Values used for using Dataview to search for Keys, using search filters
 * @date 02/02/2024 - 23:34:17
 * @typedef {string} SearchQuery - Use to make a query of all the files that full fill those properties.
 * @typedef {string} SearchKey - The key that holds the returned value. 
 * @typedef {string[]|number[]} SearchData - A list of all values matching the query.
 */
let SearchQuery = "",
  SearchKey = "",
  SearchData;



/**
 * - variables that are important for getting and setting date values, and other values.
 * - can be stored in keys inside the {@link Meta} object
 * 
 * 
 * @date 16/12/2023 
 *
 * @typedef {string} currentDateFormat - stores the Date format 
 * - will be used to write formatted date using the {@link currentDate} value
 * - will be used to write {@link currentDate} value when providing using the {@link SetDate}
 * 
 * @typedef {Date} currentDate - Stores the value for date as a date object.
 * @typedef {*} value - Stores any value given using the command {@link SetValue} 
 */
let currentDateFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ",
  currentDate,
  currentValue;




/**
 * Folder paths 
 * - important for the utility to  know where to read commands from 
 * @date 16/12/2023 
 *
 * @typedef {string} TemplatePath 
 * - Folder where templates are stored.
 * @typedef {string} ConfigPath
 * - File where config file is stored
 * - config file will always be read first
 * - used to set values to some form of default that the user prefers
 * @typedef {string} NewDocumentPath 
 * - Utility default Command file
 * - mostly used generate a new document that is not - necessary - related to any other document.
 * @typedef {string} SubNotePath
 * - Utility Default SubNote Templates Folder
 * - May be removed later on.
 */
let ConfigPath = 'Config.md',
  CommandFolder = '99-Commands',
  NewDocumentPath = 'NewDocument.md',
  SubNotePath = '60-SubNote';




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
