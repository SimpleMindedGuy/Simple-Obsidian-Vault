// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * looks for files that end with Template.md {@link Directory}, and returns list of files that match that expression.
 * 
 * @date 18/12/2023
 * @async
 * @param {object} Directory - The directory to search at.
 * @returns {Promise<object[]|null>}
 */
async function GetTemplates(Directory){


    let files = [];
    
    const TemplateRegExp = await RegExp(/^.*(?:Template)\.(md)$/gm)

    console.log(`06-Utility Specific: GetTemplates:\nlooking for Templates\n@: ${Directory.path}`)

    for(const file of Directory.children)
    {
        const isMatch = await file.name.match(TemplateRegExp)
        console.log(file.name)

        if(isMatch)
        {
            console.log(`06-Utility Specific: GetTemplates:\nfile ${file.name} is a template`)
            files.push(file)
            continue
        }
        console.log(`06-Utility Specific: GetTemplates:\nfile ${file.name} is not a template`)
    }
    return files ;
}

module.exports = GetTemplates