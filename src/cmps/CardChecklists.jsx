import React, { Component } from 'react'
import { ChecklistPreview } from '../cmps/ChecklistPreview'
export class CardChecklists extends Component {

    onSaveChecklist = (checklist) => {
        if (!checklist.title) return
        const { onSaveCardChecklists, checklists } = this.props
        const checklistIdx = checklists.indexOf(checklist)
        checklists[checklistIdx] = checklist
        onSaveCardChecklists(checklists)
    }

    onRemoveChecklist = (checklist) => {
        let { onSaveCardChecklists, checklists } = this.props
        checklists = checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        onSaveCardChecklists(checklists)
    }

    render() {
        const { checklists } = this.props
        return (
            <div className="card-checklists" >
                { checklists.map(checklist => {
                    return <ChecklistPreview
                        key={checklist.id}
                        checklist={checklist}
                        onRemoveChecklist={this.onRemoveChecklist}
                        onSaveChecklist={this.onSaveChecklist} />
                })}
            </div>
        )
    }
}