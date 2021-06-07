
import React, { Component } from 'react'
import { Doughnut, Bar, defaults, } from 'react-chartjs-2'



export class BoardCharts extends Component {
    componentDidMount() {
        defaults.font.size = 16
        defaults.color = '#fff'
        defaults.plugins.legend.display = false
    }

    get cardsPerMemberData() {
        const { cardsPerMemberMap } = this.props.chartsData
        return {
            labels: Object.keys(cardsPerMemberMap),
            datasets: [
                {
                    data: Object.values(cardsPerMemberMap),
                    backgroundColor: '#0079bf',
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
                    data: Object.values(cardsPerLabelMap).map(value => value.count),
                    backgroundColor: Object.values(cardsPerLabelMap).map(value => value.color),
                    borderWidth: 0,
                },
            ],
        }
    }

    get cardsPerListData() {
        const { cardsPerListMap } = this.props.chartsData
        return {
            labels: Object.keys(cardsPerListMap),
            datasets: [
                {
                    data: Object.values(cardsPerListMap),
                    backgroundColor: '#0079bf',
                    borderWidth: 0,
                },
            ],
        }
    }
    render() {
        return (
            <div className="board-charts flex wrap justify-center align-center">
                <div className=" flex column">
                    <h3>Tasks per label</h3>
                    <div className="chart">
                        <Doughnut
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
                </div>
                <div className="flex column">
                    <h3>Tasks per member</h3>
                    <div className="chart">
                        <Bar
                            data={this.cardsPerMemberData}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
                <div className="flex column">
                    <h3>Tasks per list</h3>
                    <div className="chart">
                        <Bar
                            data={this.cardsPerListData}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

