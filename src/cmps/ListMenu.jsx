import { Component } from "react";
import { PopOver } from "./PopOver";

export class ListMenu extends Component{

    onArchiveList=()=>{
        const {currList,onSaveBoard,board}=this.props
        currList.isArchived=true;
        board.lists.forEach((list,idx)=> {if(list.id===currList.id) board.lists[idx]=currList })
        onSaveBoard(board)
    }

    render(){
        return <PopOver title="List actions" togglePopOver={this.props.toggleMenu}>
            <ul className="list-menu-content clean-list">
                <li onClick={this.onArchiveList}>Archive this list </li>
            </ul>
        </PopOver>
    }
}