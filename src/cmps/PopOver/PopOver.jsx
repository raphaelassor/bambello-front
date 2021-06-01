import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { closePopover } from '../../store/actions/app.actions'
import { ScreenOverlay } from '../ScreenOverlay'
import {Component} from 'react'
export class _Popover extends Component {

    state = {
        top: null,
        lef: null
    }

    
    componentDidMount() {
        window.addEventListener('resize',()=>{
            if(window.visualViewport.width>1000)return
            this.setPopoverPos()
        });
        // add remove event 
        this.setPopoverPos()

    }

    setPopoverPos=()=>{
        let { left,top } = this.props.elPos
        top+=38
        if(!this.selectedDiv) return
        const PopoverRect=this.selectedDiv.getBoundingClientRect()
        const {height,width}=PopoverRect
        const viewportWidth=window.visualViewport.width
        const viewportHeight=window.visualViewport.height
        if (left+width> viewportWidth ) left= viewportWidth-width-10
        if(top+height>viewportHeight) top= viewportHeight-height-10
        this.setState({top,left})
    }

    render() {
        const { children, title, closePopover, isOverlayOpen,overlay ,styleMode } = this.props
        const { top, left } = this.state
        return <>
            {/* {isOverlayOpen && <ScreenOverlay goBack={closePopover} styleMode="transparent" />} */}
            {overlay !=='none' && isOverlayOpen && <div className="overlay" onClick={closePopover} />}
            <div className=" pop-over" style={{ top: `${top}px`, left: `${left}px` }} ref={(div) => { this.selectedDiv= div }} >
                <div className={`pop-over-header ${styleMode==='clean'? 'clean' : ''} `}>
                    <span>{title}</span>
                    <button className="clean-btn" onClick={closePopover}>
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
    closePopover
}

function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        elPos: state.appModule.currPopover.elPos
    }
}
export const Popover = connect(mapStateToProps, mapDispatchToProps)(_Popover)