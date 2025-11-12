import "./cors-redirect";
import "./App.css";
import { useInstruments } from "./utils/useInstruments";
import { Header } from "./components/Header";
import { defaultState } from "./utils/defaults";
import { useState, useRef, useEffect, useMemo } from "react";
import { ControlsSection } from "./components/ControlsSection";
import { ContentSection } from "./components/ContentSection";
import { preprocess } from "./utils/preprocessing";

export default function StrudelDemo() {
    // Reference to the Strudel REPL editor instance
    let editorRef = useRef();

    // Strudel code to be preprocessed and played
    const [strudelCode, setStrudelCode] = useState("");

    // Cycles per minute (tempo)
    const [cpm, setCpm] = useState(120);

    // Used to manage instrument state (values, effects, toggles)
    const instruments = useInstruments();

    // Load default state on first load
    useEffect(() => {
        setStrudelCode(defaultState.strudelCode);
        setCpm(defaultState.cpm);
        instruments.setInstrumentValues(defaultState.instrumentValues);
    }, []);

    // useMemo is used to prevent unnecessary recalculations, as without it
    // the code would re-process on every render
    const processedCode = useMemo(() => {
        return preprocess(strudelCode, instruments, cpm);
    }, [strudelCode, cpm, instruments.instrumentValues, instruments.selectedLoggingInstrument]);

    // Start playback
    function handlePlay() {
        editorRef.current.evaluate();
    }

    // Stop playback
    function handleStop() {
        editorRef.current.stop();
    }

    // Save project data (strudel code, cpm value, instrument values)
    // in JSON format and convert to string
    function getProjectDataString() {
        const projectData = {
            strudelCode: strudelCode,
            cpm: cpm,
            instrumentValues: instruments.instrumentValues,
        };

        const jsonString = JSON.stringify(projectData);

        return jsonString;
    }

    // Save project data to local storage
    function saveProject() {
        const jsonString = getProjectDataString();

        localStorage.setItem("projectData", jsonString);
    }

    // Load project data from local storage
    function loadProject() {
        const storedString = localStorage.getItem("projectData");

        if (storedString) {
            const projectData = JSON.parse(storedString);

            setStrudelCode(projectData.strudelCode);
            setCpm(projectData.cpm);
            instruments.setInstrumentValues(projectData.instrumentValues);
        }
    }

    // Automatically re-run when processed code changes and the strudel repl is playing
    useEffect(() => {
        if (editorRef.current && editorRef.current.repl.state.started) {
            editorRef.current.setCode(processedCode);
            editorRef.current.evaluate();
        }
    }, [processedCode]);

    return (
        <div className="app">
            <Header saveProject={saveProject} loadProject={loadProject} />

            <div className="container-fluid py-4">
                <div className="row g-4">
                    {/*Left column for content. (text, REPL, d3 graph)*/}
                    <ContentSection
                        strudelCode={strudelCode}
                        setStrudelCode={setStrudelCode}
                        processedCode={processedCode}
                        editorRef={editorRef}
                        instruments={instruments}
                    />

                    {/*Right column for controls. (Play, stop, cpm, instruments)*/}
                    <ControlsSection
                        handlePlay={handlePlay}
                        handleStop={handleStop}
                        cpm={cpm}
                        setCpm={setCpm}
                        instruments={instruments}
                    />
                </div>

                <canvas id="roll"></canvas>
            </div>
        </div>
    );
}
