import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export function InstrumentMixer() {

    const [showSliders, setShowSliders] = useState(false);
    const [volume, setVolume] = useState(100);
    const [reverb, setReverb] = useState(0);
    const [distortion, setDistortion] = useState(0);
    const [lpf, setLpf] = useState(0);

    return (
        <div className="instrument-mixer">
            {/* Instrument Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom">
                <label onClick={() => setShowSliders(!showSliders)}>
                    {/*<input type="checkbox" onChange={handleP1Toggle} checked={p1Enabled}/>*/}
                    {showSliders ?  <FaChevronDown /> : <FaChevronRight />}
                    Instrument 1 (p1)
                </label>
                <button className="btn btn-outline-danger btn-sm">Delete</button>
            </div>
            
            {/* Only displays sliders if showSliders is true */}
            {showSliders &&
            <div>
                <div className="d-flex align-items-center gap-3 mb-2 mt-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>Volume</label>
                    <input className="form-range" type="range" min="0" max="100" value={volume} onChange={((event) => setVolume(event.target.value))}/>
                    <span>{volume}</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>Reverb</label>
                    <input className="form-range" type="range" min="0" max="100" value={reverb} onChange={(event) => setReverb(event.target.value)} />
                    <span>{reverb}</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>Distortion</label>
                    <input className="form-range" type="range" min="0" max="100" value={distortion} onChange={(event) => setDistortion(event.target.value)} />
                    <span>{distortion}</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>LPF</label>
                    <input className="form-range" type="range" min="0" max="100" value={lpf} onChange={(event) => setLpf(event.target.value)} />
                    <span>{lpf}</span>
                </div>
            </div>
            }
        </div>
    );
}