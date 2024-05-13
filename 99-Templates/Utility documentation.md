> [!note]
> This part of the script is in "maintenance mode", later on, I might look in to turning this functionality, into some sort of a plugin later on, but that's far in the future.
> 
> I don't intend to add features anytime soon, but feel free to request them. 


> [!note]
> To be able to use the commands, you need to have a templater command 
> - `<%* tp.user.main(true) %>`
>   
> 	if you are trying to read the commands in the current file
>
> - `<%* tp.user.main(false) %>`
> 	if you are trying to read the commands in the 'NewDocument' File
> 	the script it self used to be  located at [./95-Scripts/NewDocument.js](./95-Scripts/NewDocument.js)
>
> 	Now is split into multiple functions, those functions are called starting from `main` function located at [./95-Scripts/00-Basic-Functions/main.js](./95-Scripts/00-Basic-Functions/main.js).
>
> 	Those functions can be used on their own with the exception for the functions in the folders (06-Utility Specific and 01-Commands) because they rely on global values that would be set through some of other functions.
> 
> 	 However, with a little bit of reading of reading, you should be able to understand how to use All the functions in the utility, **Assuming that you have a little knowledge in coding and javascript**. 

# Keywords/Terminology

## Description File
The main file of specific document, any document that is made will look for template folders, the main document file template would be called `Description Template`.

## Key/variable
A name for a “container” that contains/can contain data, used to refer to a value in the script, mostly stored/added in a specific variable in the script called `Meta`. 


## Text
Any text that is expected to be displayed in an input dialogue for the user, to explain what kind of input is required 

## Value
is anything that can be used as an option to chose from. 
it can be a number, or it can be a text.

## tags
A MetaData value that holds all tags inside the document

## aliases
A MetaData value that holds all text values that can refer/link to the document

## Overview 
Overview file is a Kanban file that tracks a value in the `Default file` of a document.

When the document is created, if there is an overview template/file, the document is then added to the first list in the kanban file. 

moving a link from one list to another will change a `key` value in the metadata of the `Default file` that is linked to, the `key` should already exist in the `description file`. 


# Important variables

## Meta
Is a variable the script will store all input data, as long as there is a `key`  provided after a command that would take value from (user input /current file/command block).

> [!note]
> Input :=> number
> 
> will result in a value/variable called `number` with the chosen value
> 
> it should look like this
> 
> `number:one`

> [!note]
> GetValue :=> 🗓️ // gets a property in the current file with the name 🗓️, and stores is in a specific variable called `currenValue`.
> 
> StoreValue :=> createdDate // Stores the current value of the `currentValue` variable, and stores it in a `Key` inside the `Meta` variable.

The values in the `Meta` variable are then used to write those values to the corresponding key inside the template of the generated document.

## currentValue 
A variable that contains some value that can be taken from the current file that is being read.
Or directly from the script itself. 

Then used later on to be stored in `Meta` values that can be then written into the files. 
## currentDate
A variable that contains some Date value to be set directly from the script. 
Or directly from the script itself. 

Then used later on to be stored in `Meta` values that can be then written into the files. 

# File structure 
```dirtree
- / Templates <= Root folder for the utility.
	- /TemplateFolder 1 <= a template folder.
		- Description Template <= default template.
		- Optional Template 
		- Overview <= overview file (a kanban file).
		- TemplateName
	- /TemplateFolder 2 
		- ....

```


## Default Files 
the Script is going to look for at least 2 default files.

- [NewDocument](./NewDocument.md)
	The file that contains the default functionality of the utility, it creates a new document that is not linked to any other document. 
- [Config](./Config.md)
	A file where it would have some commands that it reads before anything else, this is useful for setting default values and so on, to avoid repeating things. 




# Commands

## SetValue

SetValue :=> `value`or `[value1,value2,...]`

Sets a value or a list of values in a global variable called `value`, that value can then be stored in another variable using the [StoreValue command](#StoreValue).


>[!note]
>SetValue:=> hello world
>
>sets the value of `value` to 'hello world'
>
>StoreValue :=> hello
>
>stores the value of `value` in the variable `sayHello`
>
>SetValue :=> [1,2,3,4]
>
>set the value of `value`
>
>StoreValue :=> Numbers
>
>Stores array [1,2,3,4] in the variable `Numbers`
>


## Command Block
All Commands have to be inside the command block, the utility will only for the commands inside only one block in the file that is written in the following form.
```
{{{:::
<command> 
<command>
<command>
<command>
:::}}}
```

This is made this way to avoid overwriting text that may look like the commands inside the file, and once the utility is done with the commands, it will remove the block from the file.


## Setting Default Keys

SetCreatedKey :=> `key`
SetModifiedKey :=> `key`
SetTitleKey :=> `key`
SetParentKey :=>`key`


Changes the `Key` for or the `Meta` variable name for the document's Created date/Modified Date/ Title

Those are mostly set in the [config](./Config) file, which will be read and “executed” before running anything else.

>[!note]
> SetCreatedKey :=> 🗓️
>
> stead of storing the created date in a
>
> `Created: 21/1/2020`
>
>
> it stores it like this
>
> `🗓️: 21/1/2020`


Those can be later used in data views and other related things.


## StoreValue

StoreValue :=> `key`

Stores the current value of the global variable `value` in the provided `key` 

## GetValue

GetValue :=> `key`

Reads a value of the `key` in the current file, and store it in the `value` global variable. 

That value can then later 

## !(key)
Adds the ability to put a value of a variable into the document instead of just as MetaData. 

for example 
>[!note]
>using the commands 
>Date :=> Day
>\$(Day)
>will replace ` $(Day)` with : 2020/11/10 - 05:10 am


the values will be set at the last stage (when building the document or file), to make sure that the key actually refer to a value. 


## SetSearchQuery

SetSearchQuery :=> `Text`

Sets a value for a variable in the script with the name `SearchQuery` to the provided `Text`.
This is used in the command [GetQueryList](#GetQueryList), to get information from all functions that fulfil the query specifications.


## SetSearchKey

SetSearchKey :=> `key`

Sets a value for a variable in the script with the name `SearchKey` to the provided `Text`.
This is used in the command [GetQueryList](#GetQueryList), to get A list of all the values of `key` in all the files that fulfil the query specifications.

## GetQueryList

GetQueryList :=> `key`

> [!note]
> This command requires Dataview, and A bit of Dataview Query knowledge, check the [Dataview Documentation](https://github.com/blacksmithgu/obsidian-dataview) for more details on how to write a [query](https://blacksmithgu.github.io/obsidian-dataview/queries/structure/). 


Performs a Query search, using the `SearchQuey`, and returns a List of all the values of the `SearchKey`, in all the files that fulfil the query specifications. 

This is useful for getting a list of any value in the whole, vault or in a specific folder in the vault, or for all the files that have a specific `tag/s`
example of how to get All the `tags` in the whole vault.



> [!note]
> SetSearchQuery :=> ("/")
> 
> SetSearchKey :=> tags
> 
> GetQueryList :=> menu
> 
> Menu :=> \[!(menu)\]
> 
> in this example,  we specify that we want all the files that are children or nested children of the "root" folder of the current vault.
> 
> we then store all the values of tags for each file, and store them in a list
>
> 
> then it is stored in a `meta` `key` with the name menu.
> 
> Then uses the `key`(menu) to make the next List/Menu for the user to chsoe from
> 
> this will then work with the next [Select](#Select), [SelectAdd](#SelectAdd) , [Options](#Options), [OptionsAdd](#OptionsAdd).


> [!note]
> SetSearchQuery :=>  #Activities and #Description
> 
> SetSearchKey :=> 🏷️
> 
> GetQueryList :=> menu
> 
> Menu :=> \[!(menu)\]
> 
> in this example,  we specify that we want all the files that have the tag `#Activities` and also have the tag `Description` in the whole vault
> 
> we then store all the values of 🏷️ for each file, and store them in a list
> 
> then it is stored in a `meta` `key` with the name menu.
> 
> Then uses the `key`(menu) to make the next List/Menu for the user to chsoe from
> 
> this will then work with the next [Select](#Select), [SelectAdd](#SelectAdd) , [Options](#Options), [OptionsAdd](#OptionsAdd).






## Dialog

Dialog :=> { `Text` } 

can contain any amount of text, The text is later used to be displayed in the input box dialogue, to help guide the user with what type of input is expected. 


## Menu
Menu :=> [`value`,`value`...]

Makes a list of options to be displayed alongside the dialogue, to allow the user to choose one or many of the list's options. using the following commands.

- [Selectlayer](#SelectLayer)
- [Select](#Select)
- [SelectAdd](#SelectAdd)
- [Options](#Options)
- [OptionsAdd](#OptionsAdd)




## SelectLayer

SelectLayer :=> `Key(optional)`

Displays a prompt that has a text of `dialogue` as well as the options in `Menu`, asking the user to choose only one of the options. 


>[!warning] 
>Performance vs Order
>Too many layers will negatively affect the performance of your vault.

The value is then added to `layers`.

If the key is provided, the value is going to be stored in `Meta` using the variable with the name `Key`


## AddLayer

AddLayer :=> `value`

Adds `value` to `layers` without prompting the user.

## Select
Select :=> `key`
Displays a prompt that has a text of `dialog` as well as the options in `Menu`, asking the user to choose only one of the options. 

The value is then stored in `Meta` using the variable with the name `Key`

### SelectAdd

SelectAdd :=> `key`

Works the same way as [Select](#Select), but if the `Mnenu` is empty, or if the user Cancels Prompt, it shows an Input Prompt, to add **one** Entry.

## Options

Options :=> `key`

Displays a prompt that has a text of `dialog` as well as the options in `Menu`, asking the user to choose one or more of the options. 

The value/s is then stored in `Meta` using the variable with the name `Key`

### OptionsAdd

OptionsAdd :=> `key`


Works the same way as [Options](#Options), but if the `Mnenu` is empty, or if the user Cancels Prompt, it shows an Input Prompt, to add one or more Entries.

## Input

Input :=> `key`


Displays a prompt that has a text of `dialog` and takes at least one valid input from the user. 

The value is then stored in `Meta` using the variable with the name `Key`

## List

List :=> `key`


Displays a prompt that has a text of `dialog` and takes one or more valid input from the user.

The list will continuously ask for input till the user adds one empty input. 

The value/s is then stored in `Meta` using the variable with the name `Key`

## Check

Check :=> `key`

Shows an input dialogue for the user with options for True/False values.
The value/s is then stored in `Meta` using the variable with the name `Key`.

## NextFile

NextFile :=> 

Tells the script to move to the next file in the `layers` list. 

the script will look for the next file, in the template folder 

> [!note]
> if layers have the values \[project,type\]
> when reading the `NextFile:=>` command, it then looks in the Template file (`99-Template`, in the default configuration.)
> for a folder called `porject`, then it looks for a note with the name `project`.
> then it tries to look for a command block in that note. 
> ```dirtree
> - / template folder
> 	- / project
> 		- project 
> ```

> [!note] 
> When looking for templates, the script, will look again for folders with the names of values inside the `layers` list.
> when cannot find a folder, it stops at the last folder it finds, and uses it to look for templates later. 



## SetDate

SetDate :=> `date(optional)`

Sets the `currentDate` variable to the given date value, if there is no given date value, then the `currentDate` is set to a new Date me .


## SetDateFormat

SetDateFormat :=> `value`

Set the `dateformat` variable.

The default value is `YYYY-MM-DDThh:mm:ssZ` and the result would look like this `2020/12/03 - 01:50 pm` [learn more](https://momentjs.com/docs/#/displaying/format/)

## SetDate

SetDate :=> `key`

Stores the `currentDate` in `key`

  
## StoreFormattedDate

StoreFormattedDate :=> `key`


Stores the `currentDate` in key, using the last set format, using the `SetDateFormat` Command.


## OverviewKey

OverviewKey :=> `value`

Tells the overview file what value to edit when moving items in the kanban file from one list to another, "`key`" is text value that exists in the metadata of the description file.

## OverviewLayer

OverviewLayer :=> `value` 


Tells the Script at which layer to make the Overview folder, you can only make one overview file within one specific layer.


## MoveMedia

MoveMedia :=>  `path`

Moves attachments from where ever they are, to the specified path.

> [!note]
> when using a "fixed" path
> 
> just type the path as normal : path/to/folder
> 
> when using variables  use the current format :  !(`key`)/!(`key`)/!(`key`)
> 
> MoveMedia :=> !(`key`)/!(`key`)/!(`key`)
> 
> MoveMedia :=> ExampleFolder/nested


> [!note]
> using the character \$ might end up rendering the as latex, but that won't affect how the script functions. 



## BuildDocument

BuildDocument :=>

1. Creates folders if they don't exist
	- Folders are created based on the `Layers` array.
	- Folders are created based on their index in ascending order.
	- Each folder will contain the one after it.
	- Folders can be numbered, however the option is not yet up to the user, unless you go out of ur way and edit the [Script](./95-Scripts/NewDocument.js) itself. (good luck)
	- Makes the Overview document if it does not exist.
1. Adds the Default document to an overview file if the user specifies what key to track and at what folder to create it.
2. Makes document files, and adding the metadata to each file.

> [!Note]
> Template files MUST include the suffix Template in their file name.
> and any "default" metadata should be written into the file it self.


## BuildSubDocument

BuildSubDocument :=>


Works the same was as [BuildDocument](#BuildDocument), with the exception of adding the link to the document of which the script is building a Sub-Document, for.

By default the parent document key is called `parent`, but in the current configuration it is set to ⬅️

The location of where the SubDirectory will be created depends on `layers` list.


## BuildSubNote

BuildSubNote :=> 

Works the same was as [BuildDocument](#BuildDocument), with the exception of adding the link to the document of which the script is building a Sub-Document, for.

By default the parent document key is called `parent`, but in the current configuration it is set to ⬅️

And it only starts building document folders using the `layers` list, starting for the current document's file.

> [!note] 
> the default command for making subnote, uses the command
> 
> `AddLayer :=> SubNote`
> 
> so that the utility looks for SubNote Templates.
>  
> within the folder called SubNote.
>
> 
> then also builds a folder Called SubNote, inside the Current Document's Folder.
> 
> and then it makes a Numbered file, using the Chosen Template, in the SubNote Folder.


## BuildInFile

BuildInFile :=>

Used only to Take input from the user, and then use it to write metadata in the current file. 


# Command Pages and Buttons
The button's plugin, allows us to refer to a note in the Template folder, and when clicking on the button it then appends the note it is referred to, then executes any Templater commands it contains in that note 

We can take advantages of this functionality, by making multiple notes that have sets of commands in them.
To make this work we have to tell the Script that I needs to read the current file. 

What happens then is that the button embeds the commands inside the current file, then the script, reads and "executes" all the commands, will stop and remove all commands from the current file.
