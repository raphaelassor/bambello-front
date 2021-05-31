import { PopOverMembers } from "./PopOverMembers";
import { connect } from 'react-redux'
import { PopOverLabels } from "./PopOverLabels";
import { PopOverCover } from "./PopOverCover";
import { PopOverDate } from "./PopOverDate";
import { PopOverAttach } from "./PopOverAttach";
import { PopOverChecklist } from "./PopOverChecklist";
import { PopOverMoveCopy } from './PopOverMoveCopy'
export function _DynamicPopOver({ currPopOver }) {

    const { name, props } = currPopOver

    switch (name) {
        case 'MEMBERS': return <PopOverMembers {...props} />;
        case 'LABELS': return <PopOverLabels {...props} />;
        case 'COVER': return <PopOverCover {...props} />;
        case 'DATE': return <PopOverDate {...props} />;
        case 'COPY': return <PopOverMoveCopy popOverType="copy" {...props} />;
        case 'MOVE': return <PopOverMoveCopy popOverType="move" {...props} />;
        case 'ATTACH': return <PopOverAttach {...props} />;
        case 'CHECKLIST': return <PopOverChecklist {...props} />;
        default: return '';
    }

}
function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        currPopOver: state.appModule.currPopOver
    }
}
export const DynamicPopOver = connect(mapStateToProps, null)(_DynamicPopOver)