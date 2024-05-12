# In The Name of Allah, The Most Beneficent, The Most Merciful

# Simple-Obsidian-Vault

## Introduction

This is my obsidian vault self up with all my scripts, and utilities. 

The goal of this setup is to make Making documents and organizing them much easier, as well as Habit tracking and data visualization.
It is still under development, and the script could still needs a lot of documentation, but this version works almost perfectly, If you find any bugs please report that in the issues section.


## How it works
This setup provides a few tools/plugins to make Creating documents easier. 

### Simple Commands

This is a Script that reads a file, and looks for specific commands within it, those commands help to create folders, and organizing them.

It is meant to simplify scripts that do useful things, like where to create files, what kind of Data is expected for those files and how to group them together based on Options that are provided for the user.

Look up the [Utility documentation](https://github.com/SimpleMindedGuy/Simple-Obsidian-Vault/blob/364aa007abe94613493f7ec953dad6178fb60997/99-Templates/Utility%20documentation.md) for the Script for more information on what commands do, If you have any suggestions for commands, please create an issue ticket for it, preferably with an `enhancement` label.

### Habit tracking

Added some script to read Daily, Weekly, And Monthly note's **MetaData** to display them using graphs and tables, the variables themselves are customizable, all you have to do is edit the 3 files, the editing process is a little lengthy currently, and I'm trying to work out a way to make that process shorter.

But currently it only works for data that is collected from periodic notes, Read the [documentation](./99-Templates/Habit%20Tracking%20Documentation) for more information, and understand how it works.

>[!important] 
> You need to make sure that the variables names exactly match the ones you're looking for, and those same variables have to also be included in the templates you're trying to set its value in 



## Necessary Plugins
Using a collection of plugins mainly
This script would be basically impossible for me due to my limited knowledge.
- [obsidian-periodic-notes](https://github.com/liamcain/obsidian-periodic-notes)
	For Managing Daily notes
- [obsidian-kanban](https://github.com/mgmeyers/obsidian-kanban)
	To track documents status, and documents progress
- [Templater](https://github.com/SilentVoid13/Templater)
	For automating Document initialization, organizing Document's file, and executable scripts
- [MetaEdit](https://github.com/chhoumann/MetaEdit)
	For Editing Documents status automatically
- [obsidian-homepage ](https://github.com/mirnovov/obsidian-homepage)
	Display Basic information about the documents in the vault, and track its progress.
- [obsidian-db-folder](https://github.com/RafaelGB/obsidian-db-folder)
	To manage MetaData easily.  (Currently only used for Daily Notes)
- [obsidian-custom-js](https://github.com/saml-dev/obsidian-custom-js) and [obsidian-dataview](https://github.com/blacksmithgu/obsidian-dataview)
	For presenting and visualizing data, and some custom functionality in the future.
- [buttons](https://github.com/shabegom/buttons)
	Fort executing Templater  commands.
- [ obsidian-pkvs](https://github.com/iamrecursion/obsidian-pkvs)
	For  global state/dependency injection (getting and setting values), to be used across different scripts


