export function AudioControls({handlePlay, handleStop}) {
    return (
        <div className="panel">
            <label className="group-label">Master Controls</label><br/>
            <button id="play" onClick={handlePlay}>Play</button>
            <button id="stop" onClick={handleStop}>Stop</button>
            <br/>
            <div className="bpm-control">
                <label>Tempo (BPM):</label>
                <input type="number" min="60" max="200" defaultValue="120"/>
            </div>
        </div>
    );
}