function GenderAgeChart() {

    // from .js data sets
    var data = data_GenderAge;

    // Set up the width, height and margins of the graph.

    // Grab the width of the containing box
    var width = parseInt(d3.select("#chart1").style("width"));

    // Designate the height of the graph
    var height = width - (width / 2.9);

    // Margin spacing for graph
    var margin = 20

    // space for placing words
    var labelArea = 110;
    // var labelArea = 90

    // padding for the text at the bottom and left axes
    var tPadBot = 40;
    var tPadLeft = 40;

    // Create the actual canvas for the graph
    var svg = d3
        .select("#chart1")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "chart");

    // Set the radius for each dot that will appear in the graph.
    var circRadius;

    function crGet() {
        if (width <= 530) {
            circRadius = 5;
        } else {
            circRadius = 20;
        }
    }
    crGet();

    // The Labels for our Axes

    // We create a group element to nest our bottom axes labels.
    svg.append("g").attr("class", "xText");
    // xText will allows us to select the group without excess code.
    var xText = d3.select(".xText");

    // We give xText a transform property that places it at the bottom of the chart.
    function xTextRefresh() {
        xText.attr(
            "transform",
            "translate(" +
            ((width - labelArea) / 2 + labelArea) +
            ", " +
            (height - margin - tPadBot) +
            ")"
        );
    }
    xTextRefresh();

    // Now we use xText to append three text SVG files, with y coordinates specified to space out the values.
    // 1. age_18_to_24_obese
    xText
        .append("text")
        .attr("y", -26)
        .attr("data-name", "age_18_to_24_obese")
        .attr("data-axis", "x")
        .attr("class", "aText active x")
        .text("Age 18 to 24 Obese (%)");
    // 2. age_25_to_34_obese
    xText
        .append("text")
        .attr("y", -9)
        .attr("data-name", "age_25_to_34_obese")
        .attr("data-axis", "x")
        .attr("class", "aText inactive x")
        .text("Age 25 to 34 Obese (%)");
    // 3. age_35_to_44_obese
    xText
        .append("text")
        .attr("y", 9)
        .attr("data-name", "age_35_to_44_obese")
        .attr("data-axis", "x")
        .attr("class", "aText inactive x")
        .text("Age 35 to 44 Obese (%)");
    // 4. age_45_to_54_obese
    xText
        .append("text")
        .attr("y", 27)
        .attr("data-name", "age_45_to_54_obese")
        .attr("data-axis", "x")
        .attr("class", "aText inactive x")
        .text("Age 45 to 54 Obese (%)");
    // 5. age_55_to_64_obese
    xText
        .append("text")
        .attr("y", 43)
        .attr("data-name", "age_55_to_64_obese")
        .attr("data-axis", "x")
        .attr("class", "aText inactive x")
        .text("Age 55 to 64 Obese (%)");
    // 6. age_65_up_obese
    xText
        .append("text")
        .attr("y", 59)
        .attr("data-name", "age_65_up_obese")
        .attr("data-axis", "x")
        .attr("class", "aText inactive x")
        .text("Age 65 Up Obese (%)");

    // B) Left Axis
    // ============

    // Specifying the variables like this allows us to make our transform attributes more readable.
    var leftTextX = margin + tPadLeft;
    var leftTextY = (height + labelArea) / 2 - labelArea;

    // We add a second label group, this time for the axis left of the chart.
    svg.append("g").attr("class", "yText");

    // yText will allows us to select the group without excess code.
    var yText = d3.select(".yText");

    // Like before, we nest the group's transform attr in a function
    // to make changing it on window change an easy operation.
    function yTextRefresh() {
        yText.attr(
            "transform",
            "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
        );
    }
    yTextRefresh();

    // Now we append the text.
    // 1. male_obese
    yText
        .append("text")
        .attr("y", -26)
        .attr("data-name", "male_obese")
        .attr("data-axis", "y")
        .attr("class", "aText active y")
        .text("Male Obese (%)");

    // 2. female_obese
    yText
        .append("text")
        .attr("x", 0)
        .attr("data-name", "female_obese")
        .attr("data-axis", "y")
        .attr("class", "aText inactive y")
        .text("Female Obese (%)");


    // 2. Import our .csv file.

    // Import our CSV data with d3's .csv import method.
    // d3.csv("assets/data/data.csv", function(data) {
    // Visualize the data
    visualize(data);
    // });

    // 3. Create our visualization function
    function visualize(theData) {

        // curX and curY will determine what data gets represented in each axis.
        // We designate our defaults here, which carry the same names
        // as the headings in their matching .csv data file.
        var curX = "male_obese";
        var curY = "female_obese";

        // We also save empty variables for our the min and max values of x and y.
        // this will allow us to alter the values in functions and remove repetitious code.
        var xMin;
        var xMax;
        var yMin;
        var yMax;

        // This function allows us to set up tooltip rules
        var toolTip = d3
            .tip()
            .attr("class", "d3-tip")
            .offset([40, -60])
            .html(function (d) {
                // x key
                var theX;
                // Grab the state name.
                var theState = "<div>" + d.state + "</div>";
                // Snatch the y value's key and value.
                var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
                // If the x key is age_18_to_24_obese
                if (curX === "age_18_to_24_obese") {
                    // Grab the x key and a version of the value formatted to show percentage
                    theX = "<div>" + curX + ": " + d[curX] + "%</div>";
                } else {
                    // Otherwise
                    // Grab the x key and a version of the value formatted to include commas after every third digit.
                    theX = "<div>" +
                        curX +
                        ": " +
                        parseFloat(d[curX]).toLocaleString("en") +
                        "</div>";
                }
                // Display what we capture.
                return theState + theX + theY;
            });
        // Call the toolTip function.
        svg.call(toolTip);


        // a. change the min and max for x
        function xMinMax() {
            // min will grab the smallest datum from the selected column.
            xMin = d3.min(theData, function (d) {
                return parseFloat(d[curX]) * 0.90;
            });

            // .max will grab the largest datum from the selected column.
            xMax = d3.max(theData, function (d) {
                return parseFloat(d[curX]) * 1.10;
            });
        }

        // b. change the min and max for y
        function yMinMax() {
            // min will grab the smallest datum from the selected column.
            yMin = d3.min(theData, function (d) {
                return parseFloat(d[curY]) * 0.90;
            });

            // .max will grab the largest datum from the selected column.
            yMax = d3.max(theData, function (d) {
                return parseFloat(d[curY]) * 1.10;
            });
        }

        // c. change the classes (and appearance) of label text when clicked.
        function labelChange(axis, clickedText) {
            // Switch the currently active to inactive.
            d3
                .selectAll(".aText")
                .filter("." + axis)
                .filter(".active")
                .classed("active", false)
                .classed("inactive", true);

            // Switch the text just clicked to active.
            clickedText.classed("inactive", false).classed("active", true);
        }

        //Scatter Plot

        // First grab the min and max values of x and y.
        xMinMax();
        yMinMax();

        // With the min and max values now defined, we can create our scales.
        var xScale = d3
            .scaleLinear()
            .domain([xMin, xMax])
            .range([margin + labelArea, width - margin]);
        var yScale = d3
            .scaleLinear()
            .domain([yMin, yMax])
            // Height is inverses due to how d3 calc's y-axis placement
            .range([height - margin - labelArea, margin]);

        // We pass the scales into the axis methods to create the axes.
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        // Determine x and y tick counts.
        function tickCount() {
            if (width <= 500) {
                xAxis.ticks(5);
                yAxis.ticks(5);
            } else {
                xAxis.ticks(10);
                yAxis.ticks(10);
            }
        }
        tickCount();

        // Append the axes in group elements
        svg
            .append("g")
            .call(xAxis)
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
        svg
            .append("g")
            .call(yAxis)
            .attr("class", "yAxis")
            .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

        // Now let's make a grouping for our dots and their labels.
        var theCircles = svg.selectAll("g theCircles").data(theData).enter();

        // We append the circles for each row of data (or each state, in this case).
        theCircles
            .append("circle")
            // These attr's specify location, size and class.
            .attr("cx", function (d) {
                return xScale(d[curX]);
            })
            .attr("cy", function (d) {
                return yScale(d[curY]);
            })
            .attr("r", circRadius)
            .attr("class", function (d) {
                return "stateCircle " + d.abbr;
            })
            // Hover rules
            .on("mouseover", function (d) {
                // Show the tooltip
                toolTip.show(d);
                // Highlight the state circle's border
                d3.select(this).style("stroke", "#323232");
            })
            .on("mouseout", function (d) {
                // Remove the tooltip
                toolTip.hide(d);
                // Remove highlight
                d3.select(this).style("stroke", "#e3e3e3");
            });

        // With the circles on our graph, we need matching labels.
        // Let's grab the state abbreviations from our data
        // and place them in the center of our dots.
        theCircles
            .append("text")
            // We return the abbreviation to .text, which makes the text the abbreviation.
            .text(function (d) {
                return d.abbr;
            })
            // Now place the text using our scale.
            .attr("dx", function (d) {
                return xScale(d[curX]);
            })
            .attr("dy", function (d) {
                // When the size of the text is the radius,
                // adding a third of the radius to the height
                // pushes it into the middle of the circle.
                return yScale(d[curY]) + circRadius / 2.5;
            })
            .attr("font-size", circRadius)
            .attr("class", "stateText")
            // Hover Rules
            .on("mouseover", function (d) {
                // Show the tooltip
                toolTip.show(d);
                // Highlight the state circle's border
                d3.select("." + d.abbr).style("stroke", "#323232");
            })
            .on("mouseout", function (d) {
                // Remove tooltip
                toolTip.hide(d);
                // Remove highlight
                d3.select("." + d.abbr).style("stroke", "#e3e3e3");
            });

        // Part 4: Make the Graph Dynamic
        // ==========================
        // This section will allow the user to click on any label
        // and display the data it references.

        // Select all axis text and add this d3 click event.
        d3.selectAll(".aText").on("click", function () {
            // Make sure we save a selection of the clicked text,
            // so we can reference it without typing out the invoker each time.
            var self = d3.select(this);

            // We only want to run this on inactive labels.
            // It's a waste of the processor to execute the function
            // if the data is already displayed on the graph.
            if (self.classed("inactive")) {
                // Grab the name and axis saved in label.
                var axis = self.attr("data-axis");
                var name = self.attr("data-name");

                // When x is the saved axis, execute this:
                if (axis === "x") {
                    // Make curX the same as the data name.
                    curX = name;

                    // Change the min and max of the x-axis
                    xMinMax();

                    // Update the domain of x.
                    xScale.domain([xMin, xMax]);

                    // Now use a transition when we update the xAxis.
                    svg.select(".xAxis").transition().duration(1800).call(xAxis);

                    // With the axis changed, let's update the location of the state circles.
                    d3.selectAll("circle").each(function () {
                        // Each state circle gets a transition for it's new attribute.
                        // This will lend the circle a motion tween
                        // from it's original spot to the new location.
                        d3
                            .select(this)
                            .transition()
                            .attr("cx", function (d) {
                                return xScale(d[curX]);
                            })
                            .duration(1800);
                    });

                    // We need change the location of the state texts, too.
                    d3.selectAll(".stateText").each(function () {
                        // We give each state text the same motion tween as the matching circle.
                        d3
                            .select(this)
                            .transition()
                            .attr("dx", function (d) {
                                return xScale(d[curX]);
                            })
                            .duration(1800);
                    });

                    // Finally, change the classes of the last active label and the clicked label.
                    labelChange(axis, self);
                } else {
                    // When y is the saved axis, execute this:
                    // Make curY the same as the data name.
                    curY = name;

                    // Change the min and max of the y-axis.
                    yMinMax();

                    // Update the domain of y.
                    yScale.domain([yMin, yMax]);

                    // Update Y Axis
                    svg.select(".yAxis").transition().duration(1800).call(yAxis);

                    // With the axis changed, let's update the location of the state circles.
                    d3.selectAll("circle").each(function () {
                        // Each state circle gets a transition for it's new attribute.
                        // This will lend the circle a motion tween
                        // from it's original spot to the new location.
                        d3
                            .select(this)
                            .transition()
                            .duration(1800)
                            .attr("cy", function (d) {
                                return yScale(d[curY]);
                            })
                            .attr("class", () => name == "female_obese" ? "female" : "male");

                    });

                    // We need change the location of the state texts, too.
                    d3.selectAll(".stateText").each(function () {
                        // We give each state text the same motion tween as the matching circle.
                        d3
                            .select(this)
                            .transition()
                            .attr("dy", function (d) {
                                return yScale(d[curY]) + circRadius / 3;
                            })
                            .duration(1800);
                    });

                    // Finally, change the classes of the last active label and the clicked label.
                    labelChange(axis, self);
                }
            }
        });

        // Part 5: Mobile Responsive
        // =========================
        // With d3, we can call a resize function whenever the window dimensions change.
        // This make's it possible to add true mobile-responsiveness to our charts.
        d3.select(window).on("resize", resize);

        // One caveat: we need to specify what specific parts of the chart need size and position changes.
        function resize() {
            // Redefine the width, height and leftTextY (the three variables dependent on the width of the window).
            width = parseInt(d3.select("#scatter").style("width"));
            height = width - (width / 2.9);
            leftTextY = (height + labelArea) / 2 - labelArea;

            // Apply the width and height to the svg canvas.
            svg.attr("width", width).attr("height", height);

            // Change the xScale and yScale ranges
            xScale.range([margin + labelArea, width - margin]);
            yScale.range([height - margin - labelArea, margin]);

            // With the scales changes, update the axes (and the height of the x-axis)
            svg
                .select(".xAxis")
                .call(xAxis)
                .attr("transform", "translate(0," + (height - margin - labelArea) + ")")

            svg.select(".yAxis").call(yAxis);

            // Update the ticks on each axis.
            tickCount();

            // Update the labels.
            xTextRefresh();
            yTextRefresh();

            // Update the radius of each dot.
            crGet();

            // Update the location and radius of the state circles.
            d3
                .selectAll("circle")
                .attr("cy", function (d) {
                    return yScale(d[curY]);
                })
                .attr("cx", function (d) {
                    return xScale(d[curX]);
                })
                .attr("r", function () {
                    return circRadius;
                });

            // We need change the location and size of the state texts, too.
            d3
                .selectAll(".stateText")
                .attr("dy", function (d) {
                    return yScale(d[curY]) + circRadius / 3;
                })
                .attr("dx", function (d) {
                    return xScale(d[curX]);
                })
                .attr("r", circRadius / 3);
        }
    }
}