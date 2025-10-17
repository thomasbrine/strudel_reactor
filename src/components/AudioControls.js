export function AudioControls({handlePlay, handleStop}) {
    return (
        <div className="col-md-4">
            <nav>
                <button id="play" className="btn btn-outline-primary" onClick={handlePlay}>Play</button>
                <button id="stop" className="btn btn-outline-primary" onClick={handleStop}>Stop</button>
            </nav>  
        </div>
    );
}