import { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { CardPreviewDate } from './CardPreviewDate'
import { CardPreviewChecklist } from './CardPreviewChecklist'
import { Subject as SubjectIcon } from '@material-ui/icons';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';

class _CardPreview extends Component {

    render() {
        const { card, currList } = this.props;
        const { boardId } = this.props.match.params;

        return (
            <Link to={`/board/${boardId}/${currList.id}/${card.id}`} className="clean-link">
                <div className="card-preview">
                    <div className="card-preview-menu"></div>
                    <div className="card-preview-name">{card.title}</div>
                    <div className="card-preview-icons">
                        {/* {isUserWatched && <RemoveRedEyeOutlinedIcon/>} */} {/*TODO: try to change cmp name to WatchIcon, implement user watched*/}
                        {!!card.dueDate && <CardPreviewDate dueDate={card.dueDate} />}
                        {card.description && <div><SubjectIcon /></div>}
                        {card.checklists.length && <CardPreviewChecklist checklists={card.checklists}/>}
                    </div>
                </div>
            </Link>
        )
    }
}

export const CardPreview = withRouter(_CardPreview);
