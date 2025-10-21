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
            <div className="instrument-header">
                <label onClick={() => setShowSliders(!showSliders)}>
                    {/*<input type="checkbox" onChange={handleP1Toggle} checked={p1Enabled}/>*/}
                    {showSliders ?  <FaChevronDown /> : <FaChevronRight />}
                    Instrument 1 (p1)
                </label>
                <button className="delete-instrument">Delete</button>
            </div>
            
            {/* Only displays sliders if showSliders is true */}
            {showSliders &&
            <div className="instrument-sliders">
                <div className="slider-row">
                    <label>Volume</label>
                    <input type="range" min="0" max="100" value={volume} onChange={((event) => setVolume(event.target.value))}/>
                    <span>{volume}</span>
                </div>
                <div className="slider-row">
                    <label>Reverb</label>
                    <input type="range" min="0" max="100" value={reverb} onChange={(event) => setReverb(event.target.value)} />
                    <span>{reverb}</span>
                </div>
                <div className="slider-row">
                    <label>Distortion</label>
                    <input type="range" min="0" max="100" value={distortion} onChange={(event) => setDistortion(event.target.value)} />
                    <span>{distortion}</span>
                </div>
                <div className="slider-row">
                    <label>LPF</label>
                    <input type="range" min="0" max="100" value={lpf} onChange={(event) => setLpf(event.target.value)} />
                    <span>{lpf}</span>
                </div>
            </div>
            }
        </div>
    );
}