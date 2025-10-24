import { InstrumentMixer } from "./InstrumentMixer";
import { MdAddCircleOutline } from "react-icons/md";

export function InstrumentControls({instrumentValues, addInstrument, removeInstrument}) {

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
                        key={instrument.name}
                        instrument={instrument}
                        removeInstrument={removeInstrument}/>
                    ))}
                </div>
                <div>
                    <button 
                        className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                        onClick={handleAddInstrument}>
                        <MdAddCircleOutline className="me-1"/>Instrument Mixer Channel
                    </button>
                    {/* <div className="row">
                        <label class="form-label">Instrument Name</label>
                        <input className="form-control col" type="text"/>
                        <button className="btn btn-success btn-sm col">Confirm</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}