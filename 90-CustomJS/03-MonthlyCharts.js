class DvMonthlyCharts {

    Yaxises ={
	
        y1 				: "Value",
        y2 				: "Value",
        y3				: "Value",
        y4				: "Value",
 
    
    }
    properties=[
        {
            label           : '📖',
            Target			: 49,
            
            // type			: "line",
            
            chart 			: "value",
            yAxisID         : "y1",
            stack			: "1",

        },
        ////////////////////////////////
        {
            label           : '🏋️‍♂️',
            Target			: 42,
                    
            // type            : "line",
            chart 			: "value",
            yAxisID         : "y1",
            stack			: "1",

        },
        {
            label           : '🍵',
            Target			: 140,

            chart 			: "value",
            yAxisID         : "y2",
            stack			: "2",
        },
        {
            label           : '🍱',
            Target			: 108,

            //type			: "line",
            chart 			: "value",
            yAxisID         : "y2",
            stack			: "2",

        },
        {
            label			: '🍩',
            Target			: 56,
            
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
            Target         : 140,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '⛔',
            Target         : 80,
            
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '📕',
            Target			: 56,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '💻',
            Target			: 112,
            
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '💼',
            Target			: 192,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        

        {
            label			: '💰',
            Target			: 800,
            
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label			: '💵',
            Target			: 600,
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label			: '💳',
            Target			: 40,
            
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

   

    
    renderYear(args){

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

        let StartDate = moment(moment(Date,DateFormat).startOf("year").format(DocumentFormat)).valueOf()
        let EndDate   = moment(moment(Date,DateFormat).endOf("year").format(DocumentFormat)).valueOf()

        let Pages = dv
        .pages(group)
        .where(p => 
            p.file.path.indexOf("Templates") == -1 &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() <= EndDate &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() >= StartDate
            )
        .sort(p => p.file.name)
        // .filter((p,i,arr)=> i >= arr.length )

        for (let property of this.properties) {

            // adding chart properties
            for (let key in this.chart[property.chart]) {
                if (!property.hasOwnProperty(key)) {
                    property[key] = this.chart[property.chart][key];
                }
            }
        }

        let labels = moment.months()
        
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