// import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import { Popover } from './Popover';

export function PopoverProfile({ member }) {
    return (
        <Popover>
            <div className="mini-profile">
                <span><Avatar key={member._id}>{member.fullname.split(' ').map(x => x.charAt(0)).join('')}</Avatar></span>
                <h2>{member.fullname}</h2>
                <span>@{member.username}</span>
                 {/* TODO: show only if it's user mini-profile */}
                {/* <Link>Edit profile info</Link> */}
            </div>
            <button>Remove from card</button>
        </Popover>
    )
}