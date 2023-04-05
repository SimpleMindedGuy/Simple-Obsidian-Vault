---
banner: "Banner/Writing-beginners.png"
🌐: 
⚖️: 
🏋️‍♂️: 
📖: 
📕:
⛔: 
🕌: 
😶: 
🥞:
🍱:
🍴:
🍵:
💻:
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
---
# Title
{{date: dddd - [W]ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}

<%* tp.user.NewDocument(tp,true) %>

CreateDateKey : => 🗓️
LastUpdatedKey :=> 🖋️
TitleKey :=> 🏷️


Dialog : {
Enter weight
}
Input :=> ⚖️

Dialog : {
Did you go to the gym today ?
}
Check :=> 🏋️‍♂️

Dialog : {
Did you read the qur'an today ? 
}
Check :=> 📖

Dialog : {
Reading hours ?
}
Input :=> 📕

Dialog : {
Working Hours ?
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
Enter Today's Title
}
Input :=> 🏷️

Dialog : {
Tags
}
List :=> tags

BuildInFile :=>

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