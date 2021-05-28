import { Subject as SubjectIcon, ScheduleOutlined as TimeIcon } from '@material-ui/icons';
// import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class _CardPreview extends Component {


    dueDateFormat = (dueDate) => {
        const currYear = new Date().getFullYear()
        const dueYear = new Date(dueDate).getFullYear()
        if (dueYear !== currYear) {
            return new Date(dueDate).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
        }
        else return new Date(dueDate).toLocaleString('en-GB', { month: 'short', day: 'numeric' })
    }

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
                        {!!card.dueDate &&
                            <div className="card-preview-date">
                                {/* <div className="date-icon"></div> */}
                                <TimeIcon className="date-icon" />
                                <div>
                                    {this.dueDateFormat(card.dueDate)}
                                </div>
                            </div>
                        }
                        {card.description && <SubjectIcon />}
                    </div>
                </div>
            </Link>
        )
    }
}

export const CardPreview = withRouter(_CardPreview);
