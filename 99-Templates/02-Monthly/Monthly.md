---
🌐: ""
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
🏷️: ""
tags:
 - Monthly
aliases:
 - "<% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM")%>"

monthName: "<% tp.date.now("MMMM",0,tp.file.title, "YYYY-MM")%>"
month: <% tp.date.now("MM",0,tp.file.title, "YYYY-MM")%>
year: <% tp.date.now("YYYY",0,tp.file.title, "YYYY-MM")%>

banner: "[[80-Gallery/Banner/Writing.png]]"
banner_icon: 📆
---
# !(🏷️)
<% tp.date.now("MM - MMMM / YYYY  - hh:mm a",0,tp.file.title, "YYYY-MM")%>


## Days

<%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY") %>

[[/01-Weekly/<%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY") %>/<%moment(tp.file.title,"YYYY-MM").add(1,'weeks').format("YYYY-[W]ww") %>|<%moment(tp.file.title,"YYYY-MM").add(1,'weeks').format("YYYY-[W]ww") %>]]
[[/01-Weekly/<%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY") %>/<%moment(tp.file.title,"YYYY-MM").add(2,'weeks').format("YYYY-[W]ww") %>|<%moment(tp.file.title,"YYYY-MM").add(2,'weeks').format("YYYY-[W]ww") %>]]
[[/01-Weekly/<%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY") %>/<%moment(tp.file.title,"YYYY-MM").add(3,'weeks').format("YYYY-[W]ww") %>|<%moment(tp.file.title,"YYYY-MM").add(3,'weeks').format("YYYY-[W]ww") %>]]
[[/01-Weekly/<%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY") %>/<%moment(tp.file.title,"YYYY-MM").add(4,'weeks').format("YYYY-[W]ww") %>|<%moment(tp.file.title,"YYYY-MM").add(4,'weeks').format("YYYY-[W]ww") %>]]
[[/01-Weekly/<%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY") %>/<%moment(tp.file.title,"YYYY-MM").add(5,'weeks').format("YYYY-[W]ww") %>|<%moment(tp.file.title,"YYYY-MM").add(5,'weeks').format("YYYY-[W]ww") %>]]






## Habit tracking by week
```dataviewjs


customJS.DvWeeklyCharts.renderMonth({
	dv,
	block: this,
	setValues : true,
	
	Date: "<%moment(tp.file.title,'YYYY-MM').format('YYYY-MM')%>",
	DateFormat: "YYYY-MM",
	DocumentFormat :"YYYY-[W]ww",
	labelFormat : "YYYY-[W]ww",
	
	group: "#Weekly",
	type: "line",
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

## Habit tracking by day
```dataviewjs


customJS.DvDailyCharts.renderMonth({
	dv,
	block: this,
	setValues : false,
	
	Date: "<%moment(tp.file.title,'YYYY-MM').format('YYYY-MM')%>",
	DateFormat: "YYYY-MM-DD",
	DocumentFormat :"YYYY-MM-DD",
	labelFormat : "YYYY-MM-DD",
	
	group: "#Daily",
	type: "line",
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


{{{:::

<%* tp.user.main(true) %>



Dialog :=>{
Month's title
}
Input :=> 🏷️

Dialog :=> {
Add tags that for this month 
}

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]


OptionsAdd :=> tags


Dialog :=> {
Any aliases for this monthly note ?
}

List :=> aliases


Dialog :=> {
Add books you have read this month
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