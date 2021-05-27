import React from 'react'
import { CardPreview } from './CardPreview'
// import menu from '../assets/img/cmps/board-list/menu.svg'

export function CardList({ list }) {

    return (
        <div className="board-list-wrapper">
            <div className="board-list">
                <div className="board-list-header">
                    <h2>{list.title}</h2>
                    <div className="board-list-btn-menu">
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div className="board-list-cards">
                    {list.cards.map(card => <CardPreview key={card.id} card={card} />)}
                </div>
            </div>
        </div>
    )
}