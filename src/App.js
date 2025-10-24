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

  const [strudelCode, setStrudelCode] = useState(stranger_tune); // Use stranger things song as default
  const [instrumentValues, setInstrumentValues] = useState([])

  // Adds a new instrument with default values
  function addInstrument() {
    // Default instrument name based on number of instruments
    const instrumentName = `Instrument${instrumentValues.length+1}`

    // Create new instrument with volume as default effect
    const newInstrument = {
      id: crypto.randomUUID(),
      name: instrumentName,
      enabled: true,
      effects: [
        { id: crypto.randomUUID(), name: "Volume", value: 100}
      ]
    };
    setInstrumentValues(previousValues => [...previousValues, newInstrument])
  }

  // Remove instrument that has the specified id
  function removeInstrument(id) {
    setInstrumentValues(previousValues => 
      previousValues.filter(instrument => instrument.id !== id)
    );
  }

  // Change the name of the instrument with the specified id
  function changeInstrumentName(id, newName) {
    setInstrumentValues(previousValues => 
      previousValues.map(instrument => 
        instrument.id === id ? {...instrument, name: newName} : instrument
      )
    );
  }

  // Change the name of the effect with the specified id
  function changeEffectName(instrumentId, effectId, newName) {
    setInstrumentValues(previousValues => 
      previousValues.map(instrument => {
        if (instrument.id !== instrumentId) return instrument;

        const updatedEffects = instrument.effects.map(effect =>
          effect.id === effectId ? { ...effect, name: newName } : effect
        );
        
        return {...instrument, effects: updatedEffects };
      })
    );
  }

  function toggleInstrument(id) {
    setInstrumentValues(previousValues =>
      previousValues.map(instrument => 
        instrument.id === id ? {...instrument, enabled: !instrument.enabled} : instrument
      )
    )
  }

  // Adds a new effect to the specified instrument
  function addInstrumentEffect(id) {
    const newEffect = {
      id: crypto.randomUUID(),
      name: "Effect",
      value: 0
    };

    setInstrumentValues(previousValues => (
      previousValues.map(instrument => {
        if (instrument.id !== id) {
          return instrument // not the instrument
        }
        return {
          ...instrument,
          effects: [...instrument.effects, newEffect]
        }
      })
    ))
  }

  // Updates the value of the specifed effect on the specified instrument
  function updateInstrumentEffectValue(instrumentId, effectId, newValue) {
    setInstrumentValues(previousValues =>
      previousValues.map(instrument => {
        if (instrument.id !== instrumentId) return instrument;

        // Update the matching effect’s value
        const updatedEffects = instrument.effects.map(effect =>
          effect.id === effectId ? { ...effect, value: newValue } : effect
        );

        return { ...instrument, effects: updatedEffects };
      })
    );
  }

  function processCode() {

    let code = strudelCode;

    instrumentValues.forEach(instrument => {
      code = code.replaceAll(instrument.name, instrument.enabled ? (instrument.name) : ("_" + instrument.name));
    })  

    return code;   
  }

  let processedCode = processCode();

  function handlePlay() {
    editorRef.current.evaluate();
  }

  function handleStop() {
    editorRef.current.stop();
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
                <InstrumentControls
                  instrumentValues={instrumentValues}
                  addInstrument={addInstrument}
                  removeInstrument={removeInstrument}
                  addInstrumentEffect={addInstrumentEffect}
                  updateInstrumentEffectValue={updateInstrumentEffectValue}
                  changeInstrumentName={changeInstrumentName}
                  changeEffectName={changeEffectName}
                  toggleInstrument={toggleInstrument}
                />
              </div>
            </div>
            </div>
            <canvas id="roll"></canvas>
        </div>
        </div>
  );
}

