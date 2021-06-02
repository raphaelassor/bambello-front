import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';

export function PopoverLabelPreview({ label, toggleLabel, isSelected, toggleEditMode }) {

    return <li className="flex">
        <div style={{ backgroundColor: label.color, color: 'white' }} onClick={() => toggleLabel(label)} className="label-pop-over-preview flex justify-space-between">
            <span>{label.title}</span>
            {isSelected && <span className="icon-check" ><CheckIcon style={{ width: '16px', height: '16px', color: 'white' }} /> </span>}
        </div>
        <div className="flex align-center justify-center">
            <EditIcon style={{ width: '16px', height: '16px', color: '#42526e' }} onClick={() => toggleEditMode(label)} />
        </div>
    </li>
} 