import { useState } from "react";
import { MdArrowDropDown, MdArrowRight, MdClose, MdAdd } from "react-icons/md";
import { EffectControls } from "./EffectControls";

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
                {instrument.effects.map(effect => {
                    return (
                            <EffectControls
                                key={effect.id}
                                effect={effect}
                                instrumentId={instrument.id}
                                updateEffectValue={instruments.updateEffectValue}
                                removeEffect={instruments.removeEffect}
                                changeEffectName={instruments.changeEffectName}
                            />
                    );
                })}

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