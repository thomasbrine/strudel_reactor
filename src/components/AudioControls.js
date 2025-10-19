export function AudioControls({handlePlay, handleStop}) {
    return (
        <div>
            <button id="play" onClick={handlePlay}>Play</button>
            <button id="stop" onClick={handleStop}>Stop</button>
        </div>
    );
}