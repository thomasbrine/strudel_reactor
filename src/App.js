import './cors-redirect';
import './App.css';
import { AudioControls } from './components/AudioControls';
import { InstrumentControls } from './components/InstrumentControls';
import { StrudelPlayer } from './components/StrudelPlayer';
import { CodePreprocessor } from './components/CodePreprocessor';
import { Header } from './components/Header';
import { stranger_tune, mysong } from './utils/tunes';
import { useState, useRef, useEffect } from 'react';

export default function StrudelDemo() {

  let editorRef = useRef();

  const [strudelCode, setStrudelCode] = useState(stranger_tune); // Use stranger things song as default
  const [instrumentValues, setInstrumentValues] = useState([])
  const [cpm, setCpm] = useState(120);

  // Adds a new instrument with default values
  function addInstrument() {
    // Default instrument name based on number of instruments
    const instrumentName = `instrument${instrumentValues.length+1}`

    // Create new instrument with gain as default effect
    const newInstrument = {
      id: crypto.randomUUID(),
      name: instrumentName,
      enabled: true,
      effects: [
        { id: crypto.randomUUID(), name: "gain", value: 1}
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
      name: "effect",
      value: 0
    };

    setInstrumentValues(previousValues => (
      previousValues.map(instrument => {
        if (instrument.id !== id) {
          // Not the instrument, do nothing
          return instrument 
        }
        return {
          // Found the instrument, add new effect
          ...instrument,
          effects: [...instrument.effects, newEffect]
        }
      })
    ))
  }

  // Removes the specified effect from the instrument.
  function removeInstrumentEffect(instrumentId, effectId) {
    setInstrumentValues(previousValues => (
      previousValues.map(instrument => {
        // Not the instrument, do nothing
        if (instrument.id !== instrumentId) {
          return instrument;
        }

        return {
          // Found the instrument, remove the effect
          ...instrument,
          effects: instrument.effects.filter(effect => effect.id !== effectId)
        }
      })
    )
    );
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

  // Process strudel code based on the values in instrumentValues
  function processCode() {

    let code = strudelCode;

    // Set the tempo (cpm)
    code = code.replace(/setcpm\(.*?\)/, `setcpm(${cpm})`)

    // Loop through each instrument saved in the controls
    instrumentValues.forEach(instrument => {
      // Check if instrument enabled or disabled
      code = code.replaceAll(`${instrument.name}:`, instrument.enabled ? `${instrument.name}:` : `_${instrument.name}:`);

      // Build effects string by looping through all intstrument effect names and values
      let effectsString = "";
      instrument.effects.forEach(effect => {
        effectsString += `.${effect.name}(${effect.value})`;
      })  

      code = code.replaceAll(`{${instrument.name}_effects}`, effectsString);

    });

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

      <Header />

      <div className="container-fluid py-4">
        <div className="row g-4">
            {/*Left column for content. (text, REPL, d3 graph)*/}
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-4">
                <CodePreprocessor strudelCode={strudelCode} setStrudelCode={setStrudelCode}/>
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
                <AudioControls handlePlay={handlePlay} handleStop={handleStop} cpm={cpm} setCpm={setCpm}/>
                <InstrumentControls
                  instrumentValues={instrumentValues}
                  addInstrument={addInstrument}
                  removeInstrument={removeInstrument}
                  addInstrumentEffect={addInstrumentEffect}
                  updateInstrumentEffectValue={updateInstrumentEffectValue}
                  changeInstrumentName={changeInstrumentName}
                  changeEffectName={changeEffectName}
                  toggleInstrument={toggleInstrument}
                  removeInstrumentEffect={removeInstrumentEffect}
                />
              </div>
            </div>
            </div>
            <canvas id="roll"></canvas>
        </div>
        </div>
  );
}

