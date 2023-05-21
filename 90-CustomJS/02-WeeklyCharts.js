
class DvWeeklyCharts {

    Yaxises ={
	
        y1 				: "Value",
        y2 				: "Value",
        y3				: "Value",
        y4				: "Value",
 
    
    }
    properties=[
        {
            label           : '📖',
            Target			: 7,
            
            // type			: "line",
            
            chart 			: "value",
            yAxisID         : "y1",
            stack			: "1",

        },
        ////////////////////////////////
        {
            label           : '🏋️‍♂️',
            Target			: 6,
                    
            // type            : "line",
            chart 			: "value",
            yAxisID         : "y1",
            stack			: "1",

        },
        {
            label           : '🍵',
            Target			: 35,

            chart 			: "value",
            yAxisID         : "y2",
            stack			: "2",
        },
        {
            label           : '🍱',
            Target			: 27,

            //type			: "line",
            chart 			: "value",
            yAxisID         : "y2",
            stack			: "2",

        },
        {
            label			: '🍩',
            Target			: 14,
            
            chart 			: "value",
            yAxisID         : "y2",
            stack			: "2",
        },
        {
            label           : '⚖️',
            Target			: 60,
            Average         : true,

            chart 			: "value",
            yAxisID         : "y2",
            stack			: "2",
        },


        {
            label           : '🕌',
            Target         : 35,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '⛔',
            Target         : 20,
            
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '📕',
            Target			: 14,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '💻',
            Target			: 28,
            
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '💼',
            Target			: 48,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        

        {
            label			: '💰',
            Target			: 200,
            
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label			: '💵',
            Target			: 150,
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label			: '💳',
            Target			: 10,
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        
    ]

    animation = customJS.Defaults.animation
    transition= customJS.Defaults.transition
    

    plugins = customJS.Defaults.plugins

    sections=customJS.Defaults.sections


    chart = customJS.Defaults.chart


    Data = customJS.Defaults.Data


    setValues= customJS.Defaults.setValues


    AddValues = customJS.Defaults.AddValues

    checkValues = customJS.Defaults.checkValues

    Render = customJS.Defaults.Render

    

    async renderMonth(args){

        const {
            dv,
            block,
            setValues,

            Date,
            DateFormat,
        	DocumentFormat,
            labelFormat,


            group,
            types,
        } = args;

        const Yaxises = this.Yaxises
        const properties = this.properties
        
        for (let property of this.properties) {

            // adding chart properties
            for (let key in this.chart[property.chart]) {
                if (!property.hasOwnProperty(key)) {
                    property[key] = this.chart[property.chart][key];
                }
            }
        }

        let CurrentDate = moment(moment(Date,DateFormat));
        let StartDate = moment(CurrentDate.startOf("month")).valueOf()
        let EndDate   = moment(CurrentDate.endOf("month")).valueOf()
        
        let labels=[]

        let days = moment(Date,DateFormat).daysInMonth();
        
        
        
        let month = parseInt(moment(Date,DateFormat).format("MM"));
        for (let index = 0; index <= days; index+=7) {
            let current = moment(Date,DateFormat).date(index).format(labelFormat)
            // labels.push(current)
            let currentMonth =moment(Date,DateFormat).date(index).weekday(0).format("MM")
            // console.log(parseInt(currentMonth) === month)
            
            if(labels.indexOf(current) == -1 && parseInt(currentMonth) === month ){
                // console.log(current)
                labels.push(current)
            }
        }

        let current = moment(EndDate).format(labelFormat)

            
        if(labels.indexOf(current) == -1  ){
            labels.push(current)
        }

        let Pages = dv
        .pages(group)
        .where(p => 
            p.file.path.indexOf("Templates") == -1 &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() <= EndDate &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() >= StartDate
            )
        .sort(p => p.file.name)
        // .filter((p,i,arr)=> i >= arr.length )
                
        for (const [key, value] of Object.entries(types)) {
            this.Render[key](dv,block,labels,properties,Yaxises,Pages,DocumentFormat,labelFormat,value)
        }


        if(setValues)
        {
            console.warn(`Months's Target by week`)
            this.setValues(dv,this.properties,Pages,labels.length)
            
        }
        
    }
    
    renderYear(args){

        const {
            dv,
            Target,
            block,
            setValues,

            Date,
            DateFormat,
        	DocumentFormat,
            labelFormat,


            group,
            types,
        } = args;


        const Yaxises = this.Yaxises
        const properties = this.properties
        
        let months = moment.months()


        let labels=[]


        for (const month of months)
        {
            let days = moment(`${Date}-${month}`,"YYYY-MMMM").daysInMonth();

            for (let index = 0; index < days; index+=7) {

                let current = moment(`${Date}-${month}`,"YYYY-MMMM").date(index).format("YYYY-[W]WW")

                let valid 
                let year = moment(current,"YYYY-[W]WW").format("YYYY")
                valid = parseInt(Date) == parseInt(year)

                if(labels.indexOf(current) == -1 && valid )
                    labels.push(moment(current,"YYYY-[W]WW").format(labelFormat))
            }
        }


        let StartDate = moment(moment(Date,DateFormat).startOf("year")).valueOf()
        let EndDate   = moment(moment(Date,DateFormat).endOf("year")).valueOf()


        let Pages = dv.pages(group).where(p => 
            moment(moment(p.file.name,DocumentFormat)).valueOf() <= EndDate &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() >= StartDate
            ).sort(p => p.file.name)
        // .filter((p,i,arr)=> i >= arr.length )


        for (let property of this.properties) {

            // adding chart properties
            for (let key in this.chart[property.chart]) {
                if (!property.hasOwnProperty(key)) {
                    property[key] = this.chart[property.chart][key];
                }
            }
        }

        

                
        for (const [key, value] of Object.entries(types)) {
            this.Render[key](dv,block,labels,properties,Yaxises,Pages,DocumentFormat,labelFormat,value)
        }


        if(setValues)
        {
            console.warn(`yeas's Target by week`)
            this.setValues(dv,this.properties,Pages,labels.length)
            
        }
    }
}