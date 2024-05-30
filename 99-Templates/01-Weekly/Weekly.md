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
 - Weekly
aliases:
 - "<% tp.date.now("YYYY-[W]ww",0,tp.file.title, "YYYY-[W]ww")%>"

monthName: "<% tp.date.now("MMMM",0,tp.file.title, "YYYY-[W]ww")%>"

month: "<% tp.date.now("MMMM",0,tp.file.title, "YYYY-[W]ww")%>"
week: "<% tp.date.now("ww",0,tp.file.title, "YYYY-[W]ww")%>"
year: "<% tp.date.now("YYYY",0,tp.file.title, "YYYY-[W]ww")%>"

banner: "[[80-Gallery/Banner/Progress.png]]"
banner_icon: 📊
---
# !(🏷️)
Week :{{date: ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}

<% tp.date.now("[W]ww / MM - MMMM / YYYY  - hh:mm a",0,tp.file.title, "YYYY-[W]ww")%>



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


	group: "#Daily",
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

<%* tp.user.NewDocument(tp,true) %>

{{{:::


Dialog :=> {
Books to refer to if any
}

SetSearchQuery :=> ("/")
SetSearchKey :=> 📚
GetQueryList :=> menu

SetSearchQuery :=> #Book And #Description
SetSearchKey :=> 🏷️
GetQueryList :=> menu2

Menu :=> [!(menu),!(menu2)]

OptionsAdd :=> 📚

Dialog :=> {
What tags you want to use ?
}


SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags

Dialog :=> {
What Aliases you want to use ?
}

List :=> aliases


Menu :=> [!(menu)]

OptionsAdd :=> tags

List :=> tags

Dialog :=> {
Week's title
}

Input :=> 🏷️

BuildInFile :=>

:::}}}


