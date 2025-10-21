import './cors-redirect';
import './App.css';
import { AudioControls } from './components/AudioControls';
import { InstrumentControls } from './components/InstrumentControls';
import { StrudelPlayer } from './components/StrudelPlayer';
import { ProjectControls } from './components/ProjectControls';
import { stranger_tune, mysong } from './utils/tunes';
import { useState, useRef, useEffect } from 'react';

export default function StrudelDemo() {

  let editorRef = useRef();

  const [strudelCode, setStrudelCode] = useState(mysong); // Use stranger things song as default
  const [p1Enabled, setP1Enabled] = useState(true);

  let processedCode = strudelCode.replaceAll("<p1_Radio>", p1Enabled ? "" : "_");

  function handlePlay() {
    editorRef.current.evaluate();
  }

  function handleStop() {
    editorRef.current.stop();
  }

  function handleP1Toggle() {
    setP1Enabled(!p1Enabled);
  }

  useEffect(() => { 
    if (editorRef.current && editorRef.current.repl.state.started) {
      editorRef.current.setCode(processedCode);
      editorRef.current.evaluate();
    }
  }, [processedCode]);


  return (
    <div className="app">

      {/*Header*/}
      <header className="bg-white shadow-sm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h2 className="mb-0 fw-bold">Strudel App</h2>
            <ProjectControls />
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        <div className="row g-4">
            {/*Left column for content. (text, REPL, d3 graph)*/}
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-4">

                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Code Preprocessor</h5>
                  </div>

                  <div className="card-body">
                    <textarea className="form-control" rows="15" id="proc" value={strudelCode} onChange={event => setStrudelCode(event.target.value)}/>
                  </div>
                </div>

                <StrudelPlayer strudelCode={processedCode} editorRef={editorRef}/>

                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">D3 Visualizer</h5>
                  </div>
                  <div className="card-body"></div>
                </div>

              </div>
            </div>

            {/*Right column for controls. (instrument toggles, effects, etc)*/}
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-4">
                <AudioControls handlePlay={handlePlay} handleStop={handleStop} />
                <InstrumentControls p1Enabled={p1Enabled} handleP1Toggle={handleP1Toggle} />

                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Effects</h5>
                  </div>
                  <div className="card-body">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label">Example</label>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <canvas id="roll"></canvas>
        </div>
        </div>
  );
}

