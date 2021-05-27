import CheckIcon from '@material-ui/icons/Check';
export function LabelPopOverPreview({label,toggleLabel,isInCard}){

    return <li style={{backgroundColor:label.color,color:'white'}} onClick={()=>toggleLabel(label)} className="label-pop-over-preview flex justify-space-between">
        <span>{label.title}</span>
        {isInCard && <span className="icon-check" ><CheckIcon style={{width:'16px',height:'16px',color:'white'}}/> </span>}
    </li>
}