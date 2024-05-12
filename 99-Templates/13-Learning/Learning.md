{{{:::
Menu :=> {

Chose $(🎫) type 
}

Menu :=>  [Math,Physics,Philosophy,Theology,Carpentry,Engineering,Computer science,Programming,Art] 

SelectLayer :=> 🎟️

SetOverviewLayer :=> !(🎫)


Dialog  :=> {
Enter Document Title 
}

Input :=> 🏷️

Dialog :=> {
Books to refer to if any
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

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

Dialog :=> {
Add Tags to Document
Alias : 
}

OptionsAdd :=> tags



BuildDocument :=>


:::}}}
