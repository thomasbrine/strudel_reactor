export function AudioControls() {
    return (
        <div className="col-md-4">
            <nav>
                <button id="process" className="btn btn-outline-primary">Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
                <br />
                <button id="play" className="btn btn-outline-primary">Play</button>
                <button id="stop" className="btn btn-outline-primary">Stop</button>
            </nav>
        </div>
    );
}