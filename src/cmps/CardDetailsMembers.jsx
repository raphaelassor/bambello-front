import Avatar from '@material-ui/core/Avatar';
export function CardDetailsMembers({ members }) {
    return (
        <div className="card-details-members flex column">
            <h3 className="card-details-item-header">Members</h3>
            <div className="members-container flex wrap">
                {members.map(member => {
                   return <Avatar key={member._id} style={{ backgroundColor: '#DFE1E6', color: '#172b4d', width: '32px', height: '32px', fontWeight: 'bold', fontSize: '14px' }}>{member.fullname.charAt(0)}</Avatar>
                })}
            </div>
        </div>
    )
}