import { connect } from 'react-redux'
import { PopoverMembers } from "./PopoverMembers";
import { PopoverLabels } from "./PopoverLabels";
import { PopoverCover } from "./PopoverCover";
import { PopoverDate } from "./PopoverDate";
import { PopoverAttach } from "./PopoverAttach";
import { PopoverChecklist } from "./PopoverChecklist";
import { PopoverMoveCopy } from './PopoverMoveCopy';
import { PopoverProfile } from './PopoverProfile';
import { PopoverInvite } from "./PopoverInvite";
<<<<<<< HEAD
// import { PopoverEditCard } from "./PopoverEditCard";

=======
import {PopoverMenu} from './PopoverMenu'
import {PopoverBackground} from './PopoverBackground'
import { PopoverArchive } from './PopoverArchive';
import { PopoverEditCard } from "./PopoverEditCard";
>>>>>>> d3798e946207e1b3fb75ddeb0685f08386395a6d
export function _DynamicPopover({ currPopover }) {
    const { name, props } = currPopover
 
    switch (name) {
        case 'MEMBERS': return <PopoverMembers {...props} />;
        case 'LABELS': return <PopoverLabels {...props} />;
        case 'COVER': return <PopoverCover {...props} />;
        case 'DATE': return <PopoverDate {...props} />;
        case 'COPY': return <PopoverMoveCopy PopoverType="copy" {...props} />;
        case 'MOVE': return <PopoverMoveCopy PopoverType="move" {...props} />;
        case 'ATTACH': return <PopoverAttach {...props} />;
        case 'CHECKLIST': return <PopoverChecklist {...props} />;
        case 'PROFILE': return <PopoverProfile {...props} /> 
        case 'INVITE': return <PopoverInvite {...props} />
<<<<<<< HEAD
        // case 'EDIT_CARD': return <PopoverEditCard {...props} />
=======
        case 'MENU': return <PopoverMenu {...props} />
        case 'BACKGROUND': return <PopoverBackground {...props} />
        case 'ARCHIVE': return <PopoverArchive {...props} />
        case 'EDIT_CARD': return <PopoverEditCard {...props} />
>>>>>>> d3798e946207e1b3fb75ddeb0685f08386395a6d
        default: return '';
    }
}
function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        currPopover: state.appModule.currPopover
    }
}
export const DynamicPopover = connect(mapStateToProps, null)(_DynamicPopover)