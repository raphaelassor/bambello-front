
import { Link } from 'react-router-dom'
export function BoardList({ boards, onToggleFavorite }) {
    return (

        <div className="board-list">
            {boards.map(board => {
                return <Link className="clean-link" to={`/board/${board._id}`}>
                    <div key={board._id} className="board-preview"
                        style={{ backgroundColor: board.style?.bgColor || '#de213d' }}>
                        <div className="board-preview-details">
                            <h3>{board.title.length > 20 ? board.title.substring(0, 20) + '...' : board.title}</h3>
                            <span className={`far fa-star ${board.isFavorite ? 'favorite' : ''}`}
                                onClick={() => onToggleFavorite(board._id)}>
                            </span>
                        </div>
                    </div>
                </Link >
            })}
        </div>

    )
}