function Main() {

  d3.select("#descrip_header").node().value = 'NUTRITION';
  d3.select("#description").node().value ='The chart shows that STATE NAME has the highest consumption of fruits at ____% and STATE NAME has the lowest at ____%. While the consumption of vegetables is at its highest in the state of STATE NAME at ____%, and lowest in the state of STATENAME at ____%';

  // Chart
  d3.select("#chart1").remove();

  var $div = d3
    .select("body")
    .append("div")
    .attr("id", "chart1")

  GenderAgeChart()
}

function Nutrition(type) {

  d3.select("#chart1").remove();

  var $div = d3
    .select("body")
    .append("div")
    .attr("id", "chart1")

  if (type === 'soda') {

    SodaIntake()
    SodaIntake2()
    SodaIntake3()
  }

  else if (type === 'fruit') {
    FruitIntake()
  }
  else if (type === 'vegetable') {
    VegetableIntake()
  };

}

function Health() {

  d3.select("#chart1").remove();
  Health_Interactivity()
}

// Event Listeners

function optionChanged(nutrSelection) {
  Nutrition(nutrSelection)
}

// 1st call when page is loaded
d3.select("#chart1").remove();

var $div = d3
  .select("body")
  .append("div")
  .attr("id", "chart1")

Main()
