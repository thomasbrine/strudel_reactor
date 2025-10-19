export function PreprocessorControls({p1Enabled, handleP1Toggle}) {
    return (
        <div>
            <label>
                <input type="checkbox" onChange={handleP1Toggle} checked={p1Enabled}/>
                p1 Enabled
            </label>
        </div>
    );
}