---
🌐: 
⚖️: 
📕: 
📖: 
🕌: 

🍩: 
🍱: 

💼: 
💻: 
🏦: 
💰: 
 
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
 - "<% tp.date.now("gggg-[W]ww",0,tp.file.title, "gggg-[W]ww")%>"

monthName: "<% tp.date.now("MMMM",0,tp.file.title, "gggg-[W]ww")%>"
month: "<% tp.date.now("MM",0,tp.file.title, "gggg-[W]ww")%>"
week: "<% tp.date.now("ww",0,tp.file.title, "gggg-[W]ww")%>"
year: "<% tp.date.now("YYYY",0,tp.file.title, "gggg-[W]ww")%>"

banner: "[[80-Gallery/Banner/Progress.png]]"
banner_icon: 📊
---
# !(🏷️)
Week :{{date: ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}

<% tp.date.now("[W]ww / MM - MMMM / YYYY  - hh:mm a",0,tp.file.title, "gggg-[W]ww")%>



## Days
###  <%moment(tp.file.title).weekday(0).format("dddd")%>

![[/00-Daily/<%moment(tp.file.title,"gggg-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"gggg-[W]ww").weekday(0).format("gggg-MM-DD") %>#Introduction]]

###  <%moment(tp.file.title).weekday(1).format("dddd")%>

![[/00-Daily/<%moment(tp.file.title,"gggg-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"gggg-[W]ww").weekday(1).format("gggg-MM-DD") %>#Introduction]]


###  <%moment(tp.file.title).weekday(2).format("dddd")%>

![[/00-Daily/<%moment(tp.file.title,"gggg-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"gggg-[W]ww").weekday(2).format("gggg-MM-DD") %>#Introduction]]


###  <%moment(tp.file.title).weekday(3).format("dddd")%>

![[/00-Daily/<%moment(tp.file.title,"gggg-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"gggg-[W]ww").weekday(3).format("gggg-MM-DD") %>#Introduction]]

###  <%moment(tp.file.title).weekday(4).format("dddd")%>

![[/00-Daily/<%moment(tp.file.title,"gggg-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"gggg-[W]ww").weekday(4).format("gggg-MM-DD") %>#Introduction]]


###  <%moment(tp.file.title).weekday(5).format("dddd")%>

![[/00-Daily/<%moment(tp.file.title,"gggg-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"gggg-[W]ww").weekday(5).format("gggg-MM-DD") %>#Introduction]]


###  <%moment(tp.file.title).weekday(6).format("dddd")%>

![[/00-Daily/<%moment(tp.file.title,"gggg-[W]ww").format("YYYY") %>/<%moment(tp.file.title,"gggg-[W]ww").weekday(6).format("gggg-MM-DD") %>#Introduction]]


## Week's Tasks
- [ ] Clean The room [start:: <% moment(tp.file.title,"gggg-[W]ww").weekday(4).format("gggg-MM-DD")%>] [scheduled:: <% moment(tp.file.title,"gggg-[W]ww").weekday(5).format("gggg-MM-DD")%>] [due:: <% moment(tp.file.title,"gggg-[W]ww").weekday(6).format("gggg-MM-DD")%>]
- [ ] Write a weekly note [scheduled:: <% moment(tp.file.title,"gggg-[W]ww").weekday(5).format("gggg-MM-DD")%>] [due:: <% moment(tp.file.title,"gggg-[W]ww").weekday(6).format("gggg-MM-DD")%>]


## Overview

> [!TODO] TODO this week
> ```tasks
> due in <%moment(tp.file.title,"gggg-[W]ww").weekday(0).format("gggg-MM-DD") %> <%moment(tp.file.title,"gggg-[W]ww").weekday(6).format("gggg-MM-DD") %>
> 
>  filter by function task.status.type === "TODO" || task.status.type === "IN_PROGRESS"
> 
> group by priority
> 
> ```

```dataviewjs

customJS.DvDailyCharts.renderWeek({	
	dv,
	Target:true,
	block: this,
	setValues: true,
	
	Date: "<% tp.date.now("gggg-[W]ww",0,tp.file.title, "gggg-[W]ww")%>",
	DateFormat: "yyyy-[W]ww",
	DocumentFormat: "yyyy-MM-DD",
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

> [!success] Done this week
> ```tasks
> 
> done in <%moment(tp.file.title,"gggg-[W]ww").weekday(0).format("gggg-MM-DD") %> <%moment(tp.file.title,"gggg-[W]ww").weekday(6).format("gggg-MM-DD") %>
> 
> group by priority
> 
> ```

> [!failure] Canceled this week
> ```tasks
> 
> cancelled in <%moment(tp.file.title,"gggg-[W]ww").weekday(0).format("gggg-MM-DD") %> <%moment(tp.file.title,"gggg-[W]ww").weekday(6).format("gggg-MM-DD") %>
> 
> group by priority
> 
> ```


{{{:::

<%* tp.user.main(true) %>


Dialog :=> {
This week's title.
}

Input :=> 🏷️

Dialog :=> {
Add tags for this week 
}


SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags


Dialog :=> {
Any aliases for this week ?
}

List :=> aliases


Dialog :=> {
Add books have you read during this week
}

SetSearchQuery :=> ("/")
SetSearchKey :=> 📚
GetQueryList :=> menu

SetSearchQuery :=> #Book And #Description
SetSearchKey :=> 🏷️
GetQueryList :=> menu2

Menu :=> [!(menu),!(menu2)]

OptionsAdd :=> 📚

BuildInFile :=>

:::}}}


