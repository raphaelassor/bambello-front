import { Component } from "react"
import { LabelPopOverPreview } from "./LabelPopOverPreview"
import {EditPopOver} from './EditPopOver'

export class LabelsPopOver extends Component{

    state = {
        inputTxt: '',
        presentedLabels: '',
    }
    
    componentDidMount() {
        this.setState({ presentedLabels: this.props.boardLabels }, () => {
        })
        
    }
    
    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ labels: this.props.boardlabels.filter(label => filterRegex.test(label.title)) })
        })
    }
    // NEEDS TO BE IN CARD DETALS
    
    //save to backend and get the new board from the store
    
    
    isLabelInCard = (label) => {
        return this.props.card.labelIds.some(labelId => labelId === label.id)
    }
    render() {
        const { presentedLabels, inputTxt } = this.state
        if (!presentedLabels) return '';
        return <EditPopOver title={"Labels"}>
        <div className="labels-pop-over">
            <input className="pop-over-input" type="text" value={inputTxt} onChange={this.handleChange} placeholder={"Search Labels"} />
            <h4>LABELS</h4>
            <ul className="clean-list">

            {presentedLabels.map(label => <LabelPopOverPreview label={label}
                toggleLabel={this.props.toggleLabel} isInCard={this.isLabelInCard(label)} />)}
                </ul>

                <button className="secondary-btn">Create a new label</button>
        </div>
    </EditPopOver>


}

}
