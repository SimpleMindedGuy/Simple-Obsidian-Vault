---
🌐: 
⚖️: 
🏋️‍♂️: 
📖: 
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
😶: 
🗓️: 
🖋️: 
🏷️: 
tags: 
 - diary
alias: 
 - {{date: YYYY-MM-DD}}

day: {{date: dddd}} 
dayNumber: {{date: DD}} 
month: {{date: MMMM}} 
monthNumber: {{date: MM}} 
week: {{date: ww}}
year: {{date: YYYY}}
banner: "![[80-Gallery/Banner/Writing-beginners.png]]"
banner_icon: 📆

---
# Title
{{date: dddd - [W]ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}


{{{:::
<%* tp.user.NewDocument(tp,true) %>

CreateDateKey : => 🗓️
LastUpdatedKey :=> 🖋️
TitleKey :=> 🏷️

Dialog : {
how much did you weight today
}
Input :=> ⚖️

Dialog : {
Did you go to the gym today ?
}
Check :=> 🏋️‍♂️

Dialog : {
Did you read the Quran today ? 
}
Check :=> 📖

Dialog : {
how many reading hours  hours ?
}
Input :=> 📕

Dialog : {
how many work hours
}
Input :=> 💼

Dialog : {
How many projects work hours
}
Input :=> 💻

Dialog : {
Prayers today ? 0-5
}
Input :=> 🕌

Dialog : {
How many bad things done today ?
}
Input :=> ⛔

Dialog : {
How many meals did you eat today
}
input :=> 🍱

Dialog : {
how much candy/sweets did you eat today ? 
}
Input :=> 🍩

Dialog : {
how much tea did you drink today (cups)
}
input :=> 🍵

Dialog : {
Money Gained today?
}
input :=> 💰

Dialog : {
Money Spent
}
input :=> 💵

Dialog : {
Items bought
}
input :=> 💳

Dialog : {
Enter Today's Title
}
Input :=> 🏷️

Dialog : {
Tags
}
List :=> tags

Dialog : {
Aliases
}
List :=> alias

Select: ['😡 rage','😒 bitter','😭 sad','😫 frustrated','😨 scared','😶 lonely','😖 Guilty','😞 disappointed','😓 hopeless','😟 worried','😮‍💨 exhausted','😖 anxious','🤢 sick','😄 happy','😆 satisfied','😲 surprised','😂 joyful','😐 ok'] => 😶

BuildInFile :=>

Stop : =>
:::}}}

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


```button
name Diary Media
type append template
action Commands/MoveDiaryMedia
templater true
```
^DiaryMedia