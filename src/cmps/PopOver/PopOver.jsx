import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import {closePopOver} from '../../store/actions/app.actions'
import {ScreenOverlay} from '../ScreenOverlay'
export function _PopOver({ children, title ,closePopOver,isOverlayOpen}) {

    console.log(isOverlayOpen, 'hrllo')
    return <>
   {isOverlayOpen&& <ScreenOverlay goBack={closePopOver} styleMode="transparent"/> }
    <div className=" pop-over">
        <div className="pop-over-header">
            <span>{title}</span>
            <button className="clean-btn" onClick={closePopOver}>
                <CloseIcon style={{ width: '16px', height: '16px' }} />
            </button>
        </div>
        <div className="pop-over-content">
        {children}
        </div>
    </div></>

}


const mapDispatchToProps = {
   closePopOver
}

function mapStateToProps(state){
    return{
        isOverlayOpen:state.appModule.isOverlayOpen
    }
}
export const PopOver = connect(mapStateToProps, mapDispatchToProps)(_PopOver)