import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import console_monkey_patch, { getD3Data } from '../utils/console-monkey-patch';
import { MdTerminal } from "react-icons/md";

/**
 * Strudel REPL player component
 * Initializes and manages the live strudel environment
 */
export function StrudelPlayer({strudelCode, editorRef}) {

    const handleD3Data = (event) => {
        console.log(event.detail);
    };

    // Track if initialization has run (only run once)
    const hasRun = useRef(false);

    // Reference to the editor container div
    const editorDiv = useRef(null);

    // Initialize Strudel REPL (runs once)
    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;

            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2];

            let strudelMirror = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: editorDiv.current,
                drawTime,
                onDraw: (haps, time) => drawPianoroll({haps, time, ctx: drawContext, drawTime, fold: 0}),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                    },
            });
            strudelMirror.setCode(strudelCode);
            editorRef.current = strudelMirror;
        }
    }, []);

    // Update the REPL code when the strudelCode changes
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setCode(strudelCode);
        }
    }, [strudelCode])

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0 d-flex align-items-center"><MdTerminal className="me-2"/>Live Strudel REPL</h5>
            </div>
            <div className="card-body p-0" style={{maxHeight: '400px', overflowY: 'auto'}}>
                <div ref={editorDiv}/>
            </div>
        </div>
    );
}