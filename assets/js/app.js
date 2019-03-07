
 var svgWidth = 960;
 var svgHeight = 660;

 var chartMargin = {
     top: 50,
     right: 50,
     bottom: 50,
     left: 50
 }

 var chartWidth = svgWidth - chartMargin.right - chartMargin.left;
 var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

 var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform",`translate(${chartMargin.left}, ${chartMargin.top})`)

                    
var url = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UTAUS201810DATA2/master/16_D3/Homework/Instructions/StarterCode/assets/data/data.csv?token=Apu3l-rQhwlMIxiIB0NGC937dTuVWeF0ks5chrshwA%3D%3D"
d3.csv(url).then(function(newsData) {

    console.log(newsData)

    newsData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    })

    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(newsData, d=> d.poverty)])
        .range([0,chartWidth])
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(newsData, d=> d.healthcare)])
        .range([chartHeight,0])

    var bottomAxis = d3.axisBottom(xLinearScale).ticks(10)
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10)

    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis)

    var yAxis = chartGroup.append("g")
        .call(leftAxis)

    var circlesGroup = chartGroup.selectAll("circle")
        .data(newsData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 15)
        .attr("fill", "blue")
        .attr("opacity", 0.75)
        .attr("stroke-width", "1")

    var textGroup = chartGroup.selectAll(".abbr")
        .data(newsData)
        .enter()
        .append("text")
        .classed("abbr", true)
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty)-7)
        .attr("y", d => yLinearScale(d.healthcare)+2)
        .attr("fill", "white")
        .attr("font-size", "9px");


    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth/2}, ${chartHeight+15})`)

    var povertyLabel = chartGroup.append("text")
        .attr("x", chartWidth/2)
        .attr("y", chartHeight+35)
        .text("In Poverty %")
    
    var healthcareLabel =  chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-chartMargin.left)
        .attr("x", 0-(chartHeight/2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Lacks Healthcare %")

})


