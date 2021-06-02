import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/actions/app.actions';
import { connect } from 'react-redux';
import { onSaveBoard } from '../../store/actions/board.actions';
import React, { Component } from 'react';
import { Popover } from './Popover';
class _PopoverDate extends Component {

    state = {
        date: null
    }

    componentDidMount() {
        const date = this.props.card.dueDate ? new Date(this.props.card.dueDate).toLocaleString() : new Date()
        this.setState({ date })
    }


    handleChange = (ev) => {
        console.log('date is :', ev._d)
        this.setState({ date: ev._d })
    }

    saveDueDate = (date) => {
        console.log(new Date(date).toLocaleString('en-GB', { month: 'short', day: 'numeric' }))
        const { card, onSaveBoard, closePopover, board } = this.props
        card.dueDate = date ? Date.parse(date) : 0;
        console.log(card)
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
        closePopover()
    }

    onRemoveDate = () => {
        this.saveDueDate(null)
    }

    render() {
        const { date } = this.state
        if (!date) return ''//loading
        return <Popover title="Date">
            <div className="date-pop-over-content">

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        autoOk
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={this.handleChange}

                    />
                </MuiPickersUtilsProvider>
                <div className="btn-container flex column">
                    <button className="primary-btn" onClick={() => this.saveDueDate(date)} >Save</button>
                    <button className="secondary-btn" onClick={this.onRemoveDate}>Remove</button>
                </div>
            </div>

        </Popover>
    }
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    closePopover
}


export const PopoverDate = connect(mapStateToProps, mapDispatchToProps)(_PopoverDate)
