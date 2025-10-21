import { InstrumentMixer } from "./InstrumentMixer";

export function InstrumentControls({p1Enabled, handleP1Toggle}) {
 return (
        <div className="panel">
            <label className="group-label">Instruments</label> 
            <div className="instruments-container">
                <InstrumentMixer/>
                <InstrumentMixer/>
            </div>
            <button>Add New Instrument</button>
        </div>
    );
}