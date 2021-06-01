import { Component } from 'react'
import { connect } from 'react-redux'
import { closePopover } from '../../store/actions/app.actions'
import { boardService } from '../../services/board.service';
import CloseIcon from '@material-ui/icons/Close';

export class _PopoverEditCard extends Component {

    state = {
        top: null,
        lef: null
    }


    componentDidMount() {
        window.addEventListener('resize', () => {
            if (window.visualViewport.width > 1000) return
            this.onSetPopoverPos()
        });
        // add remove event 
        this.onSetPopoverPos()
    }

    componentDidUpdate(prevProps) {
        if (this.props.elPos !== prevProps.elPos) {
            this.onSetPopoverPos()
        }
    }


    onSetPopoverPos = (diff) => {
        const { elPos } = this.props
        if (!this.selectedDiv) return
        const elRect = this.selectedDiv.getBoundingClientRect()
        const { left, top } = boardService.setPopoverPos(elPos, elRect)

        this.setState({ top, left })
    }

    render() {
        const { children, title, closePopover } = this.props
        const { top, left } = this.state

        return <>
            <div className="overlay" onClick={closePopover}/>
            <button className="clean-btn" onClick={closePopover}>
                <CloseIcon style={{ width: '16px', height: '16px' }} />
            </button>
            <div className="pop-over-edit-card" style={{ top: `${top}px`, left: `${left}px` }} ref={(div) => { this.selectedDiv = div }} >
                <span>{title}</span>
                <div className="pop-over-content">
                    {children}
                </div>
            </div>
        </>

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