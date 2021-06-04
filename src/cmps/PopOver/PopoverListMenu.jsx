import { Component } from "react";
import { Popover } from "./Popover";

export class PopoverListMenu extends Component{

    onArchiveList=()=>{
        const {currList,onSaveBoard,board}=this.props
        currList.isArchived=true;
        board.lists.forEach((list,idx)=> {if(list.id===currList.id) board.lists[idx]=currList })
        onSaveBoard(board)
    }

    render(){
        return <Popover title="List actions" togglePopover={this.props.toggleMenu}>
            <ul className="list-menu-content clean-list">
                <li onClick={this.onArchiveList}>Archive this list </li>
            </ul>
        </Popover>
    }
}
