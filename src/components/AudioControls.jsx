import { MdPlayCircle, MdStopCircle, MdGraphicEq } from "react-icons/md";

export function AudioControls({handlePlay, handleStop, cpm, setCpm}) {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0 d-flex align-items-center"><MdGraphicEq className="me-2"/>Master Controls</h5>
            </div>
            <div className="card-body">
                <div className="mb-3 d-flex">
                    <button id="play" className="btn btn-success me-2 d-inline-flex align-items-center" onClick={handlePlay}>
                        <MdPlayCircle className="me-2"/>Play
                    </button>
                    <button id="stop" className="btn btn-danger d-inline-flex align-items-center" onClick={handleStop}><MdStopCircle className="me-2"/>Stop</button>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Tempo (CPM):</label>
                    <input className="form-control" type="number" min="0" max="500" value={cpm} onChange={(e) => setCpm(e.target.value)} style={{width: '100px'}}/>
                </div>
            </div>
        </div>
    );
}