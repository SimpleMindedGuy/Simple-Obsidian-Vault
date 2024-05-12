{{{:::

GetValue => 🗓️
StoreValue => DocDate

SetDate :=> !(DocDate)

SetDateFormat :=> WW
StoreFormattedDate :=> W

SetDateFormat :=> MM
StoreFormattedDate :=> M

SetDateFormat :=> YYYY
StoreFormattedDate :=> Y

MoveMedia :=> 82-WeeklyFiles/Year-!(Y)/Month-!(M)/Week-!(W)

:::}}}

<%* tp.user.main(true) %>
