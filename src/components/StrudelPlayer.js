import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../tunes';
import { setGlobalEditor, Proc, SetupButtons} from './helper/StrudelLogic.js'

export function StrudelPlayer() {

    const hasRun = useRef(false);

    useEffect(() => {

        if (!hasRun.current) {
        hasRun.current = true;
        (async () => {
            await initStrudel();

            let strudelMirror = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: document.getElementById('editor'),
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
            setGlobalEditor(strudelMirror);
            Proc();
        })();
        document.getElementById('proc').value = stranger_tune
        SetupButtons()
        }

    }, []);

    return (
        <div>
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                <div id="editor" />
            </div>
        </div>
    );
}