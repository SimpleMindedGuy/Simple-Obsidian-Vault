---
🌐: 
⚖️: 
🏋️‍♂️: false
📖: false
📕: 
🍱: 
🍩: 
🍵: 
💼: 
💻: 
💰: 
💵: 
💳: 
🕌: 
⛔: 
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


talk about your day and thoughts in the moment

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


- [ ] tidy up the room.  📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Pray Fajhr 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Eat breakfast 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] 20 Pages of the Qur'an 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Pray Duhr 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] 1 Hour Math 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] 1 Hour Reading 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Pray Asr 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] 2-4 Hours Project 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Pray Maghrib 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>
- [ ] Pray Isha 📆 <% tp.date.now("YYYY-MM-DD",0,tp.file.title, "YYYY-MM-DD")%>


```button
name Diary Media
type append template
action 99-Commands/MoveDiaryMedia
templater true
```
^DiaryMedia

<%* tp.user.main(true) %>

{{{:::

Dialog :=> {
how much did you weight today
}

Input :=> ⚖️

Dialog :=> {
Did you go to the gym today ?
}

Check :=> 🏋️‍♂️

Dialog :=> {
Did you read the Quran today ? 
}

Check :=> 📖

Dialog :=> {
how many reading hours ?
}

Input :=> 📕

Dialog :=> {
how many work hours ?
}

Input :=> 💼

Dialog :=> {
How many projects work hours ?
}

Input :=> 💻

Dialog :=> {
Prayers today ? 0-5
}

Input :=> 🕌

Dialog :=> {
How many bad things done today ?
}

Input :=> ⛔

Dialog :=> {
How many meals did you eat today ?
}
Input :=> 🍱

Dialog :=> {
how much candy/sweets did you eat today ? 
}

Input :=> 🍩

Dialog :=> {
how much tea did you drink today (cups) ?
}

Input :=> 🍵

Dialog :=> {
Money Gained today ?
}

Input :=> 💰

Dialog :=> {
Money Spent ?
}
Input :=> 💵

Dialog :=> {
How many items you bought today ?
}

Input :=> 💳


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