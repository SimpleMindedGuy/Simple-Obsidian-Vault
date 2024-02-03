{{{:::
Dialog :=> {

Chose !(🎫) type 
}

Menu :=> [Friends,Acquaintances,Work/School,Family,Relative]  
Select :=> 🎟️

SetOverviewLayer :=> !(🎫)

Dialog :=> {
Enter Document Title 
}

Input :=> 🏷️

Dialog :=> {
Names to refer to the document
Alias : 
}

List :=> aliases

Dialog :=> {
Tags :
}

SetSearchQuery :=> ("/")
SetSearchKey :=> tags
GetQueryList :=> menu

Menu :=> [!(menu)]

OptionsAdd :=> tags

BuildDocument :=>

:::}}}
