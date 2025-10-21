export function AudioControls({handlePlay, handleStop}) {
    return (
        <div className="card">
            <div className="card-body">
                <label className="form-label fw-bold">Master Controls</label><br/>
                <button id="play" className="btn btn-success me-2" onClick={handlePlay}>Play</button>
                <button id="stop" className="btn btn-outline-danger" onClick={handleStop}>Stop</button>
                <br/>
                <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Tempo (BPM):</label>
                    <input type="number" min="60" max="200" defaultValue="120"/>
                </div>
            </div>
        </div>
    );
}