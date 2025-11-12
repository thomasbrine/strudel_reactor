import { CodePreprocessor } from "./CodePreprocessor";
import { StrudelPlayer } from "./StrudelPlayer";
import { useState } from "react";
import { MdSettingsApplications, MdTerminal, MdAutoGraph } from "react-icons/md";
import { D3Visualiser } from "./D3Visualiser";

/**
 * Left column is for the content section.
 * Includes the code editor, REPL, and D3 visualizer
 */
export function ContentSection({strudelCode, setStrudelCode, processedCode, editorRef, instruments}) {

    // Track the active code view, with the codePreprocessor as the default
    const [activeView, setActiveView] = useState('codePreprocessor');

    return (
        <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
                <div className="card">

                    {/* Buttons to select between preprocessor and strudel repl */}
                    <div className="card-header">
                        <div className="btn-group btn-group-sm">
                            <button
                                className={`btn ${activeView === 'codePreprocessor' ? 'btn-dark' : 'btn-outline-secondary'} d-flex align-items-center`}
                                onClick={() => setActiveView('codePreprocessor')}
                            >
                                <MdSettingsApplications className="me-1"/>Code Preprocessor
                            </button>
                            <button
                                className={`btn ${activeView === 'strudelPlayer' ? 'btn-dark' : 'btn-outline-secondary'} d-flex align-items-center`}
                                onClick={() => setActiveView('strudelPlayer')}
                            >
                                <MdTerminal className="me-1"/>Strudel REPL
                            </button>
                            <button
                                className={`btn ${activeView === 'd3Visualiser' ? 'btn-dark' : 'btn-outline-secondary'} d-flex align-items-center`}
                                onClick={() => setActiveView('d3Visualiser')}
                            >
                                <MdAutoGraph className="me-1"/>D3 Visualiser
                            </button>
                        </div>
                    </div>

                    {/* Code preprocessor used to edit raw strudel code */}
                    <div style={{display: activeView === 'codePreprocessor' ? 'block' : 'none'}}>
                        <CodePreprocessor strudelCode={strudelCode} setStrudelCode={setStrudelCode}/>
                    </div>

                    {/* Strudel REPL */}
                    <div style={{display: activeView === 'strudelPlayer' ? 'block' : 'none'}}>
                        <StrudelPlayer strudelCode={processedCode} editorRef={editorRef}/>
                    </div>

                    {/* D3 Visualiser */}
                    <div style={{display: activeView === 'd3Visualiser' ? 'block' : 'none'}}>
                        <D3Visualiser instruments={instruments}/>
                    </div>
                </div>
            </div>
        </div>
    )
}