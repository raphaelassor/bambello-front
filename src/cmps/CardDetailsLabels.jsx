

export function CardDetailsLabels({ labels }) {
    return (
        <div className="labels-card-details flex column align-flex-end">
            <h3 className="card-details-item-header">Labels</h3>
            <div className="labels-container flex wrap">
                {labels.map(label => {
                    return <span key={label.id} style={{ backgroundColor: label.color }} className="label">{label.title}</span>
                })}
            </div>
        </div>
    )
}