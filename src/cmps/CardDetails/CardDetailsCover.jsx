import VideoLabelIcon from '@material-ui/icons/VideoLabel'

export function CardDetailsCover({ bgColor }) {
    return (
        <div className="card-details-cover" style={{ backgroundColor: bgColor }}>
            <button className="cover-menu-btn"><VideoLabelIcon /> Cover</button>
        </div>
    )
}