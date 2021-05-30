import { Component } from "react"
import { LabelPopOverPreview } from "./LabelPopOverPreview"
import { PopOver } from './PopOver/PopOver'
import { LabelEditPopOver } from "./LabelEditPopOver"

export class LabelsPopOver extends Component {

    state = {
        inputTxt: '',
        presentedLabels: '',
        labelToEdit: null,
        isEditMode: false,
    }

    componentDidMount() {
        this.setState({ presentedLabels: this.props.boardLabels }, () => {
        })

    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ presentedLabels: this.props.boardLabels.filter(label => filterRegex.test(label.title)) })
        })
    }

    // setLabelEdit = (label = null) => {
    //     this.setState({ labelToEdit: label , isEditMode:true })
    // }
    toggleEditMode = (label = null) => {
        this.setState({ isEditMode: !this.state.isEditMode, labelToEdit: label })
    }

    isLabelInCard = (label) => {
        return this.props.card.labelIds.some(labelId => labelId === label.id)
    }
    render() {
        const { presentedLabels, inputTxt, isEditMode, labelToEdit } = this.state
        if (!presentedLabels) return '';
        return (<>
            {isEditMode ?
                <LabelEditPopOver togglePopOver={this.props.togglePopOver} removeLabel={this.props.removeLabel} labelToEdit={labelToEdit} saveLabel={this.props.saveLabel} toggleEditMode={this.toggleEditMode} />
                :
                <PopOver title={"Labels"} togglePopOver={this.props.togglePopOver}>
                    <div className="labels-pop-over">
                        <input className="pop-over-input" type="text" value={inputTxt} onChange={this.handleChange} placeholder={"Search Labels"} />
                        <h4>LABELS</h4>
                        <ul className="clean-list">

                            {presentedLabels.map(label => <LabelPopOverPreview key={label.id} label={label}
                                toggleLabel={this.props.toggleLabel} isInCard={this.isLabelInCard(label)} toggleEditMode={this.toggleEditMode} />)}
                        </ul>
                        <button className="secondary-btn" onClick={this.toggleEditMode}>Create a new label</button>
                    </div>
                </PopOver>
            }
        </>
        )





    }

}
