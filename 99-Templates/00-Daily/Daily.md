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
 - "diary"
aliases:
 - "{{date: YYYY-MM-DD}}"

dayName: "{{date: dddd}}"
day: {{ date: DD }}

monthNmber: "{{date: MMMM}}"
month: {{ date: MM }} 

week: {{ date: ww }}
year: {{ date: YYYY }}

banner: "![[80-Gallery/Banner/Writing-beginners.png]]"
banner_icon: 📆
---
# Title
{{date: dddd - [W]ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}


{{{:::
<%* tp.user.NewDocument(tp,true) %>

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
Enter Today's Title ?
}

Input :=> 🏷️

Dialog :=> {
What tags you want to use ?
}

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags

Dialog :=> {
Aliases
}

List :=> aliases

Menu :=> ['😡 rage','😒 bitter','😭 sad','😫 frustrated','😨 scared','😶 lonely','😖 Guilty','😞 disappointed','😓 hopeless','😟 worried','😮‍💨 exhausted','😖 anxious','🤢 sick','😄 happy','😆 satisfied','😲 surprised','😂 joyful','😐 ok']

Option :=> 😶

BuildInFile :=>

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

## Today's Taks
- [ ] tidy up the room. 
- [ ] Pray Fajhr
- [ ] Eat breakfast
- [ ] 20 Pages of the Qur'an
- [ ] Pray Duhr
- [ ] 1 Hour Math
- [ ] 1 Hour Reading
- [ ] Pray Asr
- [ ] 2-4 Hours Project
- [ ] Pray Maghrib
- [ ] Pray Isha


```button
name Diary Media
type append template
action Commands/MoveDiaryMedia
templater true
```
^DiaryMedia