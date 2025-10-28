import { useState } from "react";
import { MdArrowDropDown, MdArrowRight, MdClose, MdAdd } from "react-icons/md";

/**
 * Component for a single instrument mixer channel
 * Displays instrument name, toggle, and effects panel
 */
export function InstrumentMixer({instrument, instruments}) {

    // Track whether the effects panel is expanded
    const [showSliders, setShowSliders] = useState(false);

    // Delete the instrument
    function handleDeleteInstrument(event) {
        // Stop the click from triggering the parent div onClick as well
        event.stopPropagation();
        instruments.removeInstrument(instrument.id);
    }

    // Delete a specific effect from the instrument
    function handleDeleteEffect(event, effectId) {
        // Stop the click from triggering the parent div onClick as well
        event.stopPropagation();
        instruments.removeEffect(instrument.id, effectId);
    }

    return (
        <div className="border rounded" style={{opacity: instrument.enabled ? 1 : 0.5}}>
            {/* Instrument Header. Click to expand/collapse effects panel */}
            <div className="d-flex justify-content-between align-items-center border-bottom p-2"
                onClick={() => setShowSliders(!showSliders)}
                style={{cursor: 'pointer'}}>
                <div className="d-flex align-items-center gap-2 justify-content-center">

                    {/* Enable/disable instrument */}
                    <input 
                        type="checkbox"
                        className="form-check-input m-0"
                        checked={instrument.enabled}
                        onChange={() => instruments.toggleInstrument(instrument.id)}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Expand/collapse arrow icon */}
                    {showSliders ? <MdArrowDropDown size="30"/> : <MdArrowRight size="30"/>}
                    {/* Input and display for instrument name */}
                    <input
                        type="text"
                        className="form-control"
                        value={instrument.name}
                        onChange={(e) => instruments.changeInstrumentName(instrument.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                {/* Delete instrument button */}
                <button
                    className="btn btn-outline-danger btn-sm d-flex align-items-center"
                    onClick={handleDeleteInstrument}>
                    <MdClose/>
                </button>
            </div>

            {/* Effects panel. Only visible when expanded */}
            {showSliders &&
            <div className="p-2">
                {/* Render effect controls for each effect */}
                {instrument.effects.map(effect => (
                <div className="d-flex align-items-center gap-2 mb-2" key={effect.id}>
                    {/* Input and display for effect name */}
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={effect.name}
                        style={{ width: '80px'}}
                        onChange={(e) => instruments.changeEffectName(instrument.id, effect.id, e.target.value)}
                    />

                    {/* Slider for effect value */}
                    <input className="form-range"
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={effect.value}
                        onChange={(e) => instruments.updateEffectValue(instrument.id, effect.id, e.target.value)}
                    />
                    {/* Display effect value */}
                    <span className="badge bg-secondary" style={{minWidth: '40px'}}>{effect.value}</span>
                    {/* Delete effect button */}
                    <button
                        className="btn btn-close btn-sm d-flex align-items-center"
                        onClick={(e) => handleDeleteEffect(e, effect.id)}>
                    </button>
                </div>
                ))}

            {/* Button to add new effect */}
            <button
                className="btn btn-outline-info btn-sm d-flex justify-content-center align-items-center"
                onClick={() => instruments.addEffect(instrument.id)}
            >
                <MdAdd className="me-2"/>Add Effect
            </button>
            </div>
            }
        </div>
    );
}