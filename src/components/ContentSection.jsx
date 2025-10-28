import { CodePreprocessor } from "./CodePreprocessor";
import { StrudelPlayer } from "./StrudelPlayer";

/**
 * Left column is for the content section.
 * Includes the code editor, REPL, and D3 visualizer
 */
export function ContentSection({strudelCode, setStrudelCode, processedCode, editorRef}) {
    return (
        <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">

            {/* Code preprocessor used to edit raw strudel code */}
            <CodePreprocessor strudelCode={strudelCode} setStrudelCode={setStrudelCode}/>

            {/* Strudel REPL */}
            <StrudelPlayer strudelCode={processedCode} editorRef={editorRef}/>

            {/* Placeholder for the D3 visualizer */}
            <div className="card">
                <div className="card-header">
                <h5 className="mb-0">D3 Visualizer</h5>
                </div>
                <div className="card-body"></div>
            </div>

            </div>
        </div>
    )
}