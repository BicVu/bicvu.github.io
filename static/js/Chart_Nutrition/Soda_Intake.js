function SodaIntake() {

    // from .js data sets
    var male_obesityData = data_Male_Nutrition;
    var female_obesityData = data_Female_Nutrition;

    var states = male_obesityData.map(a => a.state)
    var oo = male_obesityData.map(a => a.obesity)
    var sd = male_obesityData.map(a => a.sugarDrinks)

    var fem_states = female_obesityData.map(a => a.state)
    var fem_oo = female_obesityData.map(a => a.obesity)
    var fem_sd = female_obesityData.map(a => a.sugarDrinks)     

    var oo_modified_for_display = female_obesityData.map(function(a) {
        return 20
        });

    var Sugar_Male = {
        x: states,
        y: oo_modified_for_display,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: sd,
        mode: 'markers',
        marker: {
            size: sd,
            color: '00bfa5'
        },
        name: 'Male - 1+ Soda per Day',
        type: 'scatter'
    };

    var data2 = [Sugar_Male];

    var layout2 = {
        title: {
            text: '2015 Female and Male (14-18 yrs) - Soda Intake',
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
            range: [12, 22],
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

function SodaIntake2() {

    setTimeout(function(){ 

    // from .js data sets
    var male_obesityData = data_Male_Nutrition;
    var female_obesityData = data_Female_Nutrition;

    var states = male_obesityData.map(a => a.state)
    var oo = male_obesityData.map(a => a.obesity)
    var sd = male_obesityData.map(a => a.sugarDrinks)

    var fem_states = female_obesityData.map(a => a.state)
    var fem_oo = female_obesityData.map(a => a.obesity)
    var fem_sd = female_obesityData.map(a => a.sugarDrinks)

    var oo_modified_for_display = female_obesityData.map(function(a) {
        return 16
        });

    // Bubble chart Male and Female
    var Sugar_Female = {
        x: fem_states,
        y: oo_modified_for_display,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: fem_sd,
        mode: 'markers',
        marker: {
            size: fem_sd,
            color: 'ff5252'
        },
        name: 'Female - 1+ Soda per Day',
        type: 'scatter'
    };

    var data2 = [Sugar_Female];

    var layout2 = {
        title: {
            text: '2015 Female and Male (14-18 yrs) - Soda Intake',
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
            range: [12, 22],
            title: '% Obesity',
            titlefont: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    };

    Plotly.newPlot('chart1', data2, layout2);

}, 500);
}

function SodaIntake3() {

    setTimeout(function(){ 

    // from .js data sets
    var male_obesityData = data_Male_Nutrition;
    var female_obesityData = data_Female_Nutrition;

    var states = male_obesityData.map(a => a.state)
    var oo = male_obesityData.map(a => a.obesity)
    var sd = male_obesityData.map(a => a.sugarDrinks)

    var fem_states = female_obesityData.map(a => a.state)
    var fem_oo = female_obesityData.map(a => a.obesity)
    var fem_sd = female_obesityData.map(a => a.sugarDrinks)

    // Bubble chart Male and Female
    var Sugar_Male = {
        x: states,
        y: oo,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: sd,
        mode: 'markers',
        marker: {
            size: sd,
            color: '00bfa5'
        },
        name: 'Male - 1+ Soda per Day',
        type: 'scatter'
    };

    var Sugar_Female = {
        x: fem_states,
        y: fem_oo,
        opacity: 0.5,
        line: {
            width: 3
        },
        text: fem_sd,
        mode: 'markers',
        marker: {
            size: fem_sd,
            color: 'ff5252'
        },
        name: 'Female - 1+ Soda per Day',
        type: 'scatter'
    };

    var data2 = [Sugar_Male, Sugar_Female];

    var layout2 = {
        title: {
            text: '2015 Female and Male (14-18 yrs) - Soda Intake',
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

}, 800);
}