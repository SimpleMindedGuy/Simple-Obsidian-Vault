for (let Note of dv.pages("#diary").where(p => p.file.size > 5000 && p.file.path.indexOf("Templates")).groupBy(p => p.name)) {
	
	dv.container.className = "block-language-dataviewjs node-insert-event dvTableCards diaryCards "
	
	dv.table(["Name","🏷️Title", "⚖️Weight", "🕌Prayers", "😶Mood","⛔Masturbate",`Size`]
		,Note.rows
			.sort(k => k.file.name, 'desc')
			.map(k => [
				dv.el("div", `${k.file.link}`, {  attr: { Icon:"📁",class:"Column" }}),
				dv.el("div", `${k["🏷️"] ?? "❌"}`, {  attr: { Icon:"🏷️",class:"Column"} }),
				dv.el("div", `${k["⚖️"]  ?? "❌"}`, {  attr: { Icon:"⚖️",class:"Column"} }),
				dv.el("div", `${k["🏋️‍♂️"] ? "✅" : "❌"}`, {  attr: { Icon:"🏋️‍♂️",class:"Column"} }),
				dv.el("div", `${k["🕌"] ?? "❌"}`, {  attr: { Icon:"🕌",class:"Column"} }),
				dv.el("div", `${k["😶"] ?? "❌"}`, {  attr: { Icon:"😶",class:"Column"} }),
				dv.el("div", `${k["⛔"] ?? "❌"}`, {  attr: { Icon:"⛔",class:"Column"} }),
				dv.el("div", `${k.file.size}`, {  attr: { Icon:"📝",class:"Column"} })
			]))

			// dv.el("div", `${k.file.link}`, {  attr: { Icon:"📁",class:"Column" }}),

			// dv.el("div", `${k["📊"]}`, {  attr: { Icon:"📊",class:"Column"} }),
}


// for (let group of dv.pages("#diary").where(p => p.file.size > 4000 && p.file.path.indexOf("Templates")).groupBy(p => p["😶"])) {
	
// 	dv.header(2, group.key);
// 	dv.table(["Name","🏷️Title", "⚖️Weight", "🕌Prayers", "😶Mood","⛔Masturbate"]
// 		,group.rows
// 			.sort(k => k.rating, 'desc')
// 			.map(k => [`📁 ${k.file.link}`,`🏷️ ${k["🏷️"]}`, `⚖️ ${k["⚖️"]}`,`🕌 ${k.file["🕌"]}`,`😶 ${k["😶"]}`,`⛔ ${k['⛔']}`])
// 			,{attr : {class :`hello world`}})
// }