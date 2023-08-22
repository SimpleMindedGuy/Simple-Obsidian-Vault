<%* tp.user.NewDocument(tp,true) %>

{{{:::

Get :=> 🗓️


SetDateFormat :=> WW
SetDate : $(🗓️) => Week

SetDateFormat :=> MM
SetDate : $(🗓️) => Month

SetDateFormat :=> YYYY
SetDate : $(🗓️) => Year

MoveMedia :=> 82-WeeklyFiles/Year-$(Year)/Month-$(Month)/Week-$(Week)

Stop : =>
:::}}}