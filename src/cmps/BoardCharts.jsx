
import { Pie, Bar } from 'react-chartjs-2'

export function BoardCharts({ chartsData: { cardsPerMemberMap, cardsPerLabelMap, cardsPerListMap } }) {

    const newTry = Object.values(cardsPerLabelMap).map(value => {
        return value.count
    })

    console.log(newTry)
    const cardsPerMemberData = {
        labels: Object.keys(cardsPerMemberMap),
        datasets: [
            {
                label: 'Tasks per member',
                data: Object.values(cardsPerMemberMap),
                backgroundColor: [
                    '#ff595e',
                    '#ffca3a',
                    '#8ac926',
                    '#6a4c93',
                    '#a3cef1',
                    '#ea3546',
                ],
                borderWidth: 0,
            }
        ]
    }

    const cardsPerLabelData = {
        labels: Object.keys(cardsPerLabelMap),
        datasets: [
            {
                color: '#666',
                label: 'Tasks per label',
                data: Object.values(cardsPerLabelMap).map(value => value.count),
                backgroundColor: Object.values(cardsPerLabelMap).map(value => value.color),
                borderWidth: 1,
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                },
            }
        ]
    }

    return (
        <div className="board-charts">
            <div className="pie-chart">
                <Pie data={cardsPerLabelData} />
            </div>
            <div className="pie-chart">
                <Bar data={cardsPerMemberData} />
            </div>
        </div>
    )
}

