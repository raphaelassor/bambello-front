import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import { closePopover } from '../../store/actions/app.actions'
import Avatar from '@material-ui/core/Avatar';

function _PopoverProfile({ member, closePopover }) {
    return (
        <div className="pop-over">
            <button className="clean-btn" onClick={closePopover}>
                <CloseIcon style={{ width: '16px', height: '16px' }} />
            </button>
            <div className="mini-profile">
                <span><Avatar key={member._id}>{member.fullname.split(' ').map(x => x.charAt(0)).join('')}</Avatar></span>
                <h2>{member.fullname}</h2>
                <span>@{member.username}</span>
                 {/* TODO: show only if it's user mini-profile */}
                {/* <Link>Edit profile info</Link> */}
            </div>
            <button>Remove from card</button>
        </div>
    )
}

const mapDispatchToProps = {
    closePopover
}

export const PopoverProfile = connect(null, mapDispatchToProps)(_PopoverProfile)