// JavaScript

const context = document.getElementById('expenditure-chart');
const gradientBottom = 'rgba(20, 20, 20, 1)'


// const gradientTop = 'rgba(155, 155, 155, 1)'
// const hoverGradientTop = 'rgba(170, 136, 84, 1)'
const gradientTop = 'rgba(170, 136, 84, 1)'
const hoverGradientTop = 'rgba(155, 155, 155, 1)'



function getGradient(context, chartArea, isHover) {

    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left
    const chartHeight = chartArea.bottom - chartArea.top

    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth
        height = chartHeight
        gradient = context.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)

        if (isHover == false) {
            gradient.addColorStop(0, gradientBottom)
            gradient.addColorStop(1, gradientTop)
        } else {
            gradient.addColorStop(0, gradientBottom)
            gradient.addColorStop(1, hoverGradientTop)
        }
    }
    return gradient
}

function average(context) {
    const values = context.chart.data.datasets[0].data;
    return values.reduce((a, b) => a + b, 0) / values.length;
}

new Chart(context, {
    type: 'bar',
    data: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            data: [4986.11, 12441.98, 9221.43, 14141.80, 8777.00, 13441.49, 18999.89, 9555.13, 15650.25, 8321.49, 9666.99, 18350.00],
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: function(context) {
                const chart = context.chart
                const {ctx, chartArea} = chart

                if (!chartArea) return;
                return getGradient(ctx, chartArea, false)
            },
            hoverBackgroundColor: function(context) {
                const chart = context.chart
                const {ctx, chartArea} = chart

                if (!chartArea) return;
                return getGradient(ctx, chartArea, true)
            },
        }],  
    },
    options: {
        plugins: {
            annotation: {
                annotations: {
                    type: 'line',
                    borderColor: 'white',
                    borderWidth: 1,
                    display: (context) => context.chart.isDatasetVisible(1),
                    label: {
                        enabled: true,
                        content: 'Now',
                        position: 'start'
                    },
                    scaleID: 'x',
                    value: 'Jul'
                }
            },
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgb(180, 180, 180)',
                },
            },
            y: {
                beginAtZero: true,
                border: {
                    display: false,
                },
                grid: {
                    color: 'rgb(41, 41, 41)',
                    drawTicks: false,
                },
                ticks: {
                    color: 'rgb(180, 180, 180)',
                    callback: value => `${value / 1000}K`
                },
            }
        }
    }
});


// annotation: {
//     annotations: [{
//         type: 'line',
//         borderColor: 'white',
//         borderDash: [6, 6],
//         borderDashOffset: 0,
//         borderWidth: 3,
        
//         label: {
//             enabled: true,
//             content: function(context) {
//                 'Average: ' + average(context).toFixed(2)
//             },
//             position: 'end'
//         },
//         scaleID: 'y',
//         value: function(context) {
//             average(context)
//         }
//     }],
// },
