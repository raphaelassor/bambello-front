import VideoLabelIcon from '@material-ui/icons/VideoLabel'

export function CardDetailsCover({ bgColor, openPopover, card }) {

    const onOpenPopover = (ev, type) => {
        ev.preventDefault();
        const elPos = ev.target.getBoundingClientRect()
        const props = { card }
        openPopover(type, elPos, props)
    }

    return (
        <div className="card-details-cover" style={{ backgroundColor: bgColor }}>
            <button className="cover-menu-btn" onClick={(ev) => onOpenPopover(ev, 'COVER')}><VideoLabelIcon /> Cover</button>
        </div>
    )
}