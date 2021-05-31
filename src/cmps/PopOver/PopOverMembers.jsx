import { Component } from "react";
import { PopOver } from "./PopOver";
import { boardService } from '../../services/board.service'
import { MemberPopOverPreview } from '../MemeberPopOverPreview'
import { onSaveBoard } from "../../store/actions/board.actions";
import { connect } from 'react-redux'


class _PopOverMembers extends Component {

    state = {
        inputTxt: '',
        presentedMembers: '',
    }

    componentDidMount() {
        this.setState({ presentedMembers: this.props.board.members })

    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ presentedMembers: this.props.board.members.filter(member => filterRegex.test(member.fullname)) })
        })
    }
    toggleMember = (member) => {
        const { card, board } = this.props

        const idx = card.members.findIndex(cardMember => cardMember._id === member._id)
        console.log('index is:', idx)
        if (idx === -1) card.members.push(member)
        else card.members.splice(idx, 1)
        console.log('card is:', card)
        const updatedBoard = boardService.updateCardInBoard(board, card)
        this.props.onSaveBoard(updatedBoard)
        // onSaveCardFromActions(card)
    }

    isMemberInCard = (member) => {
        return this.props.card.members.some(cardMember => cardMember._id === member._id)
    }
    render() {
        const { presentedMembers, inputTxt } = this.state
        if (!presentedMembers) return '';
        return <PopOver title={"Members"} >
            <div className="members-pop-over-content">
                <input className="pop-over-input" type="text" value={inputTxt} onChange={this.handleChange} placeholder={"Search members"} />
                <h4>BOARD MEMBERS</h4>
                <ul className="clean-list">

                    {presentedMembers.map(member => <MemberPopOverPreview key={member._id} member={member}
                        toggleMember={this.toggleMember} isInCard={this.isMemberInCard(member)} />)}
                </ul>
            </div>
        </PopOver>


    }

}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard
}


export const PopOverMembers = connect(mapStateToProps, mapDispatchToProps)(_PopOverMembers)

