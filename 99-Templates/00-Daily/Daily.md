---
🌐: 
⚖️: 100 
🏋️‍♂️: false
📖: false
📕: 2 
🍱: 3
🍩: 3 
🍵: 2
💼: 0 
💻: 2 
💰: 0 
💵: 0 
💳: 0 
🕌: 5 
⛔: 0
😶: ""
🗓️: <%   tp.date.now ("") %>
🖋️: 
🏷️: ""
tags:
 - Daily
 - TODO
aliases:
 - "<% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>"
dayName: "<% tp.date.now("dddd",0,tp.file.title, "YYYY-MM-DD")%>"
monthName: "<% tp.date.now("MMMM",0,tp.file.title, "YYYY-MM-DD")%>"
day: <% tp.date.now("DD",0,tp.file.title, "YYYY-MM-DD")%>

month: <% tp.date.now("MM",0,tp.file.title, "YYYY-MM-DD")%>
week: <% tp.date.now("ww",0,tp.file.title, "YYYY-MM-DD")%>
year: <% tp.date.now("YYYY",0,tp.file.title, "YYYY-MM-DD" )%>


banner: "[[80-Gallery/Banner/Writing.png]]"
banner_icon: 📆
---
# !(🏷️)
<% tp.date.now("[W]ww / DD - dddd / MM - MMMM / YYYY",0,tp.file.title, "YYYY-MM-DD")%> - <% tp.date.now("hh:mm a") %>

## Introduction

```timekeep
{"entries":[]}
```
^timekeep

## What happened today 

## What I learned today
### What I thought about it then

### what I thought about it what

### Did I act well 

## Did I think about anything 
### What's my initial thought 

### Did I change my mind

## Final thoughts

### Things I want to change

### Talk about future

## Today's Tasks


### High priority
<% tp.user.GetPrayerTasks(
moment(tp.file.title,"YYYY-MM-DD").format("yyyy-MM-DD"), // date
"Jordan", // country
"Amman" // city
)
%>

- [ ] Read 5-20 Pages of the Quran  [priority:: high]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]


- Sleep [timeStamp:: 11:00 PM ] [priority:: high]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]

### Medium priority
- [ ] Tidy up the room [timeStamp::06:00 AM - 06:15 AM] [priority:: medium]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]
- [ ] Work Hours  [timeStamp::07:00 AM - 11:00 AM] [priority:: medium]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]
- [ ] Learn something (reading) for 1-2 Hours  [timeStamp::12:00 PM - 02:00 PM] [priority:: medium]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]
- [ ] Work on a project for 1-2 Hours  [timeStamp::03:00 PM - 05:00 PM] [priority:: medium]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]
- [ ] Write Journal [timeStamp::08:00 PM - 09:30 PM] [priority:: medium]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]

### Normal priority
- [ ] Take out the trash [priority:: normal]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>] 
- [ ] Read something to sleep  [timeStamp::09:30 PM - 11:00 PM] [priority:: normal]  [due:: <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>]


## Overview


> [!important] Tasks Done Today
> ```tasks
> 
> done on <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
> group by priority
> 
> ``` 

> [!failure] Cancelled  tasks
> ```tasks
> 
> CANCELLED on <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
> group by priority
> 
> ``` 


<%* tp.user.main(true) %>

{{{:::

Dialog :=> {
What tags you want to use ?
}


SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags



Dialog :=> {
General mood of the day
}

SetSearchQuery :=> ("/")
SetSearchKey :=> 😶
GetQueryList :=> menu

Menu :=> [!(menu)]

Options :=> 😶

Dialog :=> {
Enter Today's Title ?
}

Input :=> 🏷️


BuildInFile :=>

:::}}}


```button
name Diary Media
type append template
action 99-Commands/MoveDiaryMedia
templater true
```
^DiaryMedia