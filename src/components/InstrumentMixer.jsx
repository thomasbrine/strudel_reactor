import { useState } from "react";
import { MdArrowDropDown, MdArrowRight, MdClose } from "react-icons/md";

export function InstrumentMixer() {

    const [showSliders, setShowSliders] = useState(false);
    const [volume, setVolume] = useState(100);
    const [reverb, setReverb] = useState(0);
    const [distortion, setDistortion] = useState(0);
    const [lpf, setLpf] = useState(0);

    return (
        <div className="border rounded">
            {/* Instrument Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom p-2"
                onClick={() => setShowSliders(!showSliders)}
                style={{cursor: 'pointer'}}>
                <div className="d-flex align-items-center gap-2 justify-content-center">
                    {/*<input type="checkbox" onChange={handleP1Toggle} checked={p1Enabled}/>*/}
                    {showSliders ?  <MdArrowDropDown /> : <MdArrowRight />}
                    <span>Instrument 1 (p1)</span>
                </div>
                <button className="btn btn-outline-danger btn-sm d-flex align-items-center">
                    <MdClose/>
                </button>
            </div>
            
            {/* Only displays sliders if showSliders is true */}
            {showSliders &&
            <div className="p-2">
                <div className="d-flex align-items-center gap-2 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>Volume</label>
                    <input className="form-range" type="range" min="0" max="100" value={volume} onChange={((event) => setVolume(event.target.value))}/>
                    <span className="badge bg-secondary" style={{minWidth: '40px'}}>{volume}</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>Reverb</label>
                    <input className="form-range" type="range" min="0" max="100" value={reverb} onChange={(event) => setReverb(event.target.value)} />
                    <span className="badge bg-secondary" style={{minWidth: '40px'}}>{reverb}</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>Distortion</label>
                    <input className="form-range" type="range" min="0" max="100" value={distortion} onChange={(event) => setDistortion(event.target.value)} />
                    <span className="badge bg-secondary" style={{minWidth: '40px'}}>{distortion}</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>LPF</label>
                    <input className="form-range" type="range" min="0" max="100" value={lpf} onChange={(event) => setLpf(event.target.value)} />
                    <span className="badge bg-secondary" style={{minWidth: '40px'}}>{lpf}</span>
                </div>
            </div>
            }
        </div>
    );
}