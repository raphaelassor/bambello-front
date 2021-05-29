import { Component } from 'react'
import { CardPreview } from './CardPreview'
import { CardAdd } from './CardAdd'
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg'
import { Droppable, Draggable } from 'react-beautiful-dnd'
// import menu from '../assets/img/cmps/board-list/menu.svg'

export class CardList extends Component {

    state = {
        isEditTitle: false,
        titleTxt: '',
        isAddCardOpen: false
    }

    toggleEditTitle = () => {
        const { isEditTitle } = this.state
        const { currList } = this.props
        this.setState({ isEditTitle: !isEditTitle, titleTxt: currList.title });
    }

    onSaveTitle = () => {
        this.toggleEditTitle();
        const { titleTxt } = this.state
        const { board, currList, onSaveBoard } = this.props
        const listIdx = board.lists.findIndex(list => list.id === currList.id)
        board.lists[listIdx].title = titleTxt
        onSaveBoard(board)
    }

    toggleCardAdd = () => {
        const { isAddCardOpen } = this.state
        this.setState({ isAddCardOpen: !isAddCardOpen })
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            this.onSaveTitle()
            return
        }
        const { value } = ev.target;
        this.setState({ titleTxt: value });
    }

    render() {
        const { board, currList, onSaveBoard, currListIdx } = this.props
        const { isEditTitle, isAddCardOpen, titleTxt } = this.state
        return (
            <Draggable draggableId={currList.id} index={currListIdx}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="card-list-wrapper">
                        <Droppable droppableId={currList.id}>
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="card-list">
                                        <div className="card-list-header">
                                            {isEditTitle ?
                                                <input type="text" className="card-list-header-input" value={titleTxt} autoFocus onFocus={(ev) => ev.target.select()} onBlur={this.onSaveTitle} onChange={this.handleChange} onKeyDown={this.handleChange} />
                                                :
                                                <h2 onClick={this.toggleEditTitle}>{currList.title}</h2>
                                            }
                                            <div className="card-list-btn-menu">
                                                <i className="fas fa-ellipsis-h"></i>
                                            </div>
                                        </div>
                                        <div className="card-list-cards" >
                                            {currList.cards.map((card, idx) => <CardPreview key={card.id} card={card} cardIdx={idx} currList={currList} board={board} onSaveBoard={onSaveBoard} />)}
                                            {isAddCardOpen &&
                                                <CardAdd board={board} currList={currList} onSaveBoard={onSaveBoard} toggleCardAdd={this.toggleCardAdd} />
                                            }
                                            {provided.placeholder}
                                        </div>
                                        {!isAddCardOpen &&
                                            <div className="card-list-footer" onClick={this.toggleCardAdd}>
                                                <AddIcon /> Add {currList.cards.length > 1 ? 'another' : ''} card
                                </div>
                                        }
                                    </div>
                                </div>)}
                        </Droppable>
                    </div>)}
            </Draggable>
        )
    }
}
