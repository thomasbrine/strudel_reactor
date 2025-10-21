import { MdSave, MdFolderOpen, MdFolder } from "react-icons/md";

export function ProjectControls() {
    return (
        <div className="d-flex gap-2">
            <button className="btn btn-outline-success d-flex align-items-center">
                <MdSave className="me-1"/>Save Project
            </button>
            <button className="btn btn-outline-primary d-flex align-items-center">
                <MdFolderOpen className="me-1"/>Load Project
            </button>
        </div>
    );
}