<%* tp.user.NewDocument(tp,true) %>

{{{:::
Get : 🗓️ => 🗓️

SetDateFormat :=> DD
SetDate : $(🗓️) => Day

SetDateFormat :=> MM
SetDate : $(🗓️) => Month

SetDateFormat :=> YYYY
SetDate : $(🗓️) => Year

MoveMedia :=> 81-DailyFiles/Year-$(Year)/Month-$(Month)/Day-$(Day)

Stop : =>
:::}}}