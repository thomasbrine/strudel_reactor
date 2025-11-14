import { MdPlayCircle, MdStopCircle, MdGraphicEq, MdSpeed } from "react-icons/md";

/**
 * Master audio controls component.
 * Has play/stop buttons and tempo control
 */
export function AudioControls({handlePlay, handleStop, cpm, setCpm}) {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0 d-flex align-items-center"><MdGraphicEq className="me-2"/>Master Controls</h5>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">

                    {/* Play and Stop buttons */}
                    <div className="btn-group">
                        <button
                            id="play"
                            className="btn btn-success d-flex align-items-center mb-0 px-3"
                            onClick={handlePlay}
                        >
                            <MdPlayCircle className="me-2"/>Play
                        </button>
                        <button
                            id="stop"
                            className="btn btn-danger d-flex align-items-center mb-0 px-3"
                            onClick={handleStop}
                        >
                            <MdStopCircle className="me-2"/>Stop
                        </button>
                    </div>

                    {/* Tempo control. Controls cpm (cycles per minute) */}
                    <div className="input-group" style={{ width: "200px" }}>
                        <span className="input-group-text bg-light text-muted">
                            <MdSpeed />
                        </span>
                        <input
                            className="form-control text-center"
                            title="Tempo (CPM)"
                            type="number"
                            min="0"
                            max="500"
                            value={cpm}
                            onChange={(e) => setCpm(e.target.value)}
                        />
                        <span className="input-group-text bg-white text-muted">CPM</span>
                    </div>
                </div>
            </div>

        </div>
    );
}