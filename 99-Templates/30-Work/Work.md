{{{:::
Dialog :=> {
Chose Type of work.
}
Menu :=> [FreeLancing,Employment]
SelectLayer :=> 🎟️


Dialog :=> {
Who is your Customer/Company you are doing this work for
}

SetSearchQuery :=> #Work and #Description
SetSearchKey :=> 👔
GetQueryList :=> menu


SetSearchQuery :=> #People and #Description
SetSearchKey :=> 🏷️
GetQueryList :=> menu

Menu :=> [!(menu)]

SelectAdd :=> 👔

AddLayer :=> !(👔)


Dialog :=> {
What is your role.
}

Menu :=>[Front-End,Back-End,Full-Stack,Design,Engineer]
Select :=> 📇


Dialog :=> {
Project Name
}
Input :=> 🏷️

Dialog :=> {
Any aliases for this work ?
}
List :=> aliases

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

Dialog :=> {
Add tags for this job
Alias : 
}
OptionsAdd :=> tags


BuildDocument :=>
:::}}}


