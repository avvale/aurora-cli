// screen-capture.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScreenCaptureService
{
    private mediaStream?: MediaStream; // stream final
    private displayStream?: MediaStream; // stream de getDisplayMedia
    private micStream?: MediaStream; // stream de micrófono (opcional)
    private audioContext?: AudioContext; // para mezclar audio (opcional)
    private recorder?: MediaRecorder;
    private chunks: Blob[] = [];
    private stopPromise?: Promise<Blob>;
    private chosenMimeType = 'video/webm';

    async startCapture(
        appElement?: HTMLElement,
        audio: boolean | {
            includeSystemAudio?: boolean;
            micDeviceId?: string;
            micConstraints?: MediaTrackConstraints;
            surface?: 'tab' | 'window' | 'screen' | 'any';
            allowSurfaceSwitching?: boolean;
            allowSelfCapture?: boolean;
            showMonitors?: boolean;
        } = false
    ): Promise<void>
    {
        const opts = typeof audio === 'boolean' ? { includeSystemAudio: audio } : (audio ?? {});
        // 1) Pedir permiso de captura (el usuario elige la fuente)
        // Sugerencias al selector (Chromium). Otros navegadores las ignorarán.
        const isTabPreferred = (opts as any).surface === 'tab';
        const includeMonitors = (opts as any).showMonitors ?? ((opts as any).surface === 'screen' ? true : !isTabPreferred);
        const allowSwitching = (opts as any).allowSurfaceSwitching !== false;
        const allowSelf = (opts as any).allowSelfCapture === true;

        this.displayStream = await navigator
            .mediaDevices
            .getDisplayMedia({
                video: {
                    // @ts-ignore
                    preferCurrentTab: isTabPreferred || undefined,
                    frameRate: 30,
                    backgroundBlur: true, // solo en algunos navegadores (Chrome 109+)
                    // Hints de Chromium (se ignoran si no existen):
                    // @ts-ignore
                    surfaceSwitching: allowSwitching ? 'include' : 'exclude',
                    // @ts-ignore
                    selfBrowserSurface: allowSelf ? 'include' : 'exclude',
                    // @ts-ignore
                    monitorTypeSurfaces: includeMonitors ? 'include' : 'exclude',
                },
                audio: !!opts.includeSystemAudio // audio del sistema/pestaña (depende del navegador)
        });

        // 2) (Opcional) Recortar al área de tu app (Region Capture – Chromium)
        if (appElement)
        {
            const [track] = this.displayStream.getVideoTracks();
            const hasCropTarget = typeof (window as any).CropTarget !== 'undefined';
            const canCrop = track && typeof (track as any).cropTo === 'function';

            if (hasCropTarget && canCrop)
            {
                try {
                    const target = await (window as any).CropTarget.fromElement(appElement);
                    await (track as any).cropTo(target);
                }
                catch (err)
                {
                    console.warn('Region Capture cropTo failed; continuing without crop.', err);
                }
            } else {
                // Not supported in this browser/runtime; continue without cropping
                if (!hasCropTarget || !canCrop)
                {
                    console.warn('Region Capture not supported (no CropTarget or track.cropTo).');
                }
            }
        }

        // 2.5) (Opcional) Capturar micrófono específico
        if ((opts as any).micDeviceId || (opts as any).micConstraints)
        {
            try
            {
                const audioConstraints: MediaTrackConstraints = {
                    ...((opts as any).micConstraints || {}),
                    ...((opts as any).micDeviceId ? { deviceId: { exact: (opts as any).micDeviceId } as any } : {}),
                };
                this.micStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints, video: false });
            }
            catch (e)
            {
                console.warn('No se pudo obtener el micrófono solicitado:', e);
            }
        }

        // 2.6) Construir el stream final (video + audio)
        const finalStream = new MediaStream();
        const videoTrack = this.displayStream.getVideoTracks()[0];
        if (videoTrack) finalStream.addTrack(videoTrack);

        const audioTracks: MediaStreamTrack[] = [];
        if ((opts as any).includeSystemAudio)
        {
            const sys = this.displayStream.getAudioTracks()[0];
            if (sys) audioTracks.push(sys);
        }
        if (this.micStream)
        {
            const mic = this.micStream.getAudioTracks()[0];
            if (mic) audioTracks.push(mic);
        }

        if (audioTracks.length === 1)
        {
            finalStream.addTrack(audioTracks[0]);
        }
        else if (audioTracks.length > 1)
        {
            // Mezclar sistema + mic en una sola pista usando WebAudio
            try
            {
                this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const destination = this.audioContext.createMediaStreamDestination();
                for (const t of audioTracks)
                {
                    const srcStream = new MediaStream([t]);
                    const source = this.audioContext.createMediaStreamSource(srcStream);
                    source.connect(destination);
                }
                const mixedTrack = destination.stream.getAudioTracks()[0];
                if (mixedTrack) finalStream.addTrack(mixedTrack);
            }
            catch (e)
            {
                console.warn('Fallo al mezclar audio. Se usará solo el primero.', e);
                finalStream.addTrack(audioTracks[0]);
            }
        }

        this.mediaStream = finalStream;

        // 3) Preparar el recorder
        this.chunks = [];
        // Elegir un mimeType soportado para evitar resultados vacíos
        const candidates = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
        const supported = candidates.find(t => (window as any).MediaRecorder?.isTypeSupported?.(t));
        this.chosenMimeType = supported ?? 'video/webm';

        this.recorder = new MediaRecorder(this.mediaStream, supported ? { mimeType: supported } : undefined);

        // Resolver el blob solo cuando el recorder se detiene y emitió el último chunk
        this.stopPromise = new Promise<Blob>(resolve =>
        {
                this.recorder!.ondataavailable = e => {
                    if (e.data.size > 0) this.chunks.push(e.data);
                };

                this.recorder!.onstop = () => {
                    const blob = new Blob(this.chunks, { type: this.chosenMimeType });
                    this.chunks = [];
                    this.stopTracks();
                    resolve(blob);
                };
        });

        this.recorder.start(); // empieza a grabar (un solo blob se emite al parar)
  }

    async stop(): Promise<Blob | undefined>
    {
        if (!this.recorder) return;

        const waitForStop = this.stopPromise;
        this.recorder.stop();

        return await waitForStop;
    }

    private stopTracks()
    {
        this.mediaStream?.getTracks().forEach(t => t.stop());
        this.displayStream?.getTracks().forEach(t => t.stop());
        this.micStream?.getTracks().forEach(t => t.stop());
        this.mediaStream = undefined;
        this.displayStream = undefined;
        this.micStream = undefined;

        if (this.audioContext)
        {
            try
            {
                this.audioContext.close();
            }
            catch { }
            this.audioContext = undefined;
        }
    }

  /** Lista micrófonos disponibles. Requiere permiso para ver `label`. */
    async listAudioInputDevices(): Promise<MediaDeviceInfo[]>
    {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(d => d.kind === 'audioinput');
    }
}
