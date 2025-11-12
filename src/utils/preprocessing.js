export function preprocess(strudelCode, instruments, cpm) {
    let code = strudelCode;

    // Set the tempo (cpm)
    code = code.replace(/setcpm\(.*?\)/, `setcpm(${cpm})`);

    // Loop through each instrument saved in the controls
    instruments.instrumentValues.forEach((instrument) => {
        // Check if instrument enabled or disabled
        code = code.replaceAll(
            `${instrument.name}:`,
            instrument.enabled ? `${instrument.name}:` : `_${instrument.name}:`
        );

        // Build effects string by looping through all instrument effect names and values
        let effectsString = "";
        instrument.effects.forEach((effect) => {
            effectsString += `.${effect.name}(${effect.value})`;
        });

        // Add .log() if this is the selected logging instrument
        if (instruments.selectedLoggingInstrument === instrument.id) {
            effectsString += `.log()`;
        }

        code = code.replaceAll(`{${instrument.name}_effects}`, effectsString);
    });

    return code;
}
