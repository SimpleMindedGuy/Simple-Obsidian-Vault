---
🌐: 
⚖️:  
📕:  
📖:  
🕌:  
🥞:  
🍩:  
🍱:  
🍴:  
💼:  
💻:  
🏦:  
💰:  
💸:	 
💳:  
💵:  
🍵:  
🏋️‍♂️:  
⛔:  
😶: 
🗓️: 
🖋️: 
🏷️: 
tags: 
 - Weekly
alias: 
 - {{date: YYYY-[W]ww}}
day: {{date:DD}} 
datName: {{date: dddd}}
week: {{date: ww}}
month: {{date: MM}} 
monthName: {{date: MMMM}}
year: {{date: YYYY}}
banner: "![[80-Gallery/Banner/descriptionbanner.png]]"
banner_icon: 📊
---
# Title
Week :{{date: ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}

## Days
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(0).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(0).format("dddd")%>]]
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(1).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(1).format("dddd")%>]]
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(2).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(2).format("dddd")%>]]
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(3).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(3).format("dddd")%>]]
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(4).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(4).format("dddd")%>]]
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(5).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(5).format("dddd")%>]]
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(6).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(6).format("dddd")%>]]

## Overview


```dataviewjs


customJS.DvDailyCharts.renderWeek({	
	dv,
	Target:true,
	block: this,
	setValues: true,
	

	Date: "<%moment(tp.file.title,'YYYY-[W]ww').format('YYYY-[W]ww')%>",
	DateFormat: "YYYY-[W]ww",
	DocumentFormat: "YYYY-MM-DD",
	labelFormat:"dddd",


	group: "#diary",
	types: {
		"line" : {
			stacked : true,
			target	: true,
		},
		"bar" : {
			stacked : false,
			target	: false,
		},
		"table" : {
			stacked : false,
			target	: true,
		},
	},
})

```


```button
name Sort Images
type append template
action Commands/MoveWeeklyMedia
templater true
```
^MoveProjectMedia