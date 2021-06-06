import React, { Component } from 'react'
import { connect } from 'react-redux'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { ScreenOverlay } from '../cmps/ScreenOverlay'
import AssignmentIcon from '@material-ui/icons/Assignment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { ReactComponent as ExclamationIcon } from '../assets/img/icons/exclamation-lg.svg'
import { BoardCharts } from '../cmps/BoardCharts'

class _Dashboard extends Component {

    state = {
        chartsData: null
    }

    componentDidMount() {
        const cardsPerMemberMap = this.cardsPerMemberMap
        const cardsPerLabelMap = this.cardsPerLabelMap
        const cardsPerListMap = this.cardsPerListMap
        this.setState({ chartsData: { cardsPerMemberMap, cardsPerLabelMap, cardsPerListMap } })
    }

    get allCards() {
        // getting array of all cards ( tasks ) in board
        const { lists } = this.props.board
        return lists.reduce((acc, list) => {
            acc = acc.concat(list.cards)
            return acc
        }, [])
    }

    get cardsCount() {
        const { lists } = this.props.board
        const cardsCount = lists.reduce((acc, list) => {
            acc += list.cards.length
            return acc
        }, 0)
        return cardsCount
    }

    get overdueCardsCount() {
        const { lists } = this.props.board
        const overdueCardsCount = lists.reduce((acc, list) => {
            const overdueCardsCountPerList = list.cards.reduce((acc, card) => {
                if (card.dueDate < Date.now() && card.dueDate) acc++
                return acc
            }, 0)
            acc += overdueCardsCountPerList
            return acc
        }, 0)
        return overdueCardsCount
    }

    get dueSoonCardsCount() {
        const { lists } = this.props.board
        const dueSoonCardsCount = lists.reduce((acc, list) => {
            const dueSoonCardsCountPerList = list.cards.reduce((acc, card) => {
                if (card.dueDate && Date.now() <= card.dueDate) {
                    const timeDiff = card.dueDate - Date.now()
                    if ((timeDiff < 86400000) && card.dueDate) acc++
                }
                return acc
            }, 0)
            acc += dueSoonCardsCountPerList
            return acc
        }, 0)
        return dueSoonCardsCount
    }

    get cardsPerMemberMap() {
        const { members } = this.props.board
        const allCards = this.allCards
        const cardsPerMemberMap = members.reduce((acc, member) => {
            if (!acc[member.fullname]) acc[member.fullname] = 0
            const cardsPerMemberCount = allCards.reduce((acc, card) => {
                const memberIdx = card.members.findIndex(currMember => currMember._id === member._id)
                if (memberIdx > -1 && !card.isDone) acc++
                return acc
            }, 0)
            acc[member.fullname] = cardsPerMemberCount
            return acc
        }, {})
        return cardsPerMemberMap
    }

    get cardsPerLabelMap() {
        const { labels } = this.props.board
        const allCards = this.allCards
        const cardsPerLabelMap = labels.reduce((acc, label) => {
            if (!acc[label.title]) acc[label.title] = { count: 0, color: label.color }
            const cardsPerLabelCount = allCards.reduce((acc, card) => {
                const labelIdx = card.labelIds.findIndex(currLabelId => currLabelId === label.id)
                if (labelIdx > -1 && !card.isDone) acc++
                return acc
            }, 0)
            acc[label.title].count = cardsPerLabelCount
            return acc
        }, {})
        return cardsPerLabelMap
    }

    get cardsPerListMap() {
        const { lists } = this.props.board
        const cardsPerListMap = lists.reduce((acc, list) => {
            if (!acc[list.title]) acc[list.title] = 0
            acc[list.title] = list.cards.length
            return acc
        }, {})
        return cardsPerListMap
    }

    goBackToBoard = () => {
        const { board } = this.props
        this.props.history.push(`/board/${board._id}`)
    }

    render() {
        const { chartsData } = this.state
        if (!chartsData) return '' //LOADER
        return (
            <>
                <ScreenOverlay styleMode="darken" />
                <section className="dashboard-container flex column">
                    <CloseRoundedIcon className="close-svg" onClick={() => this.goBackToBoard()} />
                    <div className="general-statistics flex justify-center wrap">
                        <div className="stats flex align-center">
                            <div className="logo-container flex align-center justify-center">
                                <AssignmentIcon />
                            </div>
                            <div className="content flex column full">
                                <h3>Tasks</h3>
                                <h4>{this.cardsCount}</h4>
                            </div>
                        </div>
                        <div className="stats flex align-center">
                            <div className="logo-container flex align-center justify-center">
                                <QueryBuilderIcon />
                            </div>
                            <div className="content flex column full">
                                <h3>Due soon Tasks</h3>
                                <h4>{this.dueSoonCardsCount}</h4>
                            </div>
                        </div>
                        <div className="stats flex align-center">
                            <div className="logo-container flex align-center justify-center">
                                <ExclamationIcon />
                            </div>
                            <div className="content flex column full">
                                <h3>Overdue Tasks</h3>
                                <h4>{this.overdueCardsCount}</h4>
                            </div>
                        </div>
                    </div>
                    <BoardCharts chartsData={chartsData} />
                </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

export const Dashboard = connect(mapStateToProps, null)(_Dashboard)
