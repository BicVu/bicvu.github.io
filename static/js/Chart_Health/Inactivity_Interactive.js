
// from .js data set
var healthdata = data_Inactivity_Disease;

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth - 460;
    var svgHeight = window.innerHeight - 210;

    margin = {
        top: 20,
        bottom: 80,
        right: 20,
        left: 90
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append Div and Chart Id element
    var $div = d3
        .select("body")
        .append("div")
        .attr("id", "chart1")
    // Append SVG element
    var svg = d3
        .select("#chart1")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // append a div to tooltips, 
    $div.append("div").attr("class", "tooltip").style("opacity", 0);

    // create scales, axes, value and function for later the transition
    // for x
    var xValue,
        xScale,
        xMap,
        xAxis;

    function xSelection(dataColumn) {
        xValue = (d) => { return d[dataColumn]; },
            xScale = d3.scaleLinear().range([0, width]),
            xMap = (d) => { return xScale(xValue(d)); },
            xAxis = d3.axisBottom(xScale);
    }
    // for y
    var yValue,
        yScale,
        yMap,
        yAxis;

    function ySelection(dataColumn) {
        yValue = (d) => { return d[dataColumn]; },
            yScale = d3.scaleLinear().range([height, 0]),
            yMap = (d) => { return yScale(yValue(d)); },
            yAxis = d3.axisLeft(yScale);
    }
    // set initial x and y:
    var nowx = 'Diabetes_Percentage';
    var nowy = 'Adults_Obese_Percent';
    xSelection(nowx);
    ySelection(nowy);

    // append axes
    chartGroup.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

    // ==============================
    var abbrtext = (d) => { return d.State_Abbrev; };

    // Initialize Tooltip
    var tooltip = d3.tip()
        .attr("class", "tooltip")
        .offset([150, -80])
        .html(function (d) {
            var state = d.State_Abbrev;
            var xpercent = d[nowx];
            var ypercent = d[nowy];
            return (`<strong>${state}<strong><br>${nowx}: ${xpercent}<br>${nowy}: ${ypercent}`);
        });

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(healthdata, xValue) - 1, d3.max(healthdata, xValue) + 1]);
    yScale.domain([d3.min(healthdata, yValue) - 1, d3.max(healthdata, yValue) + 1]);

    // Create the tooltip in chartGroup.
    chartGroup.call(tooltip);

    // draw scatterplots
    var dots = chartGroup.selectAll(".dot")
        .data(healthdata).enter();

    dots
        .append("circle")
        .attr("class", "dot")
        .attr("r", 20)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", "#5df2d6")

    dots
        .append("text")
        .attr("class", "states")
        .attr("x", (d) => { return xScale(d[nowx]) })
        .attr("y", (d) => { return yScale(d[nowy]) })
        .text(abbrtext)
        .on("mouseover", (d) => {
            tooltip.show(d)
        })
        .on("mouseout", (d) => {
            tooltip.hide(d)
        });

    // Change Label 
    chartGroup
        .append("text")
        .attr("transform", "translate(" + width / 2 + "," + (height + margin.top + 18) + ")")
        .attr("class", "xaxis-text active")
        .attr("data-axis-name", "Diabetes_Percentage")
        .text("Diabetes");
    chartGroup
        .append("text")
        .attr("transform", "translate(" + width / 2 + "," + (height + margin.top + 35) + ")")
        .attr("class", "xaxis-text inactive")
        .attr("data-axis-name", "Hypertension_Percentage")
        .text("Hypertension");
    chartGroup
        .append("text")
        .attr("transform", "translate(" + width / 2 + "," + (height + margin.top + 53) + ")")
        .attr("class", "xaxis-text inactive")
        .attr("data-axis-name", "Inactivity_Percentage")
        .text("Inactivity");

    //y label
    chartGroup
        .append("text")
        .attr("transform", "translate(" + -margin.left * 2 / 5 + "," + height / 2 + ") rotate(270)")
        .attr("class", "yaxis-text active")
        .attr("data-axis-name", "Adults_Obese_Percent")
        .text("% Obesity");

    function xlabelChange(clickedxAxis) {
        d3
            .selectAll(".xaxis-text")
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);
        clickedxAxis.classed("inactive", false).classed("active", true);
    }

    function ylabelChange(clickedyAxis) {
        d3
            .selectAll(".yaxis-text")
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);
        clickedyAxis.classed("inactive", false).classed("active", true);
    }
    // change when click
    d3.selectAll(".yaxis-text").on("click", function () {
        var clickedySelection = d3.select(this);
        var clickedySelectionInactive = clickedySelection.classed("inactive");
        var clickedyAxis = clickedySelection.attr("data-axis-name");

        if (clickedySelectionInactive) {
            nowy = clickedyAxis;
            ySelection(nowy);
            yScale.domain([d3.min(healthdata, yValue) - 1, d3.max(healthdata, yValue) + 1]);

            svg
                .select(".y-axis")
                .transition()
                .duration(1800)
                .call(yAxis);

            d3.selectAll(".dot").each(function () {
                d3
                    .select(this)
                    .transition()
                    .attr("cy", (d) => {
                        return yScale(+d[nowy]);
                    })

                    .duration(1800);
            });

            d3.selectAll(".states").each(function () {
                d3
                    .select(this)
                    .transition()
                    .attr("y", (d) => {
                        return yScale(+d[nowy]);
                    })
                    .duration(1800);
            });
            ylabelChange(clickedySelection);
        }
    })

    d3.selectAll(".xaxis-text").on("click", function () {
        // assign a variable to current axis
        var clickedxSelection = d3.select(this);
        var clickedxSelectionInactive = clickedxSelection.classed("inactive");
        var clickedxAxis = clickedxSelection.attr("data-axis-name");

        if (clickedxSelectionInactive) {
            nowx = clickedxAxis;
            xSelection(nowx);
            xScale.domain([d3.min(healthdata, xValue) - 1, d3.max(healthdata, xValue) + 1]);

            svg
                .select(".x-axis")
                .transition()
                .duration(1800)
                .call(xAxis);

            d3.selectAll(".dot").each(function () {
                d3
                    .select(this)
                    .transition()
                    .attr("cx", (d) => {
                        return xScale(+d[nowx]);
                    })
                    .duration(1800);
            });

            d3.selectAll(".states").each(function () {
                d3
                    .select(this)
                    .transition()
                    .attr("x", (d) => {
                        return xScale(+d[nowx]);
                    })
                    .duration(1800);
            });
            xlabelChange(clickedxSelection);
        }
    })
}