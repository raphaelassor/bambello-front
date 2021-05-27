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
        list: null,
        // currListIdx: null,
        // currListTitle: null,
        card: null,
        board: null, // from props 

    }

    componentDidMount() {
        this.loadCard()
    }

    loadCard = async () => {
        // getting listId as params
        const { cardId, listId } = this.props.match.params
        const { board: { lists } } = this.props

        const list = lists.find(list => list.id === listId)
        const { cards } = list;
        const card = cards.find(card => card.id === cardId)

        this.setState({ card, list })
    }

    cardTitleHandleChange = ({ target: { value } }) => {
        const { card } = this.state
        card.title = value
        this.setState({ card })
    }


    getCardLabels = () => {
        // const { labels } = this.props.board 
        const { card: { labelIds } } = this.state
        const { board: { labels } } = this.props
        const cardLabels = labels.reduce((acc, label) => {
            if (labelIds.some(labelId => labelId === label.id)) acc.push(label)
            return acc
        }, [])
        return cardLabels
    }

    onSaveCard = () => {
        const { card, list } = this.state;
        const { board, board: { lists } } = this.props
        const { cards } = list

        const listIdx = lists.indexOf(list)
        const cardIdx = list.cards.indexOf(card)

        cards[cardIdx] = card // deploy card into cards
        board.lists[listIdx].cards = cards

        this.props.onSaveBoard(board)
    }

    render() {
        const { card, list } = this.state
        const { board } = this.props

        if (!card || !board) return '' //LOADER PLACER

        const { title, members } = card
        this.getCardLabels()
        return (
            <section className="card-details flex-column">
                <button className="close-window-btn">&times;</button>
                <i className="far fa-window-maximize window-icon icon-lg"></i>
                <div className="card-details-header">
                    <TextareaAutosize value={title} aria-label="empty textarea" onBlur={this.onSaveCard} onChange={this.cardTitleHandleChange} />
                    <p className="bottom-list-name">in list {list.title}</p>
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

















