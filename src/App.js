import './cors-redirect';
import './App.css';
import { useInstruments } from './utils/useInstruments';
import { Header } from './components/Header';
import { stranger_tune, mysong } from './utils/tunes';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ControlsSection } from './components/ControlsSection';
import { ContentSection } from './components/ContentSection';

export default function StrudelDemo() {

  // Reference to the Strudel REPL editor instance
  let editorRef = useRef();

  // Strudel code to be preprocessed and played
  const [strudelCode, setStrudelCode] = useState(stranger_tune);
  // Cycles per minute (tempo)
  const [cpm, setCpm] = useState(120);

  // Used to manage instrument state (values, effects, toggles)
  const instruments = useInstruments();

  // Process strudel code based on instrument values
  // useMemo is used to prevent unnecessary recalculations, as without it
  // the code would re-process on every render
  const processedCode = useMemo(() => {
    let code = strudelCode;

    // Set the tempo (cpm)
    code = code.replace(/setcpm\(.*?\)/, `setcpm(${cpm})`)

    // Loop through each instrument saved in the controls
    instruments.instrumentValues.forEach(instrument => {
      // Check if instrument enabled or disabled
      code = code.replaceAll(`${instrument.name}:`, instrument.enabled ? `${instrument.name}:` : `_${instrument.name}:`);

      // Build effects string by looping through all instrument effect names and values
      let effectsString = "";
      instrument.effects.forEach(effect => {
        effectsString += `.${effect.name}(${effect.value})`;
      })

      code = code.replaceAll(`{${instrument.name}_effects}`, effectsString);

    });

    return code;
  }, [strudelCode, cpm, instruments.instrumentValues]);

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
      instrumentValues: instruments.instrumentValues
    };

    const jsonString = JSON.stringify(projectData);

    return jsonString;
  }

  // function saveProjectFile() {
    
  //   const jsonString = getProjectDataString();

  //   // Save json data as a file (as a backup):
  //   // Create blob url from json string
  //   const blob = new Blob([jsonString]);
  //   const blobUrl = URL.createObjectURL(blob);

  //   // Create and trigger click to download the json data
  //   const a = document.createElement('a');
  //   a.href = blobUrl;
  //   a.download = 'projectData.json';
  //   document.body.appendChild(a);
  //   a.click();

  //   // Remove the temp download elements
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(blobUrl);
  // }

  // Save project data to local storage
  function saveProject() {
    const jsonString = getProjectDataString();

    localStorage.setItem('projectData', jsonString);
  }

  // Load project data from local storage
  function loadProject() {
    const storedString = localStorage.getItem('projectData');

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

      <Header saveProject={saveProject} loadProject={loadProject}/>

      <div className="container-fluid py-4">

        <div className="row g-4">
          {/*Left column for content. (text, REPL, d3 graph)*/}
          <ContentSection
            strudelCode={strudelCode}
            setStrudelCode={setStrudelCode}
            processedCode={processedCode}
            editorRef={editorRef}
          />

          {/*Right column for controls. (instrument toggles, effects, etc)*/}
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

