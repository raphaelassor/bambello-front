import { Popover } from "./Popover"
import {connect} from 'react-redux'
import {Component} from 'react'
import {onSaveBoard} from '../../store/actions/board.actions'
import {openPopover} from '../../store/actions/app.actions'
import {ColorPalette} from '../ColorPalette'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
class _PopoverBackground extends Component {

    state = {

    }

    handleChange = ({ target }) => {
        console.log('in hadle change')
        const {onSaveBoard,board}= this.props
        const {name,value} = target
        // if (name==='imgUrl'){
        //     this.props.board.imgUrl=target.value
        // } 
       board.style.bgColor=value;
       console.log(board.style.bgColor)
       onSaveBoard(board)
    }
    onOpenPopover = (ev, PopoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
        this.props.openPopover(PopoverName, elPos, props)
    }

    render() {
        const {board}= this.props
        return <Popover title="Change background" className="menu">
            <span className= "back" onClick={ev=>this.onOpenPopover(ev,'MENU')}>
            <ArrowBackIcon/>
            </span>
            <div className="pop-over-backround-details">
                <div>
                    <h4>Colors</h4>
                    <ColorPalette handleChange={this.handleChange} selectedColor={board.bgColor} />
                </div>
                <div>
                    <h4>Gradients</h4>
                    {/* Gardientscmp - maybe with colors */}
                </div>
                <div>
                    <h4>Images</h4>
                    {/* Imnages Palette */}
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
    openPopover
}


export const PopoverBackground = connect(mapStateToProps, mapDispatchToProps)(_PopoverBackground) 