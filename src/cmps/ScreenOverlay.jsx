

export function ScreenOverlay({onToggleMobileNav, isMobileNavOpen}) {
    return (
        <div
            className={`screen-overlay ${isMobileNavOpen ? 'show' : ''}`}
            onClick={() => onToggleMobileNav()}
        >
        </div>
    )
}