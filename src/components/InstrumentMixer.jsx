import { useState } from "react";
import { MdArrowDropDown, MdArrowRight, MdClose } from "react-icons/md";

export function InstrumentMixer({instrument, removeInstrument}) {

    const [showSliders, setShowSliders] = useState(false);

    function handleDelete(event) {
        // Stop the click from triggering the parent div onClick aswell
        event.stopPropagation();
        removeInstrument(instrument.name);
    }

    return (
        <div className="border rounded">
            {/* Instrument Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom p-2"
                onClick={() => setShowSliders(!showSliders)}
                style={{cursor: 'pointer'}}>
                <div className="d-flex align-items-center gap-2 justify-content-center">
                    {/*<input type="checkbox" onChange={handleP1Toggle} checked={p1Enabled}/>*/}
                    {showSliders ?  <MdArrowDropDown /> : <MdArrowRight />}
                    <span>{instrument.name}</span>
                </div>
                <button
                    className="btn btn-outline-danger btn-sm d-flex align-items-center"
                    onClick={handleDelete}
                >
                    <MdClose/>
                </button>
            </div>
            
            {/* Only displays sliders if showSliders is true */}
            {showSliders &&
            <div className="p-2">
                {instrument.effects.map(effect => (
                <div className="d-flex align-items-center gap-2 mb-2">
                    <label className="small mb-0" style={{ minWidth: '80px'}}>{effect.name}</label>
                    <input className="form-range" 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={effect.value} 
                        //onChange={}
                    />
                    <span className="badge bg-secondary" style={{minWidth: '40px'}}>{effect.value}</span>
                </div>
                ))}
            </div>
            }
        </div>
    );
}