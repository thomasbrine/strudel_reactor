import { MdSettingsApplications } from "react-icons/md";

/**
 * Code preprocessor component for editing raw Strudel code
 * This code gets processed before being sent to the REPL
 */
export function CodePreprocessor({strudelCode, setStrudelCode}) {
    return (
        <div>
            <textarea
                className="form-control border-0 rounded"
                rows="25"
                id="proc"
                value={strudelCode}
                onChange={event => setStrudelCode(event.target.value)}
                style={{
                    fontSize: '18px',
                    maxHeight: '600px'
                }}
            />
        </div>
    )
}