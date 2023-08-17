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
 - Monthly
alias: 
 - <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY-MM") %>
day: <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("DD") %>
dayName: <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("dddd") %>
week: <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("ww") %>
month: <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("MM") %> 
monthName: <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("MMMM") %>
year: <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY") %>
banner: "![[80-Gallery/Banner/youtube banner.png]]"
banner_icon: 🗓️
---

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
	
	properties,
	group: "#Weekly",
	type: "line",
	types: {
		"line" : {
			stacked : true,
			target	: false,
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
	Yaxises,
})
```

