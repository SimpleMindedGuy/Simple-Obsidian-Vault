---
🌐: 
⚖️: 
📕: 
⛔: 
🕌: 
🍩: 
🍴: 
💻: 
💳: 
💵: 
💰: 
🏋️‍♂️: 
💼: 
🏦: 
💸: 
📖: 
🥞: 
🍱: 
🍵: 
😶: 
🗓️: 
🖋️: 
🏷️: 
tags: 
 - Yearly
alias: 
 - {{date: YYYY}}
year: {{date: YYYY}}
banner: "![[80-Gallery/Banner/youtube banner5.png]]"
banner_icon: 🗓️
---
{{date: YYYY }}


[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-01").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-01").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-02").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-02").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-03").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-03").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-04").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-04").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-05").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-05").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-06").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-06").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-07").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-07").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-08").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-08").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-09").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-09").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-10").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-10").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-11").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-11").format("MMMM")%>]]
[[/02-Monthly/{{date: YYYY}}/<%moment("{{date: YYYY}}-12").format("YYYY-MM")%>|<%moment("{{date: YYYY}}-12").format("MMMM")%>]]


## Habit tracking by month
```dataviewjs


customJS.DvMonthlyCharts.renderYear({

	dv,
	block: this,
	//setValues : true,
	
	Date: "<%moment(tp.file.title,'YYYY').format('YYYY')%>",
	DateFormat: "YYYY",
	DocumentFormat :"YYYY-MM",
	labelFormat : "MMMM",
	
	group: "#Monthly",
	type: "line",
	types: {
		"line" : {
			stacked : true,
			target	: false,
		},
		"table" : {
			stacked : false,
			target	: false,
		},
	},
})
	
```





