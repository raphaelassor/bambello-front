
import { Component } from 'react'
import { connect } from 'react-redux'
import { togglePreviewLabels } from '../../store/actions/board.actions'

class _CardPreviewLabel extends Component {


    get label() {
        const { labelId, labels } = this.props
        const label = labels.find(label => {
            return label.id === labelId
        })
        return label
    }

    onTogglePreviewLabels = (ev) => {
        ev.preventDefault();
        this.props.togglePreviewLabels()
    }


    render() {

        const { isPreviewLabelsOpen } = this.props
        const label = this.label
        return (
            <div className={`card-preview-label ${isPreviewLabelsOpen ? 'open' : 'close'}`} style={{ backgroundColor: label.color }} onClick={this.onTogglePreviewLabels}>
                <span className={`label-text`}>{label.title}</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isPreviewLabelsOpen: state.boardModule.isPreviewLabelsOpen,
    }
}

const mapDispatchToProps = {
    togglePreviewLabels
}

export const CardPreviewLabel = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewLabel)