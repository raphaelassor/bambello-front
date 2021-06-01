import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
export function MemberPopoverPreview({member,toggleMember,isInCard}){

return <li onClick={()=>toggleMember(member)} className="member-pop-over-preview flex">
    <Avatar style={{backgroundColor:'#DFE1E6',color:'#172b4d',width:'32px',height:'32px',fontWeight:'bold',fontSize:'14px'}}>aa</Avatar>
    <span>{member.fullname}</span>
    {isInCard && <span className="icon-check" ><CheckIcon style={{width:'16px'}}/> </span>}

</li>

}