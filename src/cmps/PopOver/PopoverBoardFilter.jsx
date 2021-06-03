import { Component } from "react";
import { setFilter } from '../../store/actions/board.actions'
import { connect } from 'react-redux'
import { PopoverLabelPreview } from './PopoverLabelPreview'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { Popover } from './Popover'
class _PopoverBoardFilter extends Component {

    state = {
        filterBy: {
            labels: [],
            txt: '',
            members: '',
        }
    }


    handleChange({ target }) {
        this.setState({ filterBy: { ...this.state.filterBy, txt: target.value } })
    }

    toggleLabel = (label) => {
        const { labels } = this.state.filterBy
        const idx = labels.findIndex(filterLabel => filterLabel.id === label.id)
        if (idx !== -1) labels.splice(idx, 1)
        else labels.push(label)
        this.setState({ filterBy: { ...this.state.filterBy, labels } })
    }

    isSelected = (label) => {
        return this.state.filterBy.labels.some(filterLabel => filterLabel.id === label.id)
    }

    render() {
        const { txt } = this.state
        const { board } = this.props
        return <Popover title="Search" className="menu">
            <div className="board-filter-pop-over">
                <h4>Labels</h4>
                <input type="text " className="pop-over-input" value={txt} onChange={this.handleChange} />
                {board.labels.map(label => <PopoverLabelPreview label={label} toggleLabel={this.toggleLabel} previewMode={true} isSelected={this.isSelected(label)} />)}
            </div>
            <h4>Members</h4>
            {/* {board.members.map(member => <PopoverMemberPreview member={member} toggleMember={this.toggleFilter} previewMode={true} isSelected={this.isSelected(label)} />)} */}
        </Popover>
    }
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    setFilter,

}


export const PopoverBoardFilter = connect(mapStateToProps, mapDispatchToProps)(_PopoverBoardFilter)