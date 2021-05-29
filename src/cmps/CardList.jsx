import { Component } from 'react'
import { CardPreview } from './CardPreview'
import { CardAdd } from './CardAdd'
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg'
<<<<<<< HEAD
import { ListMenu } from './ListMenu'
=======
import { Droppable, Draggable } from 'react-beautiful-dnd'
>>>>>>> 07c02ead387cf5eb871c8c0886650805e528c737
// import menu from '../assets/img/cmps/board-list/menu.svg'

export class CardList extends Component {

    state = {
        isEditTitle: false,
        titleTxt: '',
        isAddCardOpen: false,
        isMenuOpen:false
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

    toggleMenu=()=>{
        this.setState({isMenuOpen:!this.state.isMenuOpen})
    }

    render() {
<<<<<<< HEAD
        const { board, currList, onSaveBoard } = this.props
        const { isEditTitle, isAddCardOpen, titleTxt ,isMenuOpen} = this.state
        return (
            <div className="card-list-wrapper">
                <div className="card-list">
                    <div className="card-list-header">
                        {isEditTitle ?
                            <input type="text" className="card-list-header-input" value={titleTxt} autoFocus onFocus={(ev) => ev.target.select()} onBlur={this.onSaveTitle} onChange={this.handleChange} onKeyDown={this.handleChange} />
                            :
                            <h2 onClick={this.toggleEditTitle}>{currList.title}</h2>
                        }
                        <div className="card-list-btn-menu" onClick={this.toggleMenu}>
                            <i className="fas fa-ellipsis-h"></i>
                            {isMenuOpen&&<ListMenu onSaveBoard={onSaveBoard} board={board} currList={currList} toggleMenu={this.toggleMenu}/>}
                        </div>
                    </div>
                    <div className="card-list-cards">
                        {currList.cards.map(card => <CardPreview key={card.id} card={card} currList={currList} board={board} onSaveBoard={onSaveBoard} />)}
                        {isAddCardOpen &&
                            <CardAdd board={board} currList={currList} onSaveBoard={onSaveBoard} toggleCardAdd={this.toggleCardAdd} />
                        }
                    </div>

                    {!isAddCardOpen &&
                        <div className="card-list-footer" onClick={this.toggleCardAdd}>
                            <AddIcon /> Add {currList.cards.length > 1 ? 'another' : ''} card
                        </div>
                    }
                </div>
            </div>
=======
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
>>>>>>> 07c02ead387cf5eb871c8c0886650805e528c737
        )
    }
}
