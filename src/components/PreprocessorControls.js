import {ProcAndPlay} from './helper/StrudelLogic.js'

export function PreprocessorControls() {
    return (
        <div className="col-md-4">
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                    <p>p1: ON</p>
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                    <p>p1: HUSH</p>
                </label>
            </div>
        </div>
    );
}