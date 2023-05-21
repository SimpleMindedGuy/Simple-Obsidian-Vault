
for (let group of dv.pages("#personal").where(p => p.file.path.indexOf("Templates") == -1 ).groupBy(p => p["🧾"])) 
{
	dv.header(2, group.key);
	
	dv.container.className = "block-language-dataviewjs node-insert-event dvTableCards progressCards "
	
	dv.table(["Name","🏷️Title","🧾Category","📑Status","Progress"],
		 
	group.rows
	.sort(k =>`${Math.round((k["🏹"]/k["🎯"])*100)}`, 'desc')
	.map(k => 
		[
			dv.el("div", `${k.file.link}`, {  attr: { Icon:"📁",class:"Column"} }),
			dv.el("div", `${k["🏷️"] ?? "❌" }`, {  attr: { Icon:"🏷️",class:"Column"} }),
			dv.el("div", `${k["📑"] ?? "❌"}`, {  attr: { Icon:"📑",class:"Column"} }),
			dv.el("div", `${k["📊"] ?? "❌"}`, {  attr: { Icon:"📊",class:"Column"} }),
			dv.el("progress", "", {  attr: { max: k["🎯"] , value:k["🏹"], percent: `${Math.round((k["🏹"]/k["🎯"])*100)}`} })

		])
	)
}
