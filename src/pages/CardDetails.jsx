import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/actions/board.actions'
import { DueDateDisplay } from '../cmps/DueDateDisplay';
import { ScreenOverlay } from '../cmps/ScreenOverlay'
import { CardDetailsLabels } from '../cmps/CardDetails/CardDetailsLabels'
import { CardDetailsMembers } from '../cmps/CardDetails/CardDetailsMembers'
import { CardDescription } from '../cmps/CardDetails/CardDescription'
import { CardChecklists } from '../cmps/CardDetails/CardChecklists'
import { CardDetailsActions } from '../cmps/CardDetails/CardDetailsActions'
import { CardDetailsCover } from '../cmps/CardDetails/CardDetailsCover'
import { CardAttachments } from '../cmps/CardDetails/CardAttachments'


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

    onDeleteCardAttachment = (ev,attachId) => {
        ev.preventDefault()
        let { card, card: { attachs } } = this.state
        attachs = attachs.filter(currAttach => currAttach.id !== attachId)
        card.attachs = attachs
        this.setState({ card }, this.onSaveCard())
    }

    toggleCardDone = () => {
        const { card } = this.state
        card.isDone = !card.isDone
        this.setState({ card }, () => {
            console.log('card is ', this.state.card)
            this.onSaveCard()
        })
    }


    goBackToBoard = () => {
        const { board } = this.props
        this.props.history.push(`/board/${board._id}`)
    }


    render() {
        const { board, onSaveBoard } = this.props
        const { card, list } = this.state
        if (!card) return '' //LOADER PLACER
        const { title, members, description, checklists, dueDate, style: { bgColor }, attachs } = card
        return (<>
            <ScreenOverlay goBackToBoard={this.goBackToBoard} />
            <section className="card-details flex-column">
                <button onClick={() => this.goBackToBoard()} className={`close-window-btn ${bgColor ? 'cover-mode' : ''} flex align-center justify-center`}>
                    <CloseRoundedIcon />
                </button>
                {bgColor && <CardDetailsCover bgColor={bgColor} />}
                <div className="card-details-header">
                    <div className="header-content flex align-center">
                        <WebAssetIcon />
                        <TextareaAutosize value={title} aria-label="empty textarea" onBlur={this.onSaveCard} onChange={this.cardTitleHandleChange} />
                    </div>
                    <p className="bottom-list-name">in list <span>{list.title}</span></p>
                </div>
                <div className="flex">
                    <div className="card-details-main flex column">
                        <div className="card-details-items flex wrap">
                            {!!members.length && <CardDetailsMembers members={members} />}
                            {!!this.cardLabels.length && <CardDetailsLabels labels={this.cardLabels} />}
                            {!!dueDate && <DueDateDisplay displayType="details" card={card} toggleCardDone={this.toggleCardDone} onSaveCardFromActions={this.onSaveCardFromActions} />}
                        </div>
                        <CardDescription description={description} onSaveCardDescription={this.onSaveCardDescription} />
                        {!!attachs.length && <CardAttachments attachs={attachs} onDeleteCardAttachment={this.onDeleteCardAttachment}/>}
                        <CardChecklists checklists={checklists} onSaveCardChecklists={this.onSaveCardChecklists} />
                    </div>
                    <div className="card-details-sidebar flex column full">
                        <CardDetailsActions board={board} card={card} goBackToBoard={this.goBackToBoard} onSaveBoard={onSaveBoard} onSaveCardFromActions={this.onSaveCardFromActions} />
                    </div>
                </div>
            </section>
        </>
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

















