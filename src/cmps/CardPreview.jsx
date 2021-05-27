import { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class _CardPreview extends Component {

    render() {
        const { card, currList } = this.props;
        const { boardId } = this.props.match.params;
        return (
            <Link to={`/board/${boardId}/${currList.id}/${card.id}`} className="clean-link">
                <div className="card-preview">
                    <div className="card-preview-menu"></div>
                    {card.title}
                    {/* <pre>{JSON.stringify(card, null, 2)}</pre> */}
                </div>
            </Link>
        )
    }
}

export const CardPreview = withRouter(_CardPreview);
