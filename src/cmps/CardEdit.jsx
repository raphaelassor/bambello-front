import { Component } from 'react'
import { connect } from 'react-redux'
import { closePopover, openPopover } from '../store/actions/app.actions'
// import { boardService } from '../services/board.service';
import { Card } from './Card';
import { ScreenOverlay } from './ScreenOverlay'
// import CloseIcon from '@material-ui/icons/Close';

class _CardEdit extends Component {

    state = {
        top: null,
        left: null,
        width: null
    }


    componentDidMount() {
        // window.addEventListener('resize', () => {
        //     if (window.visualViewport.width > 1000) return
        //     this.onSetPopoverPos()
        // });
        // // add remove event 
        this.onSetPopoverPos()
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.elPos !== prevProps.elPos) {
    //         this.onSetPopoverPos()
    //     }
    // }
    saveCard = () => {
        // this.props.onSaveCard()
    }
    onOpenPopover = (ev, PopoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {
            card: this.props.card
        }
        this.props.openPopover(PopoverName, elPos, props)
    }

    onSetPopoverPos = () => {
        const { top, left, width } = this.props.elPos
        this.setState({ top, left, width })
    }

    render() {
        const { closePopover, card, board, onCloseCardEdit } = this.props
        const { top, left, width } = this.state

        return <>
            <ScreenOverlay goBack={onCloseCardEdit} styleMode={'darken'}>

                {/* <button className="clean-btn" onClick={closePopover}>
                <CloseIcon />
            </button> */}

                <div className="edit-pop-over" style={{ top: `${top}px`, left: `${left}px`, width: `${width}px` }} ref={(div) => { this.selectedDiv = div }} >
                    <div className="">
                        <Card card={card} isEditMode={true} board={board} />
                        <button className="edit-pop-over-save primary-btn" onClick={this.saveCard}>Save</button>
                    </div>
                    <div className="edit-pop-over-btns">
                        <button className="open-card-btn clean-btn" onMouseDown={closePopover}>Open card</button>
                        <button className="edit-labels-btn clean-btn" onClick={(ev) => this.onOpenPopover(ev, 'LABELS')}>Edit labels</button>
                        <button className="change-members-btn clean-btn" onClick={(ev) => this.onOpenPopover(ev, 'MEMBERS')}>Change members</button>
                        <button className="change-cover-btn clean-btn" onClick={(ev) => this.onOpenPopover(ev, 'COVER')}>Change cover</button>
                        <button className="move-btn clean-btn" onClick={(ev) => this.onOpenPopover(ev, 'MOVE')}>Move</button>
                        <button className="copy-btn clean-btn" onClick={(ev) => this.onOpenPopover(ev, 'COPY')}>Copy</button>
                        <button className="edit-dates-btn clean-btn" onClick={(ev) => this.onOpenPopover(ev, 'DATE')}>Edit dates</button>
                        <button className="archive-btn clean-btn">Archive</button>
                    </div>
                </div>
            </ScreenOverlay>
        </>

    }
}


const mapDispatchToProps = {
    closePopover,
    openPopover
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}
export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit)