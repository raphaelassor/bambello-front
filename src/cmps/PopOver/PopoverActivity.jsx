import { ActivitiesList } from "../ActivitiesList";
import {connect} from 'react-redux';
import { Popover } from "./Popover";
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import {openPopover} from '../../store/actions/app.actions'
import { Component } from "react";


 class  _PopoverActivity extends Component{

     state={
        isCommentsOnly:false
    }

    onOpenPopover=(ev, popoverName)=> {
        const {openPopover}=this.props
        console.log('on open popover', popoverName)
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
     openPopover(popoverName, elPos, props)
    }
    
    toggleFilter=(filter)=>{
        const{isCommentsOnly}=this.state
        if((!isCommentsOnly&&filter==='all')||(isCommentsOnly&&filter==='comments'))return
        console.log('in toggle filter')
        this.setState({isCommentsOnly:!this.state.isCommentsOnly})
    }

    get activities(){
        const{board}=this.props
        const {isCommentsOnly}=this.state
        const activities= !isCommentsOnly? board.activities:board.activities.filter(activity=>activity.actionType==='comment')
        return activities
    }
    
    render(){
        const{isCommentsOnly}=this.state
        const{board}=this.props
        return <Popover className="menu" title="Activity">
<div className="activity-pop-over-details" >
<span className= "back" onClick={ev=>this.onOpenPopover(ev,'MENU')}>
    <ArrowBackIcon/>
</span>
    <div className="filter-container flex">
        <button onClick={()=>this.toggleFilter('all')} className={`clean-btn filter-btn ${!isCommentsOnly&&'selected'}`}>All</button>
        <button onClick={()=>this.toggleFilter('comments')} className={`clean-btn filter-btn ${isCommentsOnly&&'selected'}`}>Comments</button>
    </div>
    <div className="activity-list-pop-over">
     <ActivitiesList activities={this.activities} isGeneral={true}/>
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
    openPopover
}


export const PopoverActivity = connect(mapStateToProps, mapDispatchToProps)(_PopoverActivity)