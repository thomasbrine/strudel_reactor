export function InstrumentMixer() {
    return (
        <div className="instrument-mixer">
            <div className="instrument-header">
                <label>
                    {/*<input type="checkbox" onChange={handleP1Toggle} checked={p1Enabled}/>*/}
                    <input type="checkbox"/>
                    Instrument 1 (p1)
                </label>
            </div>
            <div className="instrument-sliders">
                <div className="slider-row">
                    <label>Volume</label>
                    <input type="range" min="0" max="100" defaultValue="100" />
                    <span>100</span>
                </div>
                <div className="slider-row">
                    <label>Reverb</label>
                    <input type="range" min="0" max="100" defaultValue="0" />
                    <span>0</span>
                </div>
                <div className="slider-row">
                    <label>Distortion</label>
                    <input type="range" min="0" max="100" defaultValue="0" />
                    <span>0</span>
                </div>
                <div className="slider-row">
                    <label>LPF</label>
                    <input type="range" min="0" max="100" defaultValue="0" />
                    <span>0</span>
                </div>
            </div>
        </div>
    );
}