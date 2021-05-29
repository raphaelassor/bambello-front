import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/actions/board.actions'
import { CardDetailsLabels } from '../cmps/CardDetailsLabels'
import { CardDetailsMembers } from '../cmps/CardDetailsMembers'
import { CardDescription } from '../cmps/CardDescription'
import { CardChecklists } from '../cmps/CardChecklists'
import { CardDetailsActions } from '../cmps/CardDetailsActions'


class _CardDetails extends Component {

    state = {
        list: null,
        card: null,
    }

    componentDidMount() {
        // SETTING LIST AND CARD FROM PARAMS
        const { cardId, listId } = this.props.match.params
        const { board: { lists } } = this.props
        const list = lists.find(list => list.id === listId)
        const { cards } = list;
        const card = cards.find(card => card.id === cardId)
        this.setState({ card, list })
    }

    get cardLabels() {
        const { card: { labelIds } } = this.state
        const { board: { labels } } = this.props
        const cardLabels = labels.reduce((acc, label) => {
            if (labelIds.some(labelId => labelId === label.id)) acc.push(label)
            return acc
        }, [])
        return cardLabels
    }

    cardTitleHandleChange = ({ target: { value } }) => {
        const { card } = this.state
        if (card.title === value) return
        card.title = value
        this.setState({ card })
    }

    onSaveCard = () => {
        const { card, list } = this.state;
        const { board, board: { lists } } = this.props
        const { cards } = list
        const listIdx = lists.indexOf(list)
        const cardIdx = list.cards.indexOf(card)
        cards[cardIdx] = card // deploy card into cards
        board.lists[listIdx].cards = cards // saving cards to the currlist
        this.props.onSaveBoard(board)
    }

    onSaveCardFromActions = (card) => {
        this.setState({ card }, this.onSaveCard())
    }

    onSaveCardDescription = (description) => {
        const { card } = this.state
        if (card.description === description) return
        card.description = description
        this.setState({ card }, this.onSaveCard())
    }

    onSaveCardChecklists = (checklists) => {
        const { card } = this.state
        card.checklists = checklists
        this.setState({ card }, this.onSaveCard())
    }


    goBackToBoard = () => {
        const { board } = this.props
        this.props.history.push(`/board/${board._id}`)
    }


    render() {
        const { board, onSaveBoard } = this.props
        const { card, list } = this.state
        if (!card) return '' //LOADER PLACER
        const { title, members, description, checklists } = card
        return (
            <section className="card-details flex-column">
                <button onClick={() => this.goBackToBoard()} className="close-window-btn flex align-center justify-center"><CloseRoundedIcon /></button>
                <i className="far fa-window-maximize window-icon icon-lg"></i>
                <div className="card-details-header">
                    <TextareaAutosize value={title} aria-label="empty textarea" onBlur={this.onSaveCard} onChange={this.cardTitleHandleChange} />
                    <p className="bottom-list-name">in list {list.title}</p>
                </div>
                <div className="flex">
                <div className="card-details-main flex column">
                    <div className="card-details-items flex">
                        {members.length &&<CardDetailsMembers members={members} />}
                        {!!this.cardLabels.length &&<CardDetailsLabels labels={this.cardLabels} />}
                    </div>
                    <CardDescription description={description} onSaveCardDescription={this.onSaveCardDescription} />
                    <CardChecklists checklists={checklists} onSaveCardChecklists={this.onSaveCardChecklists} />
                </div>
                <div className="card-details-sidebar flex column full">
                    <CardDetailsActions board={board} card={card} onSaveBoard={onSaveBoard} onSaveCardFromActions={this.onSaveCardFromActions} />
                </div>
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

















