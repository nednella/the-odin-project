// JavaScript

const context = document.getElementById('expenditure-chart');
const gradientBottom = 'red'
const gradientTop = 'blue'

function getGradient(context, chartArea) {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left
    const chartHeight = chartArea.bottom - chartArea.top
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth
        height = chartHeight
        gradient = context.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
        gradient.addColorStop(0, gradientBottom)
        gradient.addColorStop(1, gradientTop)
    }
    return gradient 
}

new Chart(context, {
    type: 'bar',
    data: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            data: [4986.11, 12441.98, 9221.4, 14141, 8777, 13441, 18999, 9555, 15650, 8321, 9666, 18350],
            borderWidth: 1,
            backgroundColor: function(context) {
                const chart = context.chart
                const {ctx, chartArea} = chart

                if (!chartArea) return;
                return getGradient(ctx, chartArea)
            }
        }],  
    },
    options: {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});
