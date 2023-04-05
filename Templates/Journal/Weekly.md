---
🌐: 
⚖️: 
📖: 
📕:
⛔: 
😶: 
💻: 
🗓️: 
🖋️: 
🏷️: 
tags: 
 - Weekly
alias: 
 - {{date: YYYY-[W]ww}}
day: {{date:DD}} 
datName: {{date: dddd}}
week: {{date: ww}}
month: {{date: MM}} 
monthName: {{date: MMMM}}
year: {{date: YYYY}}
banner: "Banner/Writing-beginners.png"
---
# Title
Week :{{date: ww}} - {{date: MM - MMMM}} - {{date: DD/MM/YYYY - hh:mm a}}


## Days
[[/Journal/Daily/<%moment(tp.file.title).weekday(-8).format("YYYY-MM-DD") %>|Sunday]]
[[/Journal/Daily/<%moment(tp.file.title).weekday(-7).format("YYYY-MM-DD") %>|Monday]]
[[/Journal/Daily/<%moment(tp.file.title).weekday(-6).format("YYYY-MM-DD") %>|Tuesday]]
[[/Journal/Daily/<%moment(tp.file.title).weekday(-5).format("YYYY-MM-DD") %>|Wednesday]]
[[/Journal/Daily/<%moment(tp.file.title).weekday(-4).format("YYYY-MM-DD") %>|Thursday]]
[[/Journal/Daily/<%moment(tp.file.title).weekday(-3).format("YYYY-MM-DD") %>|Friday]]
[[/Journal/Daily/<%moment(tp.file.title).weekday(-2).format("YYYY-MM-DD") %>|Saturday]]

## Goals

## Tasks
#to-do
## Overview
```dataview
table without id
	file.link AS "Day",
	🏷️,
	⚖️ ,
	🏋️‍♂️,
	📖,
	📕,
	⛔,
	🕌,
	😶,
	💻,
	🥞,
	🍱,
	🍴,
	🍵
from "Journal/Daily"
WHERE week={{date: ww}} AND year ={{date: YYYY}} 
```

```dataviewjs
const data = dv.current()

const chartData = {
    type: 'bar',
    data: {
        labels: [data["⚖️"]],
        datasets: [
	        {
	            label: '⚖️',
	            data: [data["⚖️"]],
	            backgroundColor: [
	                'rgba(30, 51, 235, 0.2)'
	            ],
	            borderColor: [
	                'rgba(30, 51, 235, 1)'
	            ],
	            borderWidth: 2
	        },
	        {
	            label: '📕',
	            data: [data["📕"]],
	            backgroundColor: [
	                'rgba(148, 35, 247, 0.2)'
	            ],
	            borderColor: [
	                'rgba(148, 35, 247, 1)'
	            ],
	            borderWidth: 2
	        }
	        ,
	        {
	            label: '💻',
	            data: [data["💻"]],
	            backgroundColor: [
	                'rgba(30, 235, 112, 0.2)'
	            ],
	            borderColor: [
	                'rgba(30, 235, 112, 1)'
	            ],
	            borderWidth: 2
	        }
	        ,
	        {
	            label: '⛔',
	            data: [data["⛔"]],
	            backgroundColor: [
	                'rgba(197, 227, 48, 0.2)'
	            ],
	            borderColor: [
	                'rgba(197, 227, 48, 1)'
	            ],
	            borderWidth: 2
	        }
	        
        ]
    }
}

window.renderChart(chartData, this.container);
```

```button
name Sort Images
type append template
action Commands/MoveWeeklyMedia
templater true
```
^MoveProjectMedia