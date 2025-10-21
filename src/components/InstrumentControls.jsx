import { InstrumentMixer } from "./InstrumentMixer";
import { MdAddCircleOutline } from "react-icons/md";

export function InstrumentControls({p1Enabled, handleP1Toggle}) {
 return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Instrument Channels</h5>
            </div>
            <div className="card-body">
                <div className="d-flex flex-column gap-2 mb-3">
                    <InstrumentMixer/>
                    <InstrumentMixer/>
                </div>
                <button className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center">
                    <MdAddCircleOutline className="me-1"/>Instrument Mixer Channel
                </button>
            </div>
        </div>
    );
}