import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
export function LabelPopOverPreview({label,toggleLabel,isInCard,toggleEditMode}){

    return <li className="flex">
   <div style={{backgroundColor:label.color,color:'white'}} onClick={()=>toggleLabel(label)} className="label-pop-over-preview flex justify-space-between">
        <span>{label.title}</span>
        {isInCard && <span className="icon-check" ><CheckIcon style={{width:'16px',height:'16px',color:'white'}}/> </span>}
   </div>
   <div className="flex align-center justify-center">
    <EditIcon style={{width:'16px',height:'16px',color:'#42526e'}} onClick={() =>toggleEditMode(label)} />
   </div>
    </li>
}