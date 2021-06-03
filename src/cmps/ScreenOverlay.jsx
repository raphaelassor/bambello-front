//TODO: // import CloseIcon from '@material-ui/icons/Close';


export function ScreenOverlay({ goBack, styleMode, children, closeBtn }) {

    //TODO: if closeBtn true then show close btn in the top right side of the screen
    return (
        <div className="screen-overlay-wrapper">
            <div className={`screen-overlay ${styleMode}`} onClick={() => goBack()}></div>
            {children}
        </div>
    )
}