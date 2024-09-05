---
🌐: 
⚖️: 0 
🏋️‍♂️: false
📖: false
📕: 0 
🍱: 0 
🍩: 0 
🍵: 0 
💼: 0 
💻: 0 
💰: 0 
💵: 0 
💳: 0 
🕌: 0 
⛔: 0
😶: ""
🗓️: <%   tp.date.now ("") %>
🖋️: 
🏷️: ""
tags:
 - Daily
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


```timekeep
{"entries":[]}
```

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

### Medium priority
- [ ] Tidy up the room 🔼 📅 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Write Journal  🔼 📅 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Learn something (reading) for 1-2 Hours 🔼 📅 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%> 
- [ ] Work on a project for 1-2 Hours  🔼  📅 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Read 5-20 Pages of the Quran  🔼  📅 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>

### Normal priority
- [ ] Take out the trash 📅 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>

### Tasks done today

> [!important] Today's tasks
> ```tasks
> 
> done on <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
> 
> ``` 

```button
name Diary Media
type append template
action 99-Commands/MoveDiaryMedia
templater true
```
^DiaryMedia


{{{:::

<%* tp.user.main(true) %>
Dialog :=> {
how much did you weight today
}


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

