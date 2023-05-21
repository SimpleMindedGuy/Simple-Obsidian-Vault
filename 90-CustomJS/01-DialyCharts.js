
class DvDailyCharts {

    Yaxises ={
	
        y 				: "Check",
        y2 				: "Check",
        y3				: "Value",
        y4				: "Value",
        y5				: "Value",

    }
    properties=[
        {
            label           : '📖',
            
            type			: "scatter",
            chart 			: "check",
            yAxisID         : "y",
        },
        ////////////////////////////////
        {
            label           : '🏋️‍♂️',
                    
            type            : "scatter",
            chart 			: "check",
            yAxisID         : "y2",
        },
        ///////////////////////////////
        {
            label           : '🍵',
            Target			: 5,

            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '🍱',
            Target			: 3,

            yAxisID         : "y3",
            chart 			: "value",
            //type			: "line",
            stack			: "3",

        },
        {
            label			: '🍩',
            Target			: 2,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        {
            label           : '⚖️',
            Target			: 60,
            Average         : true,
            
            chart 			: "value",
            yAxisID         : "y3",
            stack			: "3",
        },
        
        /////////////////////////////////
        {
            label           : '📕',
            Target			: 2,
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label           : '💻',
            Target			: 4,
            
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label           : '💼',
            Target			: 8,
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label           : '🕌',
            Target         : 5,
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        {
            label           : '⛔',
            Target         : 7,
            
            
            chart 			: "value",
            yAxisID         : "y4",
            stack			: "4",
        },
        /////////////////////////////////////
        {
            label			: '💰',
            Target			: 20,
            
            
            chart 			: "value",
            yAxisID         : "y5",
            stack			: "5",
        },
        {
            label			: '💵',
            Target			: 15,
            
            chart 			: "value",
            yAxisID         : "y5",
            stack			: "5",
        },
        {
            label			: '💳',
            Target			: 5,
            
            chart 			: "value",
            yAxisID         : "y5",
            stack			: "5",
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

    async renderWeek(args){

        const {
            dv,
            setValues,

            block,

            Date: date,
            DateFormat,
        	DocumentFormat,
            labelFormat,


            group,
            types,
        } = args;

        const Yaxises = this.Yaxises
        const properties = this.properties

        for (let property of properties) {
            // adding chart properties
            for (let key in this.chart[property.chart]) {
                if (!property.hasOwnProperty(key)) {

                    property[key] = this.chart[property.chart][key];
                }
            }
        }

        let StartDate = moment(moment(date,DateFormat).weekday(0).format(DocumentFormat)).valueOf()
        let EndDate   = moment(moment(date,DateFormat).weekday(6).format(DocumentFormat)).valueOf()

        // get files in the requested time range
        let Pages = dv.pages(group).where(p => 
            p.file.path.indexOf("Templates") == -1 &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() <= EndDate &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() >= StartDate
            )
        .sort(p => p.file.name)


        // setting labels
        let labels=[
            moment(date,DateFormat).weekday(0).format(labelFormat),
            moment(date,DateFormat).weekday(1).format(labelFormat),
            moment(date,DateFormat).weekday(2).format(labelFormat),
            moment(date,DateFormat).weekday(3).format(labelFormat),
            moment(date,DateFormat).weekday(4).format(labelFormat),
            moment(date,DateFormat).weekday(5).format(labelFormat),
            moment(date,DateFormat).weekday(6).format(labelFormat)
        ];

        


        // rendering tables and charts
        for (const [key, value] of Object.entries(types)) {
            this.Render[key](dv,block,labels,properties,Yaxises,Pages,DocumentFormat,labelFormat,value)
        }


        // set the current documents values if it is requested
        if(setValues)
        {
            console.warn(`Months's Target by day`)
            this.setValues(dv,properties,Pages)
            
        }
    }

    async renderMonth(args){

        const {
            dv,
            setValues,
            block,

            Date,
            DateFormat,
        	DocumentFormat,
            labelFormat,


            group,
            types,
        } = args;


        const Yaxises = this.Yaxises
        const properties = this.properties

        for (let property of properties) {
            // adding chart properties
            for (let key in this.chart[property.chart]) {
                if (!property.hasOwnProperty(key)) {

                    property[key] = this.chart[property.chart][key];
                }
            }
        }


        let StartDate = moment(moment(Date,DateFormat).startOf("month").format(DocumentFormat)).valueOf()
        let EndDate   = moment(moment(Date,DateFormat).endOf("month").format(DocumentFormat)).valueOf()


        let Pages = dv
        .pages(group)
        .where(p => 
            p.file.path.indexOf("Templates") == -1 &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() <= EndDate &&
            moment(moment(p.file.name,DocumentFormat)).valueOf() >= StartDate
            )
        .sort(p => p.file.name)
        // .filter((p,i,arr)=> i >= arr.length )
        
        
        
        
        function getDaysArrayByMonth(date,format) {
            let daysInMonth = moment(date).daysInMonth();
            let arrDays = [];
          
            while(daysInMonth) {
              let current = moment(date).date(daysInMonth).format(format);
              arrDays.unshift(current);
              daysInMonth--;
            }
          
            return arrDays;
        }

        let labels=[]
        labels = getDaysArrayByMonth(moment(Date,DateFormat),labelFormat);
        
       // keep track of averages 
        // adding default scale values
        let scales ={}
        for (const [key, value] of Object.entries(Yaxises)) {
            scales[key]= this.sections[value]
        }

        scales.x= this.sections.x


        // rendering tables and charts
        for (const [key, value] of Object.entries(types)) {
            this.Render[key](dv,block,labels,properties,Yaxises,Pages,DocumentFormat,labelFormat,value)
        }


        // set the current documents values if it is requested
        if(setValues)
        {
            console.warn(`Months's Target by day`)
            this.setValues(dv,properties,Pages)
            
        }
    }
    
    async renderYear(args){

        const {
            dv,
            setValues,
            block,

            Date,
            DateFormat,
        	DocumentFormat,
            labelFormat,


            group,
            types,
            
        } = args;


        let months = moment.months()
        

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
        
        
        
        let labels=[]
        for (const month of months)
        {
            let daysInMonth = moment(`${Date}-${month}`,"YYYY-MMMM").daysInMonth();
            let counter =0
            while(counter < daysInMonth) {
              let current = moment(`${Date}-${month}`,"YYYY-MMMM").date(counter).format(labelFormat);
              labels.push(current);
              counter++;
            }
        }
        



        // rendering tables and charts
        for (const [key, value] of Object.entries(types)) {
            this.Render[key](dv,block,labels,properties,Yaxises,Pages,DocumentFormat,labelFormat,value)
        }


        // set the current documents values if it is requested
        if(setValues)
        {
            console.warn(`Months's Target by day`)
            this.setValues(dv,properties,Pages)
            
        }
    }
}
