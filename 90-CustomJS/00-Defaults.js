class Defaults {

  colors = {
    background: ["#ADA2FF30", "#21E1E130", "#DDFFBB30", "#FEFF8630", "#FFB31930", "#FF696930", "#FFDEB430", "#D77FA130"],
    border: ["#6D67E4", "#21E1E1", "#03C988", "#FFD369", "#F39422", "#ED2B2A", "#EEEEEE", "#FB2576"],
  }


  // Todo : find a way to make it this object work as a universal chart base data
  // so that the 
  // properties=[
  //     {
  //         label           : '📖',
  //         Target			: 1,

  //         type			: "scatter",
  //         chart 			: "check",
  //         yAxisID         : "y",
  //     },
  //     ////////////////////////////////
  //     {
  //         label           : '🏋️‍♂️',
  //         Target			: 1,

  //         type            : "scatter",
  //         chart 			: "check",
  //         yAxisID         : "y2",
  //     },
  //     ///////////////////////////////
  //     {
  //         label           : '🍵',
  //         Target			: 5,

  //         chart 			: "value",
  //         yAxisID         : "y3",
  //         stack			: "3",
  //     },
  //     {
  //         label           : '🍱',
  //         Target			: 3,

  //         yAxisID         : "y3",
  //         chart 			: "value",
  //         //type			: "line",
  //         stack			: "3",

  //     },
  //     {
  //         label			: '🍩',
  //         Target			: 2,

  //         chart 			: "value",
  //         yAxisID         : "y3",
  //         stack			: "3",
  //     },
  //     {
  //         label           : '⚖️',
  //         Target			: 60,
  //         Average         : true,

  //         chart 			: "value",
  //         yAxisID         : "y3",
  //         stack			: "3",
  //     },

  //     /////////////////////////////////
  //     {
  //         label           : '📕',
  //         Target			: 2,

  //         chart 			: "value",
  //         yAxisID         : "y4",
  //         stack			: "4",
  //     },
  //     {
  //         label           : '💻',
  //         Target			: 4,


  //         chart 			: "value",
  //         yAxisID         : "y4",
  //         stack			: "4",
  //     },
  //     {
  //         label           : '💼',
  //         Target			: 8,

  //         chart 			: "value",
  //         yAxisID         : "y4",
  //         stack			: "4",
  //     },
  //     {
  //         label           : '🕌',
  //         Target         : 5,

  //         chart 			: "value",
  //         yAxisID         : "y4",
  //         stack			: "4",
  //     },
  //     {
  //         label           : '⛔',
  //         Target         : 7,


  //         chart 			: "value",
  //         yAxisID         : "y4",
  //         stack			: "4",
  //     },
  //     /////////////////////////////////////
  //     {
  //         label			: '💰',
  //         Target			: 20,


  //         chart 			: "value",
  //         yAxisID         : "y5",
  //         stack			: "5",
  //     },
  //     {
  //         label			: '💵',
  //         Target			: 15,

  //         chart 			: "value",
  //         yAxisID         : "y5",
  //         stack			: "5",
  //     },
  //     {
  //         label			: '💳',
  //         Target			: 5,

  //         chart 			: "value",
  //         yAxisID         : "y5",
  //         stack			: "5",
  //     },

  // ]

  animation = {
    tension: {
      duration: 300,
      // from        :0,
      // to          :0.2,
      // loop        :false,
      easing: "easeInOutBounce",

    },
    resize: {
      duration: 0,
    }

  }
  transition = {
    show: {
      animations: {
        x: {
          // from: 500
        },
        y: {
          from: 300
        }
      }
    },
    hide: {
      animations: {
        x: {
          // to: 500,
        },
        y: {
          to: 300,
        }
      },
    },
  }


  plugins = {
    legend: {
      // display : false,
      position: "bottom",
    },
    tooltip: {
      // enabled: false
    },
    stacked: true,

  }



  plugins = {
    legend: {
      // display : false,
      position: "bottom",
    },
    tooltip: {
      // enabled: false
    },
    stacked: true,

  }

  sections = {
    Check: {
      type: 'category',
      labels: [1],
      offset: true,
      position: 'left',
      stack: 'habit',
      stackWeight: 0.06,
      beginAtZero: false,
      padding: 2,
    },
    // stupid old implementation just ignore it
    // BarCheck : {
    //     type: 'linear',
    //     labels: [1],
    //     offset: true,
    //     position: 'left',
    //     stack: 'habit',

    //     beginAtZero: true,

    //     stackWeight: 0.1,

    // },

    Value: {
      type: 'linear',
      offset: true,
      position: 'left',
      stack: 'habit',

      beginAtZero: true,

      stackWeight: 1,
      grid: {
        drawOnChartArea: true, // only want the grid lines for one axis to show up
        circular: false,//

        color: "#aaaaaa",
        display: true,
        lineWidth: 1,
      },
      padding: 4,
    },
    x: {
      grid: {
        drawOnChartArea: true, // only want the grid lines for one axis to show up
        drawTicks: true,

        color: "#aaaaaa",
        display: true,
        lineWidth: 1,
      },
      ticks: {
        color: "#fff",
      },

    },

  }

  chart = {
    check: {
      data: [],

      spanGaps: true,
      bestFit: true,
      fill: false,

      tension: 0.3,
      borderWidth: 4,

      pointStyle: "rect",
      pointRadius: 4,
      pointHoverRadius: 10,

      stepped: true,

      // type            : "scatter",
    },
    value: {


      data: [],
      spanGaps: true,
      bestFit: true,
      fill: true,

      pointHoverRadius: 10,


      tension: 0.3,
      borderWidth: 3,
      //type            : "line"

      //stack           :'stack 1',
    }

  }


  Data = {
    check: (val) => {
      return val ? "✅" : val == undefined ? "❓" : "❌"
    },
    value: (val) => {
      return val !== null && val !== undefined && !Number.isNaN(val) ? val : "❓"
    },
  }



  async AddValues(Data, Meta) {
    for (const [key, value] of Object.entries(Meta)) {

      const PropExp = new RegExp(`(?=${key}\\ *:).*`, `gm`)


      Data = await Data.replace(PropExp, `${key}: ${value}`)
    }

    return Data
  }

  async checkValues(dv, Meta) {
    let file = dv.current()
    let change = false;

    for (const [key, value] of Object.entries(Meta)) {


      change = file.hasOwnProperty(key) && file[key] != Meta[key];


      if (change) {
        console.warn(`Changing values because ${key} is different and dose exist ${file.hasOwnProperty(key)}`)
        break;
      }
    }

    return change
  }

  async readProperties(properties, Pages, labels, DocumentFormat, labelFormat, Target) {
    let colorindex = 0
    for (let property of properties) {

      property.backgroundColor = [this.colors.background[colorindex]]
      property.borderColor = [this.colors.border[colorindex]]
      // adding data from pages
      for (const page of Pages) {
        // check if the value exist or is valid
        if (page[property.label] == undefined || page[property.label] == null || page[property.label] == "NaN")
          continue

        // add data to the correct index
        let index = labels.indexOf(moment(page.file.name, DocumentFormat).format(labelFormat))


        // check if Target is provided
        if (Target && property.Target) {
          // comparing data to expected Target
          property.data[index] = (page[property.label] / property.Target * 100)
          continue
        }
        // add data if it exist, or not if it dose not
        page[property.label] ? property.data[index] = (page[property.label]) : property.data[index] = null
      }
      colorindex++
      if (colorindex >= this.colors.background.length)
        colorindex = 0;
    }
    return properties
  }

  async setValues(dv, properties, Pages) {
    let Totals = {}
    for (let property of properties) {

      let count = 0
      let total = 0
      // adding data from pages
      for (const page of Pages) {
        // check if the value exist or is valid
        if (page[property.label] == undefined || page[property.label] == null || page[property.label] == "NaN")
          continue


        count++;
        total += typeof page[property.label] == "boolean" ? page[property.label] : parseFloat(page[property.label])

      }
      if (count == 0) {
        Totals[property.label] = null;
        continue
      }

      if (property.Average) {
        Totals[property.label] = parseFloat((total / count).toFixed(2))
        continue
      }

      Totals[property.label] = total
    }

    let file = await app.workspace.getActiveFile()
    let Data = await app.vault.read(file)
    Data = await this.AddValues(Data, Totals)


    let change = await this.checkValues(dv, Totals)
    if (change)
      await app.vault.modify(
        file,
        Data
      )
        .then(() => {
          new Notice(`Added Values`);
        })
        .catch((err) => {
          console.error(err)
          new Notice(`Failed to add MetaData`);
        })

  }



  Render = {
    "line": async (dv, block, labels, properties, Yaxises, Pages, DocumentFormat, labelFormat, value) => {

      let scales = {}


      for (const [key, value] of Object.entries(Yaxises)) {
        // scales[key]=  this.sections[value]
        scales[key] = this.sections[value]
      }
      // // adding x axis settings 
      scales.x = this.sections.x



      const datasets = JSON.parse(JSON.stringify(properties));

      this.readProperties(datasets, Pages, labels, DocumentFormat, labelFormat, value.target)

      if (!value.stacked) {
        for (let dataset of datasets) {
          dataset.stack = undefined
        }
      }

      let chartData = {

        type: "line",
        data: {
          labels,
          datasets,
        },
        options: {
          animation: this.animation,
          transitions: this.transition,
          plugins: this.plugins,
          time: "day",
          scales,
          responsive: true,
        },
      }
      window.renderChart(chartData, block.container)
    },
    "bar": async (dv, block, labels, properties, Yaxises, Pages, DocumentFormat, labelFormat, value) => {

      // adding default scale values
      let scales = {}
      for (const [key, value] of Object.entries(Yaxises)) {
        scales[key] = this.sections[value]
      }

      scales.x = this.sections.x


      const datasets = JSON.parse(JSON.stringify(properties));

      this.readProperties(datasets, Pages, labels, DocumentFormat, labelFormat, value.target)



      if (!value.stacked) {
        for (let dataset of datasets) {
          dataset.stack = undefined
        }
      }

      let chartData = {

        type: "bar",
        data: {
          labels,
          datasets,
        },
        options: {
          animation: this.animation,
          transitions: this.transition,
          plugins: this.plugins,
          time: "day",
          scales,
          responsive: true,
        },
      }
      window.renderChart(chartData, block.container)
    },

    "table": async (dv, block, labels, properties, Yaxises, Pages, DocumentFormat, labelFormat, Value) => {

      let scales = {}

      for (const [key, value] of Object.entries(Yaxises)) {
        // scales[key]=  this.sections[value]
        scales[key] = this.sections[value]
      }
      // // adding x axis settings 
      scales.x = this.sections.x

      const datasets = JSON.parse(JSON.stringify(properties));
      // this.readProperties(datasets,Pages,labels,DocumentFormat,labelFormat,value.target)


      let Labels = [];
      for (const [key, value] of Object.entries(datasets)) {
        Labels.push(value.label)
      }

      dv.table(["day", ...Labels],

        Pages
          .sort(doc => doc.name, 'asc')
          .map(doc =>
            [
              doc.file.link
              ,
              ...Object.entries(datasets).map(([key, value]) => {
                if (Value.target)
                  return this.Data[value.chart](parseFloat((doc[value.label] / datasets[key].Target).toFixed(2)))
                return this.Data[value.chart]((doc[value.label]))
              })

            ])
      )
    }

  }
}
