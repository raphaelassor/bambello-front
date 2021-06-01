import { PopoverMembers } from "./PopoverMembers";
import { connect } from 'react-redux'
import { PopoverLabels } from "./PopoverLabels";
import { PopoverCover } from "./PopoverCover";
import { PopoverDate } from "./PopoverDate";
import { PopoverAttach } from "./PopoverAttach";
import { PopoverChecklist } from "./PopoverChecklist";
import { PopoverMoveCopy } from './PopoverMoveCopy';
import { PopoverProfile } from './PopoverProfile';
import { PopoverInvite } from "./PopoverInvite";
import { PopoverInvite } from "./PopoverEditCard";

export function _DynamicPopover({ currPopover }) {

    const { name, props } = currPopover

    switch (name) {
        case 'MEMBERS': return <PopoverMembers {...props} />;
        case 'LABELS': return <PopoverLabels {...props} />;
        case 'COVER': return <PopoverCover {...props} />;
        case 'DATE': return <PopoverDate {...props} />;
        case 'COPY': return <PopoverMoveCopy popoverType="copy" {...props} />;
        case 'MOVE': return <PopoverMoveCopy popoverType="move" {...props} />;
        case 'ATTACH': return <PopoverAttach {...props} />;
        case 'CHECKLIST': return <PopoverChecklist {...props} />;
        case 'PROFILE': return <PopoverProfile {...props} />
        case 'INVITE': return <PopoverInvite {...props} />
        case 'EDIT_CARD': return <PopoverEditCard {...props} />
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