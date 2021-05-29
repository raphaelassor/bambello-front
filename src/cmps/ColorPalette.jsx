import CheckIcon from '@material-ui/icons/Check';

export function ColorPallette({ handleChange,selectedColor }) {

    const colorCodes= [ '#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0','#51e898']

    return <div className="color-palette flex wrap">
        {colorCodes.map(colorCode => {
            return <label className="flex align-center justify-center" style={{ backgroundColor: colorCode }} name="label-color" htmlFor={`color-${colorCode}`}>
                <input type="radio" name="color" id={`color-${colorCode}`} value={colorCode} onClick={handleChange} />
                {selectedColor === colorCode && <CheckIcon key={colorCode} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}
    </div>
}