function Nutrition(type) {

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

// Event Listener

function optionChanged(nutrSelection) {
  Nutrition(nutrSelection)
}

nutrition_button = d3.select("#nutrition");
nutrition_button.on("click", Nutrition('soda'));

