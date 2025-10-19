import './cors-redirect';
import './App.css';
import { AudioControls } from './components/AudioControls';
import { PreprocessorControls } from './components/PreprocessorControls';
import { StrudelPlayer } from './components/StrudelPlayer';
import { stranger_tune } from './tunes';
import { useState, useRef, useEffect } from 'react';

export default function StrudelDemo() {

  let editorRef = useRef();

  const [strudelCode, setStrudelCode] = useState(stranger_tune); // Use stranger things song as default
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

      <header>
        <h2>Strudel App</h2>
        <nav>
          <button>New Project</button>
          <button>Save Project</button>
          <button>Load Project</button>
        </nav>
      </header>

      <div className="main">
          {/*Left column for content. (text, REPL, d3 graph)*/}
          <div className="content">
            <div className="panel">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" value={strudelCode} onChange={event => setStrudelCode(event.target.value)} ></textarea>
            </div>

            <div className="panel">
              <label className="form-label">Strudel REPL:</label>
              <StrudelPlayer strudelCode={processedCode} editorRef={editorRef}/>
            </div>

            <div className="panel">
              <label className="form-label">D3 Visualizer</label>
            </div>
          </div>

          {/*Right column for controls. (instrument toggles, effects, etc)*/}
          <div className="controls">
            <div className="control-group">
              <label className="group-label">Master Controls</label> 
              <AudioControls handlePlay={handlePlay} handleStop={handleStop} />
            </div>
            <div className="control-group">
              <label className="group-label">Instruments</label> 
              <PreprocessorControls p1Enabled={p1Enabled} handleP1Toggle={handleP1Toggle} />
            </div>
            <div className="control-group">
              <label className="group-label">Sliders</label>
              <br/>
              <input type="range"></input><br/>
              <input type="range"></input><br/>
              <input type="range"></input><br/>
              
            </div>
            <div className="control-group">
              <label className="group-label">Effects</label><br/>
              <input type="checkbox"></input>Example
            </div>
          </div>

      </div>
    </div>
  );


}

