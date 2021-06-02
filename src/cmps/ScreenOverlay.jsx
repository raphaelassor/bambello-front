

export function ScreenOverlay({ goBack, styleMode, children }) {

    return (
        <div className="screen-overlay-wrapper">
            <div className={`screen-overlay ${styleMode}`} onClick={() => goBack()}></div>
            {children}
        </div>
    )
}