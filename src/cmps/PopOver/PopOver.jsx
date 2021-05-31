import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { closePopOver } from '../../store/actions/app.actions'
import { ScreenOverlay } from '../ScreenOverlay'
import {Component} from 'react'
export class _PopOver extends Component {

    state = {
        top: null,
        lef: null
    }

    
    componentDidMount() {
        window.addEventListener('resize',()=>{
            if(window.visualViewport.width>975)return
            this.setPopOverPos()
        });
        this.setPopOverPos()

    }

    setPopOverPos=()=>{
        let { left,top } = this.props.elPos
        top+=38
        const popOverRect=this.selectedDiv.getBoundingClientRect()
        const {height,width}=popOverRect
        const viewportWidth=window.visualViewport.width
        const viewportHeight=window.visualViewport.height
        if (left+width> viewportWidth ) left= viewportWidth-width-10
        if(top+height>viewportHeight) top= viewportHeight-height-10
        this.setState({top,left})
    }

    render() {
        const { children, title, closePopOver, isOverlayOpen } = this.props
        const { top, left } = this.state
        return <>
            {/* {isOverlayOpen && <ScreenOverlay goBack={closePopOver} styleMode="transparent" />} */}
            {isOverlayOpen && <div className="overlay" onClick={closePopOver} />}

            <div className=" pop-over" style={{ top: `${top}px`, left: `${left}px` }} ref={(div) => { this.selectedDiv= div }} >
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
}


const mapDispatchToProps = {
    closePopOver
}

function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        elPos: state.appModule.currPopOver.elPos
    }
}
export const PopOver = connect(mapStateToProps, mapDispatchToProps)(_PopOver)