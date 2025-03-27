{{{:::
Dialog :=> {
Chose !(🎫) type 
}

Menu :=>  [Health,Addiction,Mental] 
Select :=> 🎟️


Dialog :=> {
Document's Name / Title
}
Input :=> 🏷️

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

Dialog :=> {
Add Tags to this  !(🎟️) 's !(🎫)
}
OptionsAdd :=> tags

Dialog :=> {
Add books / documentations to this document
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
Add Document's Aliases
}
List :=> aliases

BuildDocument :=>


:::}}}
