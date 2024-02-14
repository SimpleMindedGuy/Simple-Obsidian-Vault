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
🗓️: <%   tp.date.now ("") %>
🖋️: 2023-12-26T18:21:40+03:00
🏷️: 
tags:
 - Yearly
aliases:
 - "{{date: YYYY}}"
dayName: "{{date: dddd}}"
day: "{ date: DD }": 
monthNmber: "{{date: MMMM}}"
month: "{ date: MM }": 
week: "{ date: ww }": 
year: "{ date: YYYY }": 
banner: "![[80-Gallery/Banner/youtube banner5.png]]"
banner_icon: 🗓️
---
{{date: YYYY }}

# Title 



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
			stacked : false,
			target	: false,
		},
		"table" : {
			stacked : false,
			target	: false,
		},
	},
})
	
```





{{{:::
<%* tp.user.NewDocument(tp,true) %>
Input :=> 🏷️

Dialog :=> {
Books to refer to if any
}

SetSearchQuery :=> ("/")
SetSearchKey :=> 📚
GetQueryList :=> menu


SetSearchQuery :=> (" #Book And #Description ")
SetSearchKey :=> 🏷️
GetQueryList :=> menu2

Menu :=> [!(menu),!(menu2)]

OptionsAdd :=> 📚

Dialog :=> {
Names to refer to the document
Alias : 
}

List :=> aliases

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags


:::}}}