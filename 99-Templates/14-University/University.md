{{{:::
Dialog :=> {

Chose !(🎫) type 
}

Menu :=>  [Subject,Project,Presentation,Assignment]
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
Alias : 
}

List :=> aliases

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags


BuildDocument :=>


:::}}}
