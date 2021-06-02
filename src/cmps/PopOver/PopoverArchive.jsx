import {Popover} from './Popover'
import {connect} from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import {onSaveBoard} from '../../store/actions/board.actions'
import {openPopover} from '../../store/actions/app.actions'
import { Component } from "react";

class _PopoverArchive extends Component { 
    state={
        archivedCards:[],
        filterTxt:'',
    }
    componentDidMount(){
        const {board}= this.props
        const archivedCards= board.lists.reduce((acc,list)=>{
            list.cards.forEach(card=>{
                if(card.isArchived) acc.push(card)
            })
            return acc
        })
        this.setState({archivedCards})
    }

    handleChange=({target})=>{
        this.setState({filterTxt:target.value})
    }

    get filteredCards(){
        const {archivedCards,filterTxt} = this.state
        const regEx= new RegExp(filterTxt, 'i')
        return archivedCards.filter(card=> regEx.test(card.title) )
    }
    onOpenPopover = (ev, PopoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
        this.props.openPopover(PopoverName, elPos, props)
    }

    render(){
        const {filterTxt}=this.state
        return <Popover className="menu" title="Archive">
            <div className="pop-over-archive-details">
            <span className= "back" onClick={ev=>this.onOpenPopover(ev,'MENU')}>
            <ArrowBackIcon/>
            </span>
            <input type="text" className="pop-over-input" value={filterTxt} onChange={this.handleChange} autoFocus/>
            {/* map of Card Previews  */}
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


export const PopoverArchive = connect(mapStateToProps, mapDispatchToProps)(_PopoverArchive)