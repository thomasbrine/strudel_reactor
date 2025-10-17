import './cors-redirect';
import './App.css';
import { AudioControls } from './components/AudioControls';
import { PreprocessorControls } from './components/PreprocessorControls';
import { StrudelPlayer } from './components/StrudelPlayer';


export default function StrudelDemo() {

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" ></textarea>
            </div>
            <AudioControls />
            <PreprocessorControls />
            <StrudelPlayer />
          </div>
          </div>
      </main >
    </div >
  );


}

