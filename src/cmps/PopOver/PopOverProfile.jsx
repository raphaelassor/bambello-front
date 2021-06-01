import { ProfileAvatar } from '../ProfileAvatar'
import { Popover } from './Popover'

export function PopoverProfile({ member }) {
    return (
        <Popover styleMode={'clean'} overlay={'none'}>
            <div className="mini-profile-container">
                <div className="mini-profile">
                    <div className="mini-profile-avatar"><ProfileAvatar member={member} size={50}/></div>
                    <div className="mini-profile-info">
                        <a>{member.fullname}</a>
                        <p>@{member.username.toLowerCase()}</p>
                        <a className="mini-profile-info-edit">Edit profile info</a>
                        {/* TODO: show only if it's the user mini-profile */}
                        {/* <Link>Edit profile info</Link> */}
                    </div>
                </div>
                <span className="clean-btn">Remove from card</span>
                {/* <button className="clean-btn">Remove from card</button> */}
            </div>
        </Popover >
    )
}
