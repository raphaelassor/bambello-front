
import React, { Component } from 'react'
import { Pie, Bar,defaults } from 'react-chartjs-2'

defaults.layout=false;

export class BoardCharts extends Component {



    get cardsPerMemberData() {
        const { cardsPerMemberMap } = this.props.chartsData
        return {
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
                }
            ]
        }
    }


    get cardsPerLabelData() {
        const { cardsPerLabelMap } = this.props.chartsData
        return {
            labels: Object.keys(cardsPerLabelMap),
            datasets: [
                {
                    label: 'Tasks per label',
                    data: Object.values(cardsPerLabelMap).map(value => value.count),
                    backgroundColor: Object.values(cardsPerLabelMap).map(value => value.color),
                },
            ]
        }
    }
    render() {
        const { cardsPerMemberMap, cardsPerLabelMap, cardsPerListMap } = this.props.chartsData
        return (
            <div className="board-charts flex justify-center">
                <div className="pie-chart">
                    <Pie
                        data={this.cardsPerLabelData}
                        options={{
                            maintainAspectRatio: false,
                            title: {
                                display: true,
                                text: 'Tasks per label',
                            },
                            legend: {
                                display: false,
                            }
                        }}
                    />
                </div>
                <div className="pie-chart">
                    <Bar
                        data={this.cardsPerMemberData}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />

                </div>
            </div>
        )
    }
}

