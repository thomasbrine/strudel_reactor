import { useState } from 'react';

/**
 * Manages instrument state and functions.
 * Included functions handle adding, removing, and modifying instruments and their effects
 */
export function useInstruments() {

    // Array of instrument objects, each containing name, enabled state, and effects
    const [instrumentValues, setInstrumentValues] = useState([])

    // id of the instrument that should have .log() added
    const [selectedLoggingInstrument, setSelectedLoggingInstrument] = useState(null)

    // Add a new instrument with default values
    function addInstrument() {
        // Default instrument name based on number of instruments
        const instrumentName = `instrument${instrumentValues.length+1}`

        // Create new instrument with gain as default effect
        const newInstrument = {
            id: crypto.randomUUID(),
            name: instrumentName,
            enabled: true,
            effects: [
            { id: crypto.randomUUID(), name: "gain", value: 1}
            ]
        };
        setInstrumentValues(previousValues => [...previousValues, newInstrument])
    }

    // Remove instrument that has the specified id
    function removeInstrument(id) {
        setInstrumentValues(previousValues =>
            previousValues.filter(instrument => instrument.id !== id)
        );
    }

    // Change the name of the instrument with the specified id
    function changeInstrumentName(id, newName) {
        setInstrumentValues(previousValues =>
            previousValues.map(instrument =>
            instrument.id === id ? {...instrument, name: newName} : instrument
            )
        );
    }

    // Change the name of the effect with the specified id
    function changeEffectName(instrumentId, effectId, newName) {
        setInstrumentValues(previousValues =>
            previousValues.map(instrument => {
            if (instrument.id !== instrumentId) return instrument;

            // Update the effect name for matching effect
            const updatedEffects = instrument.effects.map(effect =>
                effect.id === effectId ? { ...effect, name: newName } : effect
            );

            return {...instrument, effects: updatedEffects };
            })
        );
    }

    // Toggle instrument enabled/disabled state
    function toggleInstrument(id) {
        setInstrumentValues(previousValues =>
            previousValues.map(instrument =>
            instrument.id === id ? {...instrument, enabled: !instrument.enabled} : instrument
            )
        )
    }

    // Add a new effect to the specified instrument
    function addEffect(id) {
        // Create default effect with name "effect" and value 0
        const newEffect = {
            id: crypto.randomUUID(),
            name: "effect",
            value: 0
        };

        setInstrumentValues(previousValues => (
            previousValues.map(instrument => {
            if (instrument.id !== id) {
                // Not the instrument, do nothing
                return instrument
            }
            return {
                // Found the instrument, add new effect
                ...instrument,
                effects: [...instrument.effects, newEffect]
            }
            })
        ))
    }

    // Remove the specified effect from the instrument
    function removeEffect(instrumentId, effectId) {
        setInstrumentValues(previousValues => (
            previousValues.map(instrument => {
            // Not the instrument, do nothing
            if (instrument.id !== instrumentId) {
                return instrument;
            }

            return {
                // Found the instrument, remove the effect
                ...instrument,
                effects: instrument.effects.filter(effect => effect.id !== effectId)
            }
            })
        ));
    }

    // Update the value of the specified effect on the specified instrument
    function updateEffectValue(instrumentId, effectId, newValue) {
        setInstrumentValues(previousValues =>
            previousValues.map(instrument => {
            if (instrument.id !== instrumentId) return instrument;

            // Update the matching effect's value
            const updatedEffects = instrument.effects.map(effect =>
                effect.id === effectId ? { ...effect, value: newValue } : effect
            );

            return { ...instrument, effects: updatedEffects };
            })
        );
    }

    // Return all state and functions for managing instruments
    return {
        instrumentValues,
        setInstrumentValues,
        selectedLoggingInstrument,
        setSelectedLoggingInstrument,
        addInstrument,
        removeInstrument,
        changeInstrumentName,
        toggleInstrument,
        addEffect,
        removeEffect,
        changeEffectName,
        updateEffectValue
    };

}