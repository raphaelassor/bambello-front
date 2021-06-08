
import { Component } from 'react'
import { connect } from 'react-redux'
import { togglePreviewLabels } from '../../store/actions/board.actions'

class _CardPreviewLabel extends Component {


    get label() {
        const { labelId, labels } = this.props
        const label = labels.find(label => {
            return label.id === labelId
        })
        if (!label) return ''
        //if not found slice the label ID. there is an error becasue there is a splice on board and not on the card Labels as well
        return label
    }

    onTogglePreviewLabels = (ev) => {
        if (this.props.isArchived) return
        ev.preventDefault();
        if (!this.props.isPreview) this.props.togglePreviewLabels()
    }

    //TODO: 
    // get labelState() {
    //     const { isPreviewLabelsOpen } = this.props;
    //     if (isPreviewLabelsOpen === 'open') return 'open'
    //     if (isPreviewLabelsOpen === 'close')
    // }

    render() {
        const { isPreviewLabelsOpen } = this.props
        const label = this.label

        return (
            <div className={`card-preview-label ${isPreviewLabelsOpen ? 'open' : 'close'}`} style={{ backgroundColor: label.color }} onClick={this.onTogglePreviewLabels}>
                <span className={`label-text ${isPreviewLabelsOpen ? 'open' : ''}`}>{label.title}</span>
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