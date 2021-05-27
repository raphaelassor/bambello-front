import React from 'react'
import { Card } from './Card'
// import menu from '../assets/img/cmps/board-list/menu.svg'

export function BoardList({ list }) {

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
                    {list.cards.map(card => <Card key={card.id} card={card} />)}
                </div>
            </div>
        </div>
    )
}