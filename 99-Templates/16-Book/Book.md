{{{:::
Dialog :=> {
Chose !(🎫) type 
}

Menu :=>[Math,Physics,Philosophy,Theology,Carpentry,Engineering,Computer science,Novels] 
Select :=> 🎟️

SetOverviewLayer :=> !(🎫)

Dialog :=> {
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
Names to refer to the document
Aliases : 
}

List :=> aliases

Dialog :=> {
Document's Tags
Alias : 
}


SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags

BuildDocument :=>

:::}}}