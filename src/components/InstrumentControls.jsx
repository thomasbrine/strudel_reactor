import { InstrumentMixer } from "./InstrumentMixer";
import { MdAddCircleOutline, MdHelp, MdQueueMusic } from "react-icons/md";
import { useState } from 'react';

export function InstrumentControls({instrumentValues, addInstrument, removeInstrument, addInstrumentEffect, updateInstrumentEffectValue, changeInstrumentName, changeEffectName, toggleInstrument, removeInstrumentEffect}) {

    const [showHelp, setShowHelp] = useState(false);

    function handleAddInstrument() {
        addInstrument();
    }

    function handleShowHelp() {
        setShowHelp(!showHelp);
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0 d-flex align-items-center"><MdQueueMusic className="me-2"/>Instrument Channels</h5>
                <button className="btn btn-sm d-flex align-items-center" onClick={handleShowHelp}><MdHelp size="20"/></button>
            </div>

            <div className="card-body">

                {/* Show help content if the user has clicked the help button */}
                {showHelp && (
                    <div className="alert alert-light alert-dismissible rounded-0 shadow-sm">
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={handleShowHelp} 
                        />
                        <h6 className="alert-heading fw-semibold">Instruments Help</h6>
                        <ul className="mb-0 small">
                            <li>Instrument names must match those in your code, e.g. <code>drums</code>.</li>
                            <li>Effect names must match effects available in the Strudel syntax, e.g. <code>gain</code>.</li>
                                You can see which effects are available <a href="https://strudel.cc/learn/effects/">here</a>.
                            <li>Add placeholders for effects at the end of each instrument in the pre-processor code, using syntax: <code>{'{instrumentname_effects}'}</code>.</li>
                        </ul>
                    </div>
                )}

                <div className="d-flex flex-column gap-2 mb-3">
                    {/* Create mixer for every instrument stored */}
                    {instrumentValues.map((instrument) => ( 
                        <InstrumentMixer
                        key={instrument.id}
                        instrument={instrument}
                        removeInstrument={removeInstrument}
                        addInstrumentEffect={addInstrumentEffect}
                        updateInstrumentEffectValue={updateInstrumentEffectValue}
                        changeInstrumentName={changeInstrumentName}
                        changeEffectName={changeEffectName}
                        toggleInstrument={toggleInstrument}
                        removeInstrumentEffect={removeInstrumentEffect}
                        />
                    ))}
                </div>
                <div>
                    <button 
                        className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                        onClick={handleAddInstrument}>
                        <MdAddCircleOutline className="me-1"/>Instrument Mixer Channel
                    </button>
                </div>
            </div>
        </div>
    );
}