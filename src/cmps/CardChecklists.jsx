import React, { Component } from 'react'
import { ChecklistPreview } from '../cmps/ChecklistPreview'
export class CardChecklists extends Component {

    onSaveChecklist = (checklist) => {
        const { onSaveCardChecklists, checklists } = this.props
        const checklistIdx = checklists.indexOf(checklist)
        checklists[checklistIdx] = checklist
        onSaveCardChecklists(checklists)
    }

    render() {
        const { checklists } = this.props
        return (
            <div className="card-checklists" >
                { checklists.map(checklist => {
                    return <ChecklistPreview key={checklist.id} checklist={checklist} onSaveChecklist={this.onSaveChecklist} />
                })}
            </div>
        )
    }
}