import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import {closePopOver} from '../../store/actions/app.actions'
export function _PopOver({ children, title ,closePopOver}) {

    return <div className=" pop-over">
        <div className="pop-over-header">
            <span>{title}</span>
            <button className="clean-btn" onClick={closePopOver}>
                <CloseIcon style={{ width: '16px', height: '16px' }} />
            </button>
        </div>
        <div className="pop-over-content">
        {children}
        </div>
    </div>

}


const mapDispatchToProps = {
   closePopOver
}

export const PopOver = connect(null, mapDispatchToProps)(_PopOver)