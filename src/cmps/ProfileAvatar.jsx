import React from 'react'
// import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

export function ProfileAvatar({ member, size, onOpenPopover, showStatus = false }) {


    // const isMemberLoggedin = () => {
    //TODO: LOOP THAT RUN THROUGH MEMBERS AND CHECK WHO IS LOGGED IN
    // const {members} = this.props
    // }

    const avatarStyles = () => {
        let styles = {};
        // if (!member.imgUrl) styles.backgroundColor = member.bgColor; //TODO: remove comment if implemented bgColor in member
        styles.width = `${size}px`;
        styles.height = `${size}px`;
        return styles
    }

    const StyledBadge = withStyles((theme) => ({
        badge: {
            width: (+(((size * 27) / 100).toFixed(0))),
            height: (+(((size * 27) / 100).toFixed(0))),
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
            borderRadius: '50%',
            '&::after': {
                position: 'absolute',
                top: -1,
                left: -1,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(1.4)',
                opacity: 0,
            },
        },
    }))(Badge);

    return (
        <div className="profile-avatar" onClick={(ev) => onOpenPopover(ev, member)}>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                //TODO: variant={showStatus && isMemberLoggedin() &&'dot'}
                variant={showStatus && 'dot'}
            >
                <Avatar
                    className="avatar"
                    alt={member.fullname}
                    src={member.imgUrl}
                    style={avatarStyles()}
                >
                    {!member.imgUrl && member.fullname.split(' ').map(word => word.charAt(0)).join('')}
                </Avatar>
            </StyledBadge>
        </div>
    )
}

// function mapStateToProps(state) {
//     return {
//         board: state.boardModule.members
//     }
// }

// export const ProfileAvatar = connect(mapStateToProps)(_ProfileAvatar)
