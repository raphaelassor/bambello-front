import { Component } from 'react'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'
import { ReactComponent as StarIcon } from '../assets/img/icons/star.svg'
import AutosizeInput from 'react-input-autosize';
export class BoardHeader extends Component {

    state = {
        title: '',
        isEdit: false,
        inputWidth: 0,

    }

    componentDidMount() {
        this.setState({ title: this.props.board.title })
    }
    handleChange = ({ target }) => {
        const { value } = target
        let { inputWidth } = this.state
        console.dir(this.titleInput)
        this.setState({ title: target.value, inputWidth })
    }
    toggleEdit = () => {
        console.log('is edit toggle')
        const { isEdit } = this.state
        if (!isEdit) this.state.inputWidth = this.h1Title.getBoundingClientRect().width

        this.setState({ isEdit: !isEdit, inputWidth: this.state.inputWidth }, () => {

            if (this.state.isEdit) this.titleInput.select()
        })
    }
    onTitleSave = (ev) => {
        ev.preventDefault()
        const { board, onSaveBoard } = this.props
        board.title = this.state.title
        onSaveBoard(board)
        this.toggleEdit()
    }


    render() {
        const { board } = this.props
        const { isEdit, title, inputWidth } = this.state
        return (
            <div className="board-header">
                <button className="board-btn">
                    <BoardsIcon />
                    <span>Board</span>
                    <ArrowDown />
                </button>
                <div className="board-title" >
                    {isEdit?
                    <form onSubmit={this.onTitleSave}>
                        {/* <input type="text" value={title}  ref={(input) => { this.titleInput = input }} /> */}
                        <AutosizeInput
                            name="form-field-name"
                            value={title}
                            onChange={this.handleChange}
                            ref={(input) => { this.titleInput = input }}
                            onBlur={this.onTitleSave}
                            />
                    </form>
                    :
                    <h1 onClick={this.toggleEdit} ref={(h1) => { this.h1Title = h1 }}>{board.title} </h1>
                }
                </div>
                <button className="board-btn">
                <i class={`far fa-star icon-sm star-icon ${board.isFavorite? 'favorite':''}`}></i>
              
                </button>
            </div>
        )
    }
}
