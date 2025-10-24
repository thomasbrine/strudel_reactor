import { InstrumentMixer } from "./InstrumentMixer";
import { MdAddCircleOutline } from "react-icons/md";

export function InstrumentControls({instrumentValues, addInstrument, removeInstrument, addInstrumentEffect, updateInstrumentEffectValue, changeInstrumentName, changeEffectName}) {

    function handleAddInstrument() {
        addInstrument();
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Instrument Channels</h5>
            </div>
            <div className="card-body">
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