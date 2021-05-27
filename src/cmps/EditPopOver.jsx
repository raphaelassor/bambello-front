import CloseIcon from '@material-ui/icons/Close';
export function EditPopOver({ children, title }) {

    return <div className=" pop-over">
        <div className="pop-over-header">
            <span>{title}</span>
            <button className="clean-btn">
                <CloseIcon style={{ width: '16px', height: '16px' }} />
            </button>
        </div>
        <div className="pop-over-content">
        {children}
        </div>
    </div>

}