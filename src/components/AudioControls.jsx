import { MdPlayCircle, MdStopCircle } from "react-icons/md";

export function AudioControls({handlePlay, handleStop}) {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Master Controls</h5>
            </div>
            <div className="card-body">
                <div className="mb-3 d-flex">
                    <button id="play" className="btn btn-success me-2 d-inline-flex align-items-center" onClick={handlePlay}>
                        <MdPlayCircle className="me-2"/>Play
                    </button>
                    <button id="stop" className="btn btn-outline-danger d-inline-flex align-items-center" onClick={handleStop}><MdStopCircle className="me-2"/>Stop</button>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Tempo (BPM):</label>
                    <input className="form-control" type="number" min="60" max="200" defaultValue="120" style={{width: '100px'}}/>
                </div>
            </div>
        </div>
    );
}