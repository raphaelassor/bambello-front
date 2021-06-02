import { Component } from "react";
import {setFilter} from '../../store/actions/board.actions'
import {connect} from 'react-redux'
import {PopoverLabelPreview} from './PopoverLabelPreview'
import {Popover} from './Popover'
class _PopoverBoardFilter extends Component{

    state={
        filterBy:{
            labels:[],
            txt:'',
            members:'',
        }
    }


    handleChange({target}){
        this.setState({filterBy:{...this.filterBy,txt:target.value}})
    }


    render(){
        const {txt}=this.state
        const {board}=this.props
        return <Popover title="Search" className="menu">
            <input type="text " className="pop-over-input" value={txt} onChange={this.handleChange}/>
            {board.labels.map(label=> <PopoverLabelPreview label={label} toggleLabel={this.handleChange}/> )}
        </Popover>
    }
}
function mapStateToProps(state){
    return{
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
   setFilter,
    
}


export const PopoverBoardFilter = connect(mapStateToProps, mapDispatchToProps)(_PopoverBoardFilter)