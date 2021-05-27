import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux'
import { boardService } from '../services/board.service'
import { onSaveBoard } from '../store/actions/board.actions'
import { CardDetailsLabels } from '../cmps/CardDetailsLabels'
import { CardDetailsMembers } from '../cmps/CardDetailsMembers'
import { CardDescription } from '../cmps/CardDescription'


class _CardDetails extends Component {

    state = {
        currListIdx: null,
        currListTitle: null,
        card: null,
        board: null, // from props 

    }

    componentDidMount() {
        this.getCard()
    }

    getCard = async () => {
        // getting listId as params
        // const listId = this.props.match.params.listId
        // const { board } = this.props 
        const board = await boardService.query()
        const { lists } = board
        const currListIdx = 0
        const currListTitle = lists[currListIdx].title
        const cardId = this.props.match.params.cardId
        const card = lists[currListIdx].cards.find(card => card.id === cardId)
        this.setState({ card, currListTitle, board, currListIdx })
    }

    cardTitleHandleChange = ({ target:{value} }) => {
        const { card } = this.state
        card.title = value
        this.setState({ card })
    }


    getCardLabels = () => {
        // const { labels } = this.props.board 
        const { board: { labels }, card: { labelIds } } = this.state
        const cardLabels = labels.reduce((acc, label) => {
            if (labelIds.some(labelId => labelId === label.id)) acc.push(label)
            return acc
        }, [])
        return cardLabels
    }

    onSaveCard = () => {
        const { card, currListIdx, board } = this.state
        const { cards } = board.lists[currListIdx]
        const currCardIdx = cards.indexOf(card)
        cards[currCardIdx] = card
        board.lists[currListIdx].cards = cards
        this.props.onSaveBoard(board)
    }

    render() {
        const { card, currListTitle, board } = this.state
        if (!card || !board) return '' //LOADER PLACER
        const { title, members } = card
        this.getCardLabels()
        return (
            <section className="card-details flex-column">
                <button className="close-window-btn">&times;</button>
                <i className="far fa-window-maximize window-icon icon-lg"></i>
                <div className="card-details-header">
                    <TextareaAutosize  value={title} aria-label="empty textarea" onBlur={this.onSaveCard} onChange={this.cardTitleHandleChange} />
                    <p className="bottom-list-name">in list {currListTitle}</p>
                </div>
                <div className="card-details-main">
                    <div className="card-details-items flex">
                        <CardDetailsMembers members={members} />
                        <CardDetailsLabels labels={this.getCardLabels()} />
                    </div>
                    <CardDescription card={card} />
                </div>
                <div className="card-details-sidebar">
                </div>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    onSaveBoard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)

















