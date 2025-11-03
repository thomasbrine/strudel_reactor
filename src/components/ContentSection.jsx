import { CodePreprocessor } from "./CodePreprocessor";
import { StrudelPlayer } from "./StrudelPlayer";
import { useState } from "react";
import { MdSettingsApplications, MdTerminal } from "react-icons/md";
import { D3Visualiser } from "./D3Visualiser";

/**
 * Left column is for the content section.
 * Includes the code editor, REPL, and D3 visualizer
 */
export function ContentSection({strudelCode, setStrudelCode, processedCode, editorRef}) {

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
            </div>

            {/* Placeholder for the D3 visualizer */}
            <D3Visualiser />
            </div>
        </div>
    )
}