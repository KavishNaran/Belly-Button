// Fetch the endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and preform a console log
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialise the dashboard and build drop down function
function init() {
 
    // Use D3 to get sample names and populate drop down menu
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

        // Add the samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for all the iterations of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Log sample_one
        console.log(sample_one);

        // Build the initial plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one)
        buildGaugeChart(sample_one);
    });
};

// Function to populute the meta data
function buildMetadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the values of the samples
        let value = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after the have been filtered
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear out the metadata
        d3.select("#sample-metadata").html("");

        // Use 'Object.entries' in order to add each key pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key pairs while they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function which builds the bar chart
function buildBarChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables and the sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // Display the top 10 items in decending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layouts
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Function which builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample value
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

 // Function which builds the gauge chart
 function buildGaugeChart(sample) {
  
  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter based on the value of the sample
      let value = metadata.filter(result => result.id == sample);

      // Log the array of metadata objects after the have been filtered
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Use Object.entries to get the key pairs and add into the demographics box on the page
      let washFrequency = Object.values(valueData)[6];
      
      // Set up the trace for the gauge chart
      let trace2 = {
          type: 'pie',
          showlegend: false,
          hole: 0.5,
          rotation: 90,
          value: washFrequency,
          text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
          title: {
              text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
              font: {color: "black", size: 16}
          },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
              axis: {range: [0,10], tickmode: "linear", tick0: 1, dtick: 1},
              bar: {color: "darkgrey"},

              // Set steps and colour for guage chart
              steps: [
                  {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                  {range: [1, 2], color: "rgba(235, 226, 202, .65)"},
                  {range: [2, 3], color: "rgba(212, 203, 160, .65)"},
                  {range: [3, 4], color:  "rgba(208, 211, 100, .65)"},
                  {range: [4, 5], color:  "rgba(190, 210, 70, .65)"},
                  {range: [5, 6], color: "rgba(180, 200, 40, .65)"},
                  {range: [6, 7], color: "rgba(140, 170, 40 , .65)"},
                  {range: [7, 8], color:  "rgba(120, 159, 25, .65)"},
                  {range: [8, 9], color: "rgba(70, 150, 20, 0.65)"},
                  {range: [9, 10], color: "rgba(20, 140, 10, .65)"},
              ]
          } 
      };

      // Set up the Layout
      let layout = {
          width: 500, 
          height: 500,
          margin: {t: 0, b:0}
      };

      // Call Plotly to plot the gauge chart
      Plotly.newPlot("gauge", [trace2], layout)
  });
};
// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all the functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initialise function
init();