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
 - "<% tp.date.now("YYYY",0,tp.file.title, "YYYY")%>"

year: <% tp.date.now("YYYY",0,tp.file.title, "YYYY")%>

banner: "[[80-Gallery/Banner/Writing.png]]"
banner_icon: 📆
---
# !(🏷️)
<% tp.date.now("YYYY  - hh:mm a",0,tp.file.title, "YYYY")%>




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
Names to refer to the document
Alias :
}

List :=> aliases

Dialog :=> {
Names to refer to the document
Tags :
}

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags

List :=> tags

Dialog :=>{
Enter year's title
}
Input :=> 🏷️

BuildInFile :=>

:::}}}