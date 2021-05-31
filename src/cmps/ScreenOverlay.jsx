

export function ScreenOverlay({ goBack, styleMode }) {

    return (
        <div className={`screen-overlay ${styleMode}`} onClick={() => goBack()}>
        </div>
    )
}