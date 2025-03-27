{{{:::
Dialog :=> {
Chose !(🎫) type 
}

Menu :=>[Math,Physics,Philosophy,Theology,Carpentry,Engineering,Computer science,Novels] 
Select :=> 🎟️

SetOverviewLayer :=> !(🎫)

Dialog :=> {
Book's name
}

Input :=> 🏷️

Dialog :=> {
Add Tags to this  !(🎟️) 's !(🎫)
}


SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]
Dialog :=> {
Add Tags to Document
Alias : 
}

OptionsAdd :=> tags

SetSearchQuery :=> ("/")
SetSearchKey :=> ✍️
GetQueryList :=> menu

SetSearchQuery :=> (" #People And #Description ")
SetSearchKey :=> 🏷️
GetQueryList :=> menu2

Menu :=> [!(menu),!(menu2)]



Dialog :=> {
Add the book's author/s.
}

OptionsAdd :=> ✍️


Dialog :=> {
Any aliases for this book ?
}

List :=> aliases

BuildDocument :=>

:::}}}