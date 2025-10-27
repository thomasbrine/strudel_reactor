import { MdSave, MdFolderOpen, MdFolder } from "react-icons/md";

export function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center py-3">
                    <h2 className="mb-0 fw-bold">Strudel Mixer</h2>

                    {/* Project controls (json handling) */}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-success d-flex align-items-center">
                            <MdSave className="me-1"/>Save Project
                        </button>
                        <button className="btn btn-outline-primary d-flex align-items-center">
                            <MdFolderOpen className="me-1"/>Load Project
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}