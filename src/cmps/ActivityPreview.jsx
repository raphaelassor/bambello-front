import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Moment from 'react-moment'


export class ActivityPreview extends Component {

    get fullActivity() {
        const { activity: { actionType, txt, card }, isGeneral } = this.props
        const activityLoc = isGeneral ? card.title : 'this card'
        switch (actionType) {
            case 'attached':
                return `attached ${txt} to ${activityLoc}`
            case 'added':
                return `added ${txt} to ${activityLoc}`
            case 'removed':
                return `removed ${txt} from ${activityLoc}`
            case 'joined':
                return `joined ${activityLoc}`
            case 'completed':
                return `completed ${txt} on ${activityLoc}`
            case 'archived':
                return `archived ${activityLoc}`
            case 'moved':
                return `moved ${activityLoc} from ${txt}`
            case 'changed':
                return `changed ${txt}`
            case 'renamed':
                return `renamed this board to ${txt}`
            default:
                return
        }
    }

    render() {
        const { activity: { actionType, txt, createdAt, byMember, card }, isGeneral } = this.props
        return (
            <div className="activity-preview flex">
                <Avatar style={{ backgroundColor: '#DFE1E6', color: '#172b4d', width: '32px', height: '32px', fontWeight: 'bold', fontSize: '14px' }}>{byMember.fullname.charAt(0)}</Avatar>
                {actionType === 'comment' &&
                    <div className="comment-content">
                        <div className="main flex align-center">
                            <span className="member-name">{byMember.fullname}</span>
                            {isGeneral && <span>{`on ${card.title}`}</span>}
                            <Moment className="publish-time" fromNow>{createdAt}</Moment>
                        </div>
                        <div className="comment-body">
                            <span>{txt}</span>
                        </div>
                    </div>}
                {actionType !== 'comment' &&
                    <div className="activity-content flex column">
                        <div className="main flex align-center">
                            <span className="member-name">{byMember.fullname}</span>
                            <span>{this.fullActivity}</span>
                        </div>
                        <Moment className="publish-time" fromNow>{createdAt}</Moment>
                    </div>}
            </div>
        )
    }

}