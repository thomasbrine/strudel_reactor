import { MdSettingsApplications } from "react-icons/md";

export function CodePreprocessor({strudelCode, setStrudelCode}) {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0 d-flex align-items-center"><MdSettingsApplications className="me-2"/>Code Preprocessor</h5>
            </div>

            <div className="card-body">
                <textarea className="form-control" rows="15" id="proc" value={strudelCode} onChange={event => setStrudelCode(event.target.value)}/>
            </div>
        </div>
    )
}