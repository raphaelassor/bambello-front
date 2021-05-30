import { Component } from "react";
import {PopOver } from "./PopOver/PopOver";

import { MemberPopOverPreview } from './MemeberPopOverPreview'


export class MembersPopOver extends Component {

    state = {
        inputTxt: '',
        presentedMembers: '',
    }

    componentDidMount() {
        this.setState({ presentedMembers: this.props.boardMembers })

    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ presentedMembers: this.props.boardMembers.filter(member => filterRegex.test(member.fullname)) })
        })
    }
     
    isMemberInCard = (member) => {
        return this.props.card.members.some(cardMember => cardMember._id === member._id)
    }
    render() {
        const { presentedMembers, inputTxt } = this.state
        if (!presentedMembers) return '';
        return <PopOver title={"Members"} togglePopOver={this.props.togglePopOver}>
            <div className="members-pop-over-content">
                <input className="pop-over-input" type="text" value={inputTxt} onChange={this.handleChange} placeholder={"Search members"} />
                <h4>BOARD MEMBERS</h4>
                <ul className="clean-list">

                {presentedMembers.map(member => <MemberPopOverPreview key={member._id} member={member}
                    toggleMember={this.props.toggleMember} isInCard={this.isMemberInCard(member)} />)}
                    </ul>
            </div>
        </PopOver>


    }

}

