import './cors-redirect';
import './App.css';
import { AudioControls } from './components/AudioControls';
import { PreprocessorControls } from './components/PreprocessorControls';
import { StrudelPlayer } from './components/StrudelPlayer';
import { stranger_tune } from './tunes';
import { useState, useRef, useEffect } from 'react';

export default function StrudelDemo() {

  let editorRef = useRef();

  // Use stranger things song as default
  const [strudelCode, setStrudelCode] = useState(stranger_tune);
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
    <div>
      <h2>Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" value={strudelCode} onChange={event => setStrudelCode(event.target.value)} ></textarea>
            </div>
            <AudioControls handlePlay={handlePlay} handleStop={handleStop} />
            <StrudelPlayer strudelCode={processedCode} editorRef={editorRef}/>
            <PreprocessorControls p1Enabled={p1Enabled} handleP1Toggle={handleP1Toggle} />
          </div>
          </div>
      </main >
    </div >
  );


}

