import { PopOverMembers } from "./PopOverMembers";
import {connect} from 'react-redux'

export function _DynamicPopOver({currPopOver}){

    const {name,elPos,props}=currPopOver

    switch(name){
        case 'members': return <PopOverMembers {...props} />;
        default: return '';
    }

}
function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        currPopOver:state.appModule.currPopOver
    }
}
export const DynamicPopOver = connect(mapStateToProps, null)(_DynamicPopOver)