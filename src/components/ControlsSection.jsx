import { AudioControls } from "./AudioControls";
import { InstrumentControls } from "./InstrumentControls";

/**
 * Right column is for the controls section.
 * Includes the master controls and instrument channels
 */
export function ControlsSection( {handlePlay, handleStop, cpm, setCpm, instruments}) {
    return (
    <div className="col-lg-4">
        <div className="d-flex flex-column gap-4">
            {/* Master playback controls and tempo */}
            <AudioControls
                handlePlay={handlePlay}
                handleStop={handleStop}
                cpm={cpm}
                setCpm={setCpm}
            />
            {/* Instrument mixer channels */}
            <InstrumentControls instruments={instruments}/>
        </div>
    </div>
    )
}