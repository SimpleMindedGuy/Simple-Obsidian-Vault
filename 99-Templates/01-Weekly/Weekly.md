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
🗓️: <%   tp.date.now ("") %>
🖋️: 
🏷️: 
tags: 
 - "Weekly"
alias: 
 - "{{date: YYYY-[W]ww}}"

dayName: "{{date: dddd}}"
day: {{ date: DD }}

monthNmber: "{{date: MMMM}}"
month: {{ date: MM }} 

week: {{ date: ww }}
year: {{ date: YYYY }}

banner: "![[80-Gallery/Banner/youtube banner.png]]"
banner_icon: 📊
---
# Title
Week :{{date: ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}



## Days
###  <%moment(tp.file.title).weekday(0).format("dddd")%>
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(0).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(0).format("dddd")%>'s note]]

###  <%moment(tp.file.title).weekday(1).format("dddd")%>
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(1).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(1).format("dddd")%>'s note]]


###  <%moment(tp.file.title).weekday(2).format("dddd")%>
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(2).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(2).format("dddd")%>'s note]]


###  <%moment(tp.file.title).weekday(3).format("dddd")%>
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(3).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(3).format("dddd")%>'s note]]


###  <%moment(tp.file.title).weekday(4).format("dddd")%>
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(4).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(4).format("dddd")%>'s note]]


###  <%moment(tp.file.title).weekday(5).format("dddd")%>
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(5).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(5).format("dddd")%>'s note]]

###  <%moment(tp.file.title).weekday(6).format("dddd")%>
[[/00-Daily/<%moment(tp.file.title,"YYYY-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"YYYY-[W]ww").weekday(6).format("YYYY-MM-DD") %>|<%moment(tp.file.title).weekday(6).format("dddd")%>'s note]]




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
			stacked : false,
			target	: true,
		},
		"table" : {
			stacked : false,
			target	: false,
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