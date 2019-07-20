function VegetableIntake() {

    // from .js data sets
    var male_obesityData = data_Male_Nutrition;
    var female_obesityData = data_Female_Nutrition;

    var states = male_obesityData.map(a => a.state)
    var obes = male_obesityData.map(a => a.obesity)
    var veggies = male_obesityData.map(a => a.noVeggies)

    var fem_states = female_obesityData.map(a => a.state)
    var fem_obes = female_obesityData.map(a => a.obesity)
    var fem_veggies = female_obesityData.map(a => a.noVeggies)

    // Bubble chart Male and Female
    var Veggies_Male = {
        x: states,
        y: obes,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: veggies,
        mode: 'markers',
        marker: {
            size: veggies,
            color: '00bfa5'
        },
        name: 'Male - Eat <1 Vegetable per Day',
        type: 'scatter'
    };

    var Veggies_Female = {
        x: fem_states,
        y: fem_obes,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: fem_veggies,
        mode: 'markers',
        marker: {
            size: fem_veggies,
            color: 'ff5252'
        },
        name: 'Female - Eat <1 Vegetable per Day',
        type: 'scatter'
    };

    var data2 = [Veggies_Male, Veggies_Female];

    var layout2 = {
        title: {
            text: '2015 Female and Male (14-18 yrs) - Vegetable Intake',
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