# Introduction

This documentation should cover all the important variables and terminology so that you can easily customize your habit tracking visualizationn. 

IF something is not explained here, please make an issue, and I'll Work on it as soon as possible 



> !!! Note :
> All files mentioned here are Javascript files
> You don't have to have a total understanding of JavavSciprt  but it will make ur life much easier working with this document

## Graph Display
This can be found in the [[90-CustomJS/00-Defaults.js|Defaults]] file. 

To understand how to customize these data you have to check [ChartJS](https://www.chartjs.org/) documentation, if you want to add more custom values.

This also requires that you have the [Obsidian-charts](https://github.com/phibr0/obsidian-charts) plugin installed, and also check the [documentation](https://charts.phibr0.de/Meta/Charts/Obsidian+Charts+Documentation) for better understanding of how it works.
### Sections 
This specifies how to display, or what kind of values does the graph is going to display. 
It contains information much of the whole canvas the chart is going to take, the position of the labels, and if it going to stack on top of other section or not
There are only 3 options currently : 
- Y axies options 
	- Check : Display Categorical values "true or false" small space on Chart
- Value : used in variables that contain numerical values. 
	- Values : Display Numerical values, takes a large space on the chart depending.
- X axies options
	- x : basic display settings for the x axis to show labels, and borders for those labels. 

### Chart
Specify on what type of chart the value is going to be displayed and contains basic minimal information that is going to be needed to display the information of a specific variable in the chart.

- Check : used in variables that contain categorical values

### animation and transition 
Settings for how to animation the charts, on hide and show conditions

### plugins
Information about where to display legend elements, and tool tip functions, and if it allows stacking or not.

### Colors
have 2 lists of colors to display the data
It keeps looping through the list of colors until it apply colors to all the data. 
- background : colors for the background of the data curve.
- border : colors for the border of the data curve. 

## Data 

### Yaxies 
Specifies how many stacks/layers Y  of axes will  be displayed  and what type they will be 

> [!note] 
> to display 3 stacks of Y axes 
> Yaxises = {
> y                 : "check",
> y2				: "check",
> y3				: "Value",
> y4			    :  "Value",
> }
> ![[80-Gallery/Screenshot_20230520_193622.png]]


### Properties
A list/Array of objects that contain important information about what values to look for, and how to display them.

> [!note]
> Order Matters
> The order of how objects are places, is the order of how the data is going to be displayed, layered or stack on top of each other. 

Each object in the List/ Array have to specify what the variable to look for, whether to store the values as a sum of all values or as the average of the values, what Y/X axes it should be displayed on, what stack it is displayed on, and what is the Target value to measure the actual value against. 


> [!note] 
> [[99-Templates/Habit Tracking Documentation#Yaxies|Yaxises object]] values and [[99-Templates/Habit Tracking Documentation#Properties|Propeties]] values have to be edited per file in the current state.
> current files are 
> [[90-CustomJS/01-DialyCharts.js|01-DialyCharts]]
> [[90-CustomJS/02-WeeklyCharts.js|02-WeeklyCharts]]
> [[90-CustomJS/03-MonthlyCharts.js|03-MonthlyCharts]]



#### Label
It is the name of the variable that the script is going to look for in metadata of files we are going through.

#### Target
measures the real value against the expected value. 
this is used so that the graph display data in a more understandable form, and to avoid the problem of displaying very high values along with very low values. 

The data displayed in the graph, is going to be the percentage of the real value compared to the target value. 

> [!note]
> Set a target of how many hours of read I expect to do, and my weight for the week.
> properties=[
> {
>	label           : 'reading',
>	Target			: 5,
> },
> {
>	label           : 'weight',
>	Target			: 60,
> }
> ]
> lets imagine that we have those values 
> weight : 94 , 95 , 95 , 94 , 94
> reading : 2 , 2 , 4 , 3 , 1
> ![[80-Gallery/Screenshot_20230521_224028.png]]
> this makes it harder to understand the graph, so instead we compare those values to the target and display them in the same Y-axies
> it is much easier to understand the graph
> ![[80-Gallery/Screenshot_20230521_224053.png]]

#### Scatter
specifies the style it will display data in for more information check [ChartJS](https://www.chartjs.org/).

#### chart
What type of value to expect from the variable weather its a Numerical or Categorical 
take the values that are found in [[99-Templates/Habit Tracking Documentation#Chart|The Charts]] object. 

#### yAxisID
specifies the Y axes layer it will be displayed in those values should match the the values in the [[99-Templates/Habit Tracking Documentation#Yaxies|Yaxises object]] 

current setups


### Average
this property tells the script to write this value's average in the current file instead of writing the total of the value, a good example for this is that I would want to know my average weight for the current week/month, not the total value of my weight. 

takes either : `true` or `false` value

## Displaying charts 
I already have 3 templates that have the necessary data to track days by weeks, weeks by months, and months by days. 
But I know Not every one is going to use the same setup so here I'll attempt to explain how the code block works.

The raw setup should look something like this.

Currently, for this to work it has to be a `dataviewjs` code block, and you have to call functions with the `customJS` plugin, and you have to call specific functions from specific classes, one for displaying Daily notes information, one for displaying weekly notes information and one for Monthly notes information. 

You can display a year's data either by daily notes, or weekly notes, or monthly notes. 
the reason I made it this way ; is to provide different options, but also to avoid overcrowding the charts with data points and labels. 

- A Year can be display months data, weeks data, or days data.
- A month can be display weeks data, or days data.
- A week can only display days data.

And Just to stay safe I'll include a setup example for all those cases with comments in the setup code to explain what  needs to be explained 

> [!important] Things might change in the future.
> the setup is might change in the future, as I'm still trying to make it more simple, easier to understand and easier to modify.



### Displaying Week data
> [!note]
> List/Display data for the week by days
>
>```dataviewjs
> customJS.DvDailyCharts.renderWeek({	
>	dv, // important to include the dataview plugin so it can gather data
>	block: this, // important to tell the script to draw the charts in the current code block
>	setValues: true, // Option to write the values into the current file or not. (this writes the totals values or the average values according to how you specifies that in the [[99-Templates/Habit Tracking Documentation#Properties|Properties]] of those files)
>	
>	Date: "2020-W15", // Date want to track, this can be a week, or month. ( in this case the week )
>	DateFormat: "YYYY-[W]ww", // Date Format (this is according [momentjs](https://momentjs.com/docs/))
>	DocumentFormat: "YYYY-MM-DD", // the date format  for the names of the files you want to get its data (in this case Daily notes Naming format)
>	labelFormat:"dddd", // the date format for the labels of the files you want to display (in this case this changes the name of the file to the name of the corresponding day)
>	
>	group: "#diary",  // Specifies where to look for data, or what types of files to look for to get the data from,  could be a path, or could be a tag
>	types: { // this includes objects that tells the script what kind of charts to display, and how to display the data in those charts, there are only 3, line, bar, table.
>		"line" : {// display a line chart
>			stacked : true, // if the chart is going to stacked or not ( this will overwrite the stack property for every chart data).
>			target	: false, // if the data is going to measured against a target.
>		},
>		"bar" : { // display a bar chart
>			stacked : false,
>			target	: false,
>		},
>		"table" : { // display a table 
>			stacked : false,
>			target	: true,
>		},
>	},
> })
> ```

### Displaying Months data
> [!note]
> List/Display data for the Month by days
>
> ```dataviewjs
> customJS.DvDailyCharts.renderMonth({	
>	dv, // important to include the dataview plugin so it can gather data
>	block: this, // important to tell the script to draw the charts in the current code block
>	setValues: true, // Option to write the values into the current file or not. (this writes the totals values or the average values according to how you specifies that in the [[99-Templates/Habit Tracking Documentation#Properties|Properties]] of those files)
>	
>	Date: "2020-01", // Date want to track, this can be a week, or month. ( in this case the month )
>	DateFormat: "YYYY-MM", // Date Format (this is according [momentjs](https://momentjs.com/docs/))
>	DocumentFormat: "YYYY-MM-DD", // the date format  for the names of the files you want to get its data (in this case Daily notes Naming format)
>	labelFormat:"DD", // the date format for the labels of the files you want to display (in this case this changes the name of the file to the number of the corresponding day of the month)
>	
>	group: "#diary",  // Specifies where to look for data, or what types of files to look for to get the data from,  could be a path, or could be a tag
>	types: { // this includes objects that tells the script what kind of charts to display, and how to display the data in those charts, there are only 3, line, bar, table.
>		"line" : {// display a line chart
>			stacked : true, // if the chart is going to stacked or not ( this will overwrite the stack property for every chart data).
>			target	: false, // if the data is going to measured against a target.
>		},
>		"bar" : { // display a bar chart
>			stacked : false,
>			target	: false,
>		},
>		"table" : { // display a table 
>			stacked : false,
>			target	: true,
>		},
>	},
>})
>```	


> [!note]
> List/Display data for the Month by weeks
>
>```dataviewjs
>customJS.DvWeeklyCharts.renderMonth({	
>	dv, // important to include the dataview plugin so it can gather data
>	block: this, // important to tell the script to draw the charts in the current code block
>	setValues: true, // Option to write the values into the current file or not. (this writes the totals values or the average values according to how you specifies that in the [[99-Templates/Habit Tracking Documentation#Properties|Properties]] of those files)
>	
>	Date: "2020-01", // Date want to track, this can be a week, or month. ( in this case the month )
>	DateFormat: "YYYY-MM", // Date Format (this is according [momentjs](https://momentjs.com/docs/))
>	DocumentFormat: "YYYY-[W]ww", // the date format  for the names of the files you want to get its data (in this case Weekly notes Naming format)
>	labelFormat:"YYYY-[W]ww", // the date format for the labels of the files you want to display (in this case this changes the name of the file to the number of the corresponding week of the month)
>	
>	group: "#Weekly",  // Specifies where to look for data, or what types of files to look for to get the data from,  could be a path, or could be a tag
>	types: { // this includes objects that tells the script what kind of charts to display, and how to display the data in those charts, there are only 3, line, bar, table.
>		"line" : {// display a line chart
>			stacked : true, // if the chart is going to stacked or not ( this will overwrite the stack property for every chart data).
>			target	: false, // if the data is going to measured against a target.
>		},
>		"bar" : { // display a bar chart
>			stacked : false,
>			target	: false,
>		},
>		"table" : { // display a table 
>			stacked : false,
>			target	: true,
>		},
>	},
>})
>```	


### Displaying Years Data

> [!note] List/Display data for the Year by days
>
>```dataviewjs
>customJS.DvDailyCharts.renderYear({	
>	dv, // important to include the dataview plugin so it can gather data
>	block: this, // important to tell the script to draw the charts in the current code block
>	setValues: true, // Option to write the values into the current file or not. (this writes the totals values or the average values according to how you specifies that in the [[99-Templates/Habit Tracking Documentation#Properties|Properties]] of those files)
>	
>	Date: "2020", // Date want to track, this can be a week, or month. ( in this case the Year )
>	DateFormat: "YYYY", // Date Format (this is according [momentjs](https://momentjs.com/docs/))
>	DocumentFormat: "YYYY-MM-DD", // the date format  for the names of the files you want to get its data (in this case Daily notes Naming format)
>	labelFormat:"MM-DD", // the date format for the labels of the files you want to display (in this case this changes the name of the file to the number of the corresponding month and day of the year)
>	
>	group: "#diary",  // Specifies where to look for data, or what types of files to look for to get the data from,  could be a path, or could be a tag
>	types: { // this includes objects that tells the script what kind of charts to display, and how to display the data in those charts, there are only 3, line, bar, table.
>		"line" : {// display a line chart
>			stacked : true, // if the chart is going to stacked or not ( this will overwrite the stack property for every chart data).
>			target	: false, // if the data is going to measured against a target.
>		},
>		"bar" : { // display a bar chart
>			stacked : false,
>			target	: false,
>		},
>		"table" : { // display a table 
>			stacked : false,
>			target	: true,
>		},
>	},
>})
>```	


> [!note]
> List/Display data for the Year by weeks
>
>```dataviewjs
>customJS.DvWeeklyCharts.renderYear({	
>	dv, // important to include the dataview plugin so it can gather data
>	block: this, // important to tell the script to draw the charts in the current code block
>	setValues: true, // Option to write the values into the current file or not. (this writes the totals values or the average values according to how you specifies that in the [[99-Templates/Habit Tracking Documentation#Properties|Properties]] of those files)
>	
>	Date: "2020", // Date want to track, this can be a week, or month. ( in this case the month )
>	DateFormat: "YYYY", // Date Format (this is according [momentjs](https://momentjs.com/docs/))
>	DocumentFormat: "YYYY-[W]ww", // the date format  for the names of the files you want to get its data ( in this case Weekly notes Naming format )
>	labelFormat:"[W]ww", // the date format for the labels of the files you want to display ( in this case this changes the name of the file to the number of the corresponding week of the year )
>	
>	group: "#Weekly",  // Specifies where to look for data, or what types of files to look for to get the data from,  could be a path, or could be a tag
>	types: { // this includes objects that tells the script what kind of charts to display, and how to display the data in those charts, there are only 3, line, bar, table.
>		"line" : {// display a line chart
>			stacked : true, // if the chart is going to stacked or not ( this will overwrite the stack property for every chart data).
>			target	: false, // if the data is going to measured against a target.
>		},
>		"bar" : { // display a bar chart
>			stacked : false,
>			target	: false,
>		},
>		"table" : { // display a table 
>			stacked : false,
>			target	: true,
>		},
>	},
>})
>```	


> [!note]
> List/Display data for the Year by Month
>
>```dataviewjs
>customJS.DvMonthlyCharts.renderYear({	
>	dv, // important to include the dataview plugin so it can gather data
>	block: this, // important to tell the script to draw the charts in the current code block
>	setValues: true, // Option to write the values into the current file or not. (this writes the totals values or the average values according to how you specifies that in the [[99-Templates/Habit Tracking Documentation#Properties|Properties]] of those files)
>	
>	Date: "2020-01", // Date want to track, this can be a week, or month. ( in this case the month )
>	DateFormat: "YYYY-MM", // Date Format (this is according [momentjs](https://momentjs.com/docs/))
>	DocumentFormat: "YYYY-MM", // the date format  for the names of the files you want to get its data (in this case Monthly notes Naming format)
>	labelFormat:"MMMM", // the date format for the labels of the files you want to display (in this case this changes the name of the file to the name of the corresponding month of the year)
>	
>	group: "#Monthly",  // Specifies where to look for data, or what types of files to look for to get the data from, could be a path, or could be a tag.
>	types: { // this includes objects that tells the script what kind of charts to display, and how to display the data in those charts, there are only 3, line, bar, table.
>		"line" : {// display a line chart
>			stacked : true, // if the chart is going to stacked or not ( this will overwrite the stack property for every chart data).
>			target	: false, // if the data is going to measured against a target.
>		},
>		"bar" : { // display a bar chart
>			stacked : false,
>			target	: false,
>		},
>		"table" : { // display a table 
>			stacked : false,
>			target	: true,
>		},
>	},
>})
>```	
