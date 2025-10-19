import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';

export function StrudelPlayer({strudelCode, editorRef}) {

    const hasRun = useRef(false);
    const editorDiv = useRef(null);

    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true;
            (async () => {
                await initStrudel();

                let strudelMirror = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: editorDiv.current,
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
            })();
        }
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setCode(strudelCode);
        }
    }, [strudelCode])

    return (
        <div>
            <div ref={editorDiv}/>
        </div>
    );
}