# Important 
To be able to use the commands, you need to have a templater command 
- `<%* tp.user.NewDocument(tp,true) %>` 
	if you are trying to read the commands in the current file 
- `<%* tp.user.NewDocument(tp,false) %>`
	if you are trying to read the commands in the 'NewDocument' File

# Keywords

## Description File
The main file of specific document, any document that is made will look for template folders, the main document file template would be called `Description Template`.

## Key
Is a value that will end up being added to the metadata of the Description file.

> [!note]
> Example 
> Select : [one,two,three] => number
> will result in a value called `number` with the chosen value
> it should look like this 
> `number:one`


## Text
Any text that is expected to be displayed in an input dialogue for the user, to explain what kind of input is required 

## Value
is anything that can be used as an option to chose from. 
it can be a number, or it can be a text.

## tags
a metadata value that holds all tags inside the document

## alias
A metadata value that holds all text values that can refer/link to the document

# File structure 
```dirtree
- / Templates <= Root folder for the utility
	- Decription <= Template File
	- New Document <= the Main file where the utility reads instructions
	- Description Template <= Template File
	- Progress Template
	- Tracking Template
	- Overview Template <= Overview Template
	- Activity <= The instruction file that will be read, when pointed at when using the nextfile:=> Activity command
	- /project <= Template Folder
		- Description Template <= Template File
		- Progress Template
		- Tracking Template
		- Overview Template		
		- Project <= The instruction file that will be read, when pointed at when using the nextfile:=> Project command
		- /Program 		<= Template Folder
			- Description Template 	<= Template File
			- Progress Template		
			- Tracking Template 	
			- Program <= The instruction file that will be read, when pointed at when using the nextfile:=> Program command

```


### CreateDateKey : => `key` , LastUpdatedKey : => `key` , TitleKey :=> `key`,ParentDocumentKey:=>`key`
Changes the Key for or the MetaData variable name for the document's Created date/Modified Date/ Title

>[!note]
> Example
> CreateDateKey : => 🗓️
> stead of storing the created date in a 
> `Created: 21/1/2020` 
> it stores it like this 
> `🗓️: 21/1/2020`


those can be later used in data views and other related things.



# Commands

## Set : `value`or `[value1,value2,value3]`=> `key`
Sets a value or a  list of values to a key

>[!note] 
>Set: hello world => sayHello
>Stores "hello world" in the variable `sayHello`
>Set: [1,2,3,4] => Numbers
>Stores array [1,2,3,4] in the variable `Numbers`


## Get : `key1`=> `key2`
Reads the value of `key1` from the current file's metadata, and store it in `key2` in the scripts data

## $(`key`)
Adds the ability to put a value of a variable into the document instead of just as MetaData. 

for example 
>[!note]
>using the commands 
>Date :=> Day
>\$(Day)
>will replace ` $(Day)` with : 2020/11/10 - 05:10 am


the values will be set at the last stage (when building the document or file), to make sure that the key actually refer to a value. 


## Dialog : { `Text` } 
can contain any amount of text, The text is later used to be displayed in the input box dialog, to help guide the user with what type of input is expected. 


## Layer : [`value`,`value`...] (=> `Key`) optional
Shows an input dialog, for the user, the user can only chose one of them, then the value is stored in an array called `Layers`, each `Layer` represent a fold, the folders then are created in ascending order ( first layer is created first), each containing the folder after it.

Note that too many layers will negatively affect the performance of your vault.

storing that value in a `key` is optional.

I only use those keys in metadata.

## Select : [ `value`,`value`] => `key`
shows input dialog for the user with multiple values that are stored inside the brackets ([]), where each `value` is separated by a comma ( , ).

User can only pic only one value, and the value is then stored in a key (`key`), the key can be any string( Text ) value. the key can be later used to write the value in the document, or in meta data.

its important to note that Keys can only be assigned once, to avoid overwriting values.


## Options : [ `value`,`value`] => `key`
shows input dialog for the user with multiple values that are stored inside the brackets ([]), where each `value` is separated by a comma ( , ).

User can  pic any amount of those values, and the values is then stored in a key (`key`), the key can be any string( Text ) value. the key can be later used to write the value in the document, or in meta data.

## Input : => `key`
Shows an input dialog for the user to add a text value, instead of choosing from options, can take any amount of text, and is assign to a key(`key`).

## List : => `key`
Similar to [[99-Templates/Utility documentation#Input key|Input]], but it allows the user to add as many values as they want, until the user enters an empty value.

This is intended for Tags and Aliases, where the user might need to add multiple values to the document.

## Check :  => `key`
Shows an input dialog for the user  with options for True/False values.


## NextFile :=> `key` OR `templatefolder name`
Tells the script to look for the next file of instructions , looks for folders first, and The search is based on the value of the given key (`key`).

>[!note]
>Example
>Using the ` NextFile :=>`   command
>Will look into the `Layers` variable, then read the first index if used for the first time, or read the next index.
>when using the 
>NextFile :=>  command
>while in the `new Document` file
>with values ["Activity"] in the `Layers` variable.
>the script will look for if `Layers` have any values.
>Then look for the First value `Activity`, then move to a Folder with the name "Activity", then look for a file with the same name
>```dirtree
>- /Template * where the script is currently at
>	- new Document <= First file of instructions
>	- /Activity
>		- Activity <= Next File of instuctions
>```
>
>if later on, another `layer` is added ( in this case "Project"), in the activity file we use the `NextFile` command. 
>the script will look if the the `Layers` variable have more values in it. 
>if not then the script will stop there, and no documents will be made.
>
>if there is another value to read ["Activity"<,"Project"], then move to a Folder with the name "Project", then look for a file with the same name.
>
>```dirtree
>- /Template
>	- new Document 
>	- /Activity  * where the script is currently at
>		- Activity <= current file of instructions 
>		- /Project
>			- Project <= Next File of instuctions
>```


## SetDateFormat :=> `value`
Set the date format.

The default value is `YYYY/MM/DD - hh:mm a` and the result would look like this `2020/12/03 - 01:50 pm` [learn more](https://momentjs.com/docs/#/displaying/format/)

## Date :=> `key`
Stores a current date in key, using the last set format, using the `SetDateFormat` Command.


## SetDate : (`date`) => `key`
Set the date value to the key, based on the current Date format.
The only reason I use this is to store files that are in 

## Overview 
Overview file is a file that tracks a value in the description file of a document.
it is a kanban template with multiple lists, when a document is made, a link to the description file of that document is added to the first list in the kanban. 

moving a link from one list to another will change a `"key"` value in the metadata of the description file that is linked to, the `key` should already exist in the description file. 

### OverviewKey:   => `key`
tells the overview file what value to edit when moving items in the kanban file from one list to another, "`key`" is text value that exists in the metadata of the description file.

### OverviewLayer:   => `key`   OR   `number`  OR  `foldername`
tells the Script at which layer to make the Overview folder, you can only make one overview file within specific layers.
Takes either a number, or name a folder name. 


>[!note]
>If the values (OverviewKey) and (OverviewLayer) are assigned
>- the script will first look for an "Overview Template" file, at the chosen `layer`
>- if we made a document with the layers 
>```dirtree
>- /Activity
>	- /Project
>		- Overview Template
>		- /Program
>```
>- And the value for `OverviewLayer` is "Project"
>- then the script will look for an `Overview Template` in side the "Project" folder.
>	- if the template is not found, the overview template wont be created
>- after the file is created or found, then the script will create a link to the `description file`, in the first list of the `overview file`.

## MoveMedia :=>  `path`

moves attachments from where ever they are, to a the specified
the path can include `key` to use values in current file's metadata values, from input or can be just a text based value.

when using a "fixed" path 
just type the path as normal : path/to/folder
when using variables  use the current format :  /\$(`key`)/\$(`key`)/\$(`key`)
note : using the character \$ might end up rendering the as latex, but that wont affect how the script functions. 

It can also be left empty and use the `Layers` values instead, and will move the files based on the layer values.


right now it will move every attachment, except for things that are in the **Banner** folder.


## BuildDocument : =>
1. Creates folders if they don't exist
	- folders are created based on the `Layers` array.
	- folders are created based on their index in ascending order.
	- each folder will contain the one after it.
2. adds the document to an overview file if the user specifies what key to track and at what folder to create it.
3. Create document files, and adding the metadata.

### Template files 
The way templates will work :
- Script will go to the folders in the `Layers` array
	- the Template folders are expected to be found inside the `Tempaltes folder`
	- Each value in the `Layers` represent a folder.
	- Each `Layer` should contain the `Layer` after it. 

>[!note]
>if the `Layers` array contain the values [Activity , Project , Program], the script will look inside the Templates folder.
>And it will look for the `Activity` folder, then will look inside the `Activity` folder for the `Project` folder, then will look inside the `Project` folder for `Program` folder.

- When the last `Layer` is reached the script will look for `Template files`.
	script will look for any file with the suffix Template in their name in the current layer. 

>[!note]
>if we want to make template files for the `layer` `Activity/Project/Program`.
>then the utility will look for
>
>```dirtree
>- / Templates <= Root folder for the utility
>	- Decription <= Template File
>	- New Document <= the Main file where the utility reads instructions
>	- /Activity <= Template Folder
>		- Description Template <= Template File
>		- Progress Template
>		- /project <= Template Folder
>			- Description Template <= Template File
>			- Progress Template
>			- Tracking Template
>			- Overview Template		
>			- /Program 		<= Template Folder
>				- Description Template 	<= Template File
>```

- If there are no Template Files in the last `Layer`, or only `description Template / Overview Template`, the script will move back to the previous layer, this will be repeated until the script get back to `Templates folder`.

- If templates are not found, then the document will be created empty. 

- if one or more Template Files are found, the script will display a dialog for the user to chose one or more, or even none Template Files to be included in the file. 

> [!Note]
> Template files MUST include the suffix Template in their file name.
> and any "default" metadata should be written into the file it self.


## BuildInFile : =>
Execute command in the current file, The only use for this now is to add metadata for Daily and weekly notes.



## BuildSubDoc :=> `Template path` (Required),`Build path` (optional)

Creates a folder that contains "sub Documents", that that are "linked" to the current parent document using the `parent` key.
the `parent` key can be changed using the `ParentKey => newKey` command

just like `MoveMedia` the path value can be a fixed value or can be made of data from the metadata or some input values 

note : In this command the `Layers` values will be used for both
- Looking for the templates if `Template path` is left empty
- Decide where to build the project if `build path` is left empty

note : when looking for Templates (`Template path`) the script will assume that the path is inside the Templates folder, whereas The build path have different rules

If the build path is empty, and Layers is empty, the script will create folder inside the current document folder, and build the sub document inside it. 

 if path is provided then the script will build folders (if necessary) starting from vault's root folder, to the last one, and build sub document folder in it. 

if all of the expected values are empty, then the script will create the sub document folder, inside the main document folder

## BuildSubNote :=> `Template path` (Required), `Build path` (Optional)
Creates a note in a folder inside the current document, that will contain all `sub Notes` and they will link back to the main  document using the `parent` key.

if path is left empty then the script will create a folder inside the Document's folder called (SubNotes) and Build the SubNotes in it.


## Stop :=> 
Stops marks the end of execution and removes the commands from  the current file. 

>[!important]  Always end with the stop command
>It is very important to always end the commands with the stop command failing to do so will cause the script to infinately loop over the commands, and may result in un-predicted behaviour.
>The only exception fo this rule is 
>not needed when using the `BuildDocument/BuildSubDocument/BuildSubNote` command


# Command Pages and Buttons
The buttons plugin, allows us to refer to a note in the Template folder, and when clicking on the button it then appends the note it is referred to, then executes any templater commands it contains in that note 

We can take advantages of this functionality, by making multiple notes that have sets of commands in them.
To make this work we have to tell the Script that i needs to read the current file. 

what happens then is that the button embeds the commands inside the current file, then executes the script, reads and executes all the commands/instructions, then hopefully if we remember to add the `stop` command it will stop and remove all commands from the current file after execution.
