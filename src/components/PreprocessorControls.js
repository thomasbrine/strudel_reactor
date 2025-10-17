export function PreprocessorControls({p1Enabled, handleP1Toggle}) {
    return (
        <div className="col-md-4">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleP1Toggle} checked={p1Enabled}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                    <p>p1 Enabled</p>
                </label>
            </div>
        </div>
    );
}