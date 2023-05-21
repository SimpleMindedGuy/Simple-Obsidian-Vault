
const Groups = dv.pages("#Description").where(p => p.file.path.indexOf("Templates") == -1 ).groupBy(p => p["🎫"])

for (let group of Groups) 
{
	dv.header(1, `${group.key}`);
	
	dv.container.className = "block-language-dataviewjs node-insert-event dvTableCards progressCards"

	for (const SubGroup of group.rows.groupBy(k => k["🎟️"]))
	{
		dv.header(3, `${SubGroup.key}`)
		dv.table(["Name","🏷️Title","📊Category","📊Status","Progress"],

		SubGroup.rows
		.sort(k => `${Math.round((k["🏹"]/k["🎯"])*100)}`, 'desc')
		
		.map(k => 
		[
			
			// console.log(k),
			// `📁 ${k.file.link}`,
			// dv.el("div", `${k.file.path}`, {  attr: { Icon:"📁",class:"Column", style:"grid-area:Link" } }),
			dv.el("div", `[[${k.file.path}|${k["🏷️"]}]]`, {  attr: { Icon:"🏷️",class:"Column"},style:"grid-area:Title" }),
			dv.el("div", `${k["🎟️"] ?? "❌"}`, {  attr: { Icon:"🎟️",class:"Column"},style:"grid-area:Category" }),
			dv.el("div", `${k["📊"] ?? "❌"}`, {  attr: { Icon:"📊",class:"Column"},style:"grid-area:Status" }),
			dv.el("progress", "", {  attr: { max: k["🎯"] , value:k["🏹"], percent: `${Math.round((k["🏹"]/k["🎯"])*100)}`}, style:"grid-area:Progress" })

		])
	)
	}

	
   
}


