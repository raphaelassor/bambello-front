import { Component } from 'react'
import { connect } from 'react-redux'
import { closePopover } from '../../store/actions/app.actions'
import { boardService } from '../../services/board.service';
import { Card } from '../Card';
import { ScreenOverlay } from '../ScreenOverlay'
// import CloseIcon from '@material-ui/icons/Close';

class _PopoverEditCard extends Component {

    state = {
        top: null,
        left: null,
        width: null
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
        // const { elPos } = this.props
        // if (!this.selectedDiv) return
        // const elRect = this.selectedDiv.getBoundingClientRect()
        // const { left, top, width } = boardService.setPopoverPos(elPos, null, 0)
        const {top, left, width } = this.props.elPos
        this.setState({ top, left, width })
    }

    render() {
        const { closePopover, card, board } = this.props
        const { top, left, width } = this.state
        return <>
            <ScreenOverlay goBack={closePopover} styleMode={'darken'}>

                {/* <button className="clean-btn" onClick={closePopover}>
                <CloseIcon />
            </button> */}

                <div className="edit-pop-over" style={{ top: `${top}px`, left: `${left}px`, width: `${width}px` }} ref={(div) => { this.selectedDiv = div }} >
                    {/* <div className="edit-pop-over-card"> */}
                    <Card card={card} isEditMode={true} board={board} />
                    {/* </div> */}
                    <div className="edit-pop-over-btns">
                        <button className="open-card-btn clean-btn" onMouseDown={() => console.log('open card')}>Open card</button>
                        <button className="edit-labels-btn clean-btn">Edit labels</button>
                        <button className="change-members-btn clean-btn">Change members</button>
                        <button className="change-cover-btn clean-btn">Change cover</button>
                        <button className="move-btn clean-btn">Move</button>
                        <button className="copy-btn clean-btn">Copy</button>
                        <button className="edit-dates-btn clean-btn">Edit dates</button>
                        <button className="archive-btn clean-btn">Archive</button>
                    </div>
                </div>
            </ScreenOverlay>
        </>

    }
}


const mapDispatchToProps = {
    closePopover
}

function mapStateToProps(state) {
    return {
        elPos: state.appModule.currPopover.elPos,
        board: state.boardModule.board
    }
}
export const PopoverEditCard = connect(mapStateToProps, mapDispatchToProps)(_PopoverEditCard)