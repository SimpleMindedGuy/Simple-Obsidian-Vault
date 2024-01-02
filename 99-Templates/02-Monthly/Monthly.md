---
🌐: ""
⚖️: 
📕: 
📖: 
🕌: 
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
🏷️: "" 
tags: 
 - Monthly
alias: 
 - <%moment(tp.file.title,"YYYY-MM").add(0,'weeks').format("YYYY-MM") %>


dayName: "{{date: dddd}}"
day: {{ date: DD }}

monthNmber: "{{date: MMMM}}"
month: {{ date: MM }} 

week: {{ date: ww }}
year: {{ date: YYYY }}

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

