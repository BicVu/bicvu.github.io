function Main() {

  var $div = d3
    .select("body")
    .append("div")
    .attr("id", "chart1")

  GenderAgeChart()
};

Main()
