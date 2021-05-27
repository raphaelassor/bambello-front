import { Component } from "react";
import {EditPopOver } from "./EditPopOver";

import { MemberPopOverPreview } from './MemeberPopOverPreview'


export class MembersPopOver extends Component {

    state = {
        inputTxt: '',
        presentedMembers: '',
    }

    componentDidMount() {
        this.setState({ presentedMembers: this.props.boardMembers }, () => {
        })

    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ presentedMembers: this.props.boardMembers.filter(member => filterRegex.test(member.fullname)) })
        })
    }
     // NEEDS TO BE IN CARD DETALS
     
        //save to backend and get the new board from the store
  

    isMemberInCard = (member) => {
        return this.props.card.members.some(cardMember => cardMember._id === member._id)
    }
    render() {
        const { presentedMembers, inputTxt } = this.state
        if (!presentedMembers) return '';
        return <EditPopOver title={"Members"}>
            <div className="members-pop-over-content">
                <input className="pop-over-input" type="text" value={inputTxt} onChange={this.handleChange} placeholder={"Search members"} />
                <h4>BOARD MEMBERS</h4>
                <ul className="clean-list">

                {presentedMembers.map(member => <MemberPopOverPreview key={member._id} member={member}
                    toggleMember={this.props.toggleMember} isInCard={this.isMemberInCard(member)} />)}
                    </ul>
            </div>
        </EditPopOver>


    }

}

