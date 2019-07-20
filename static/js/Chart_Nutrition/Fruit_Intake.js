function FruitIntake() {

    // from .js data sets
    var male_obesityData = data_Male_Nutrition;
    var female_obesityData = data_Female_Nutrition;

    var states = male_obesityData.map(a => a.state)
    var obes = male_obesityData.map(a => a.obesity)
    var fruits = male_obesityData.map(a => a.noFruits)

    var fem_states = female_obesityData.map(a => a.state)
    var fem_obes = female_obesityData.map(a => a.obesity)
    var fem_fruits = female_obesityData.map(a => a.noFruits)

    // Bubble chart Male and Female
    var FruitIntake_Male = {
        x: states,
        y: obes,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: fruits,
        mode: 'markers',
        marker: {
            size: fruits,
            color: '00bfa5'
        },
        name: 'Male - Eat <1 Fruit per Day',
        type: 'scatter'
    };

    var FruitIntake_Female = {
        x: fem_states,
        y: fem_obes,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: fem_fruits,
        mode: 'markers',
        marker: {
            size: fem_fruits,
            color: 'ff5252'
        },
        name: 'Female - Eat <1 Fruit per Day',
        type: 'scatter'
    };

    var data2 = [FruitIntake_Male, FruitIntake_Female];

    var layout2 = {
        title: {
            text: '2015 Female and Male (14-18 yrs) - Fruit Intake',
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
        },
        showlegend: true,
        legend: {
            xanchor: "left",
            yanchor: "bottom",
            x: 0.05,
            y: -0.3
          },
        height: 600,
        width: 1200,
        yaxis: {
            title: '% Obesity',
            titlefont: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    };

    Plotly.newPlot('chart1', data2, layout2);
}