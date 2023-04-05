
for (let group of dv.pages("#activities").where(p => p.file.path.indexOf("Templates") == -1 && p["🧾"] !== "Done" ).groupBy(p => p["🧾"])) 
{
	dv.header(2, `[[Activities/${group.key}/${group.key}|${group.key}]]`);
	
	dv.container.className = "block-language-dataviewjs node-insert-event dvTableCards progressCards"
	dv.table(["Name","🏷️Title","📊Category","📊Status","Progress"],
		 
			group.rows
			.sort(k => `${Math.round((k["🏹"]/k["🎯"])*100)}`, 'asc')
	   		.map(k => 
			[
				
				// `📁 ${k.file.link}`,
				dv.el("div", `${k.file.link}`, {  attr: { Icon:"📁",class:"Column", style:"grid-area:Link" } }),
				dv.el("div", `${k["🏷️"] ?? "ϕ"}`, {  attr: { Icon:"🏷️",class:"Column"},style:"grid-area:Title" }),
				dv.el("div", `${k["📑"] ?? "ϕ"}`, {  attr: { Icon:"📑",class:"Column"},style:"grid-area:Category" }),
				dv.el("div", `${k["📊"] ?? "ϕ"}`, {  attr: { Icon:"📊",class:"Column"},style:"grid-area:Status" }),
				dv.el("progress", "", {  attr: { max: k["🎯"] , value:k["🏹"], percent: `${Math.round((k["🏹"]/k["🎯"])*100)}`}, style:"grid-area:Progress" })

			])
		)
   
}



// dv.el("div", dv.el("div", dv.el("div", "", {cls:`progress `  ,attr: { style:`--width:${Math.round((k["🏹"]/k["🎯"])*100)}%`  } }), {cls:`progressbar `  }),  {cls:"progresstracking", attr:{ value:`${Math.round((k["🏹"]/k["🎯"])*100)}%`} })

// for (let group of dv.pages("#activities").where(p => p.file.path.indexOf("Templates") == -1 ).groupBy(p => p["📊"])) {
	
// 	dv.header(3, group.key);
// 	dv.table(["Name","Title", "Category", "Status","Type","test"]
// 		,group.rows
// 			.sort(k => k.rating, 'desc')
// 			.map(  k => 
// 				[`📁 ${k.file.link}`,`🏷️ ${k["🏷️"]}`, `🧾 ${k["🧾"]}`,`📑 ${k["📑"]}`,`🎯 ${Math.round((k["🏹"]/k["🎯"]) * 100)}%`])
// 			)
// }