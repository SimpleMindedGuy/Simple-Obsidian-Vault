{{{:::
Dialog :=> {
Choose/Add what company you're doing the work for

}

SetSearchQuery :=> #Work and #Description
SetSearchKey :=> 🏷️
GetQueryList :=> menu

Menu :=> [!(menu)]

SelectAdd :=> 🎟️

AddLayer :=> !(🎟️)

SetOverviewLayer :=> !(🎫)

Dialog :=> {
What Type of work are you doing. 
}

Menu :=>[Front-End,Back-End,Full-Stack,Design,Integrated-System]
Select :=> 📇


Dialog :=> {
Enter Document Title
}

Input :=> 🏷️

Dialog :=> {
Books to refer to if any
}

List :=> 📚

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


