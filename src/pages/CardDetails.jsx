import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux'
import { boardService } from '../services/board.service'
import { CardDetailsLabels } from '../cmps/CardDetailsLabels'


class _CardDetails extends Component {

    state = {
        currListTitle: null,
        card: null,
        board: null, // from props 

    }

    componentDidMount() {
        this.getCard()
    }

    getCard = async () => {
        // getting currList Idx as props for example: 0
        // const { board } = this.props 
        const board = await boardService.query()
        const { lists } = board
        const currListIdx = 0
        const currListTitle = lists[currListIdx].title
        const cardId = this.props.match.params.cardId
        const card = lists[currListIdx].cards.find(card => card.id === cardId)
        this.setState({ card, currListTitle, board })
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

    render() {
        const { card, currListTitle, board, cardLabels } = this.state
        if (!card || !board) return '' //LOADER PLACER
        const { title } = card
        this.getCardLabels()
        return (
            <section className="card-details">
                <button className="close-window-btn">&times;</button>
                <i className="far fa-window-maximize window-icon icon-lg"></i>
                <div className="card-details-header">
                    <TextareaAutosize value={title} aria-label="empty textarea" />
                    <p className="bottom-list-name">in list {currListTitle}</p>
                </div>
                <div className="card-details-main">
                    <CardDetailsLabels labels={this.getCardLabels()} />
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
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)

















