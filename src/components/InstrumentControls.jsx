import { InstrumentMixer } from "./InstrumentMixer";

export function InstrumentControls({p1Enabled, handleP1Toggle}) {
 return (
        <div className="card">
            <div className="card-body">
                <label className="form-label fw-bold">Instruments</label> 
                <div className="d-flex flex-column gap-2 mb-3">
                    <InstrumentMixer/>
                    <InstrumentMixer/>
                </div>
                <button className="btn btn-outline-primary">Add New Instrument</button>
            </div>
        </div>
    );
}