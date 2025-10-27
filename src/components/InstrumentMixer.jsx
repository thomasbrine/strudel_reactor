import { useState } from "react";
import { MdArrowDropDown, MdArrowRight, MdClose, MdAdd } from "react-icons/md";

export function InstrumentMixer({instrument, removeInstrument, addInstrumentEffect, updateInstrumentEffectValue, changeInstrumentName, changeEffectName, toggleInstrument}) {

    const [showSliders, setShowSliders] = useState(false);

    function handleDeleteInstrument(event) {
        // Stop the click from triggering the parent div onClick aswell
        event.stopPropagation();
        removeInstrument(instrument.id);
    }

    function handleAddEffect() {
        addInstrumentEffect(instrument.id);
    }

    function handleEffectChange(id, newValue) {
        updateInstrumentEffectValue(instrument.id, id, newValue);
    }

    function handleToggle() {
        toggleInstrument(instrument.id)
    }

    return (
        <div className="border rounded" style={{opacity: instrument.enabled ? 1 : 0.5}}>
            {/* Instrument Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom p-2"
                onClick={() => setShowSliders(!showSliders)}
                style={{cursor: 'pointer'}}>
                <div className="d-flex align-items-center gap-2 justify-content-center">
                    
                    <input 
                        type="checkbox"
                        className="form-check-input m-0"
                        checked={instrument.enabled}
                        onChange={handleToggle}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {showSliders ? <MdArrowDropDown size="30"/> : <MdArrowRight size="30"/>} 
                    <input
                        type="text"
                        className="form-control"
                        value={instrument.name}
                        onChange={(e) => changeInstrumentName(instrument.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <button
                    className="btn btn-outline-danger btn-sm d-flex align-items-center"
                    onClick={handleDeleteInstrument}>
                    <MdClose/>
                </button>
            </div>
            
            {/* Only displays sliders if showSliders is true */}
            {showSliders &&
            <div className="p-2">
                {instrument.effects.map(effect => (
                <div className="d-flex align-items-center gap-2 mb-2" key={effect.id}>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={effect.name}
                        style={{ width: '80px'}}
                        onChange={(e) => changeEffectName(instrument.id, effect.id, e.target.value)}
                    />

                    <input className="form-range" 
                        type="range" 
                        min="0" 
                        max="1"
                        step="0.05" 
                        value={effect.value} 
                        onChange={(event) => handleEffectChange(effect.id, event.target.value)}
                    />
                    <span className="badge bg-secondary" style={{minWidth: '40px'}}>{effect.value}</span>
                </div>
                ))}

            <button className="btn btn-outline-info btn-sm d-flex justify-content-center align-items-center" onClick={handleAddEffect}>
                <MdAdd className="me-2"/>Add Effect
            </button>
            </div>
            }
        </div>
    );
}