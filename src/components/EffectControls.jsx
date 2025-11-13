import { useState } from "react";
import { getEffectMax } from "../utils/effectMaxValues";

export function EffectControls({effect, instrumentId, updateEffectValue, removeEffect, changeEffectName}) {

    // Get the max value for this effect
    const effectMax = getEffectMax(effect.name)

    const step = effectMax / 20;

    // Internal value used so the slider value updates when dragging it, but does not
    // send the update to the rest of the system until the user lets go of the mouse
    const [internalValue, setInternalValue] = useState(effect.value);

    // Handle the delete effect button
    function handleDeleteEffect(event) {
        // Stop the click from triggering the parent div onClick as well
        event.stopPropagation();
        removeEffect(instrumentId, effect.id);
    }

    // Handle editing of the effect value
    function handleEditValue(event) {

        const value = event.target.value;
    
        if (value === '') {
            setInternalValue(value);
            return;
        }

        const numValue = parseFloat(value);
        // Only change the value if it is not negative or empty
        if (!isNaN(numValue) && numValue >= 0) {
            setInternalValue(event.target.value);
            updateEffectValue(instrumentId, effect.id, numValue);
        }
    }


    return (
    <div className="d-flex align-items-center gap-2 mb-2">

        {/* Input and display for effect name */}
        <input
            type="text"
            className="form-control form-control-sm"
            value={effect.name}
            style={{ width: '70px'}}
            onChange={(e) => changeEffectName(instrumentId, effect.id, e.target.value)}
        />

        {/* Slider for effect value */}
        <input className="form-range"
            type="range"
            min="0"
            max={effectMax}
            step={step}
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            onMouseUp={(e) => updateEffectValue(instrumentId, effect.id, internalValue)}
        />

        {/* Display an editable effect value */}
        <span className="badge bg-secondary" style={{maxWidth: '55px'}}>
            <input
                type="text"
                value={internalValue}
                style={{
                    width: '100%',
                    textAlign: 'center',
                    border: 'none',
                    background: 'transparent',
                    color: 'white',
                }}
                onChange={handleEditValue}
            />
        </span>

        {/* Button to delete effect */}
        <button
            className="btn btn-close btn-sm d-flex align-items-center"
            onClick={(e) => handleDeleteEffect(e)}>
        </button>

    </div>

    )
}