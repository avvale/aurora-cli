// screen-recording.service.ts
import { Injectable, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { log } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, Subject } from 'rxjs';
import { ConfigRecordingSnackbarComponent } from '../config-recording-snackbar/config-recording-snackbar.component';
import { ConfigRecordingService } from '../config-recording-snackbar/config-recording.service';
import {
    ScreenRecordingDisplaySurface,
    ScreenRecordingRecordingState,
    ScreenRecordingResponse,
} from '../screen-recording.types';
import { RecordingSnackbarComponent } from './recording-snackbar.component';

@Injectable({ providedIn: 'root' })
export class RecordingService {
    recordingState = signal<ScreenRecordingRecordingState>('idle');
    recordingPropagate$: Subject<ScreenRecordingResponse> =
        new Subject<ScreenRecordingResponse>();

    private mediaStream?: MediaStream; // final stream
    private displayStream?: MediaStream; // getDisplayMedia stream
    private micStream?: MediaStream; // microphone stream (optional)
    private audioContext?: AudioContext; // for mixing audio (optional)
    private mediaRecorder?: MediaRecorder;
    private chunks: Blob[] = [];
    private stopPromise?: Promise<Blob>;
    private chosenMimeType = 'video/webm';
    private configRecordingSnackbarRef?: MatSnackBarRef<ConfigRecordingSnackbarComponent>;
    private recordingSnackbarRef?: MatSnackBarRef<RecordingSnackbarComponent>;

    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly translocoService: TranslocoService,
        private readonly configRecordingService: ConfigRecordingService,
    ) {}

    openConfigRecordingSnackbar(): Observable<any> {
        this.configRecordingSnackbarRef = this.snackBar.openFromComponent(
            ConfigRecordingSnackbarComponent,
            {
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
                panelClass: [
                    'screen-recording-config-recording-snackbar-wrapper',
                ],
                data: {},
            },
        );

        this.configRecordingSnackbarRef.afterDismissed().subscribe(async () => {
            const screenCaptureConfig = this.configRecordingService.getConfig();

            // check configuration validity with guard clauses
            if (
                !screenCaptureConfig.displaySurface ||
                !screenCaptureConfig.audioDeviceId
            )
                return;
            if (!this.isCompatibilityScreenRecord()) return;

            // try to start screen recording, open system prompt to request permissions and select screen
            if (
                !(await this.startScreenRecording({
                    displaySurface: screenCaptureConfig.displaySurface,
                    audioDeviceId: screenCaptureConfig.audioDeviceId,
                }))
            )
                return;

            // start counter and open snackbar
            this.openRecordingSnackbar();
        });

        return this.recordingPropagate$.asObservable();
    }

    openRecordingSnackbar(): void {
        this.recordingSnackbarRef = this.snackBar.openFromComponent(
            RecordingSnackbarComponent,
            {
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
                panelClass: ['screen-recording-recording-snackbar-wrapper'],
                data: {},
            },
        );
    }

    isCompatibilityScreenRecord(): boolean {
        // prevent starting a new recording if one already exists
        if (this.recordingState() === 'recorded') {
            this.snackBar.open(
                this.translocoService.translate(
                    'screenRecording.ScreenRecordingExists',
                ),
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return false;
        }

        // check for screen recording support
        if (!navigator?.mediaDevices?.getDisplayMedia) {
            this.snackBar.open(
                this.translocoService.translate(
                    'screenRecording.ScreenRecordingNotSupported',
                ),
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return false;
        }

        return true;
    }

    async startScreenRecording({
        appElement = null,
        displaySurface = null,
        audioDeviceId = null,
        includeSystemAudio = true,
        includeMicAudio = true,
    }: {
        appElement?: HTMLElement;
        displaySurface?: ScreenRecordingDisplaySurface;
        audioDeviceId?: string;
        includeSystemAudio?: boolean;
        includeMicAudio?: boolean;
    } = {}): Promise<boolean> {
        try {
            await this.start({
                appElement,
                displaySurface,
                audioDeviceId,
                includeSystemAudio,
                includeMicAudio,
            });

            this.recordingState.set('recording');

            return true;
        } catch (error) {
            log('[DEBUG] Error starting screen recording: ', error);

            this.snackBar.open(
                this.translocoService.translate(
                    'support.StartScreenRecordingError',
                ),
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );

            return false;
        }
    }

    async start({
        appElement = null,
        displaySurface = null,
        audioDeviceId = null,
        includeSystemAudio = true,
        includeMicAudio = true,
        allowSwitching = true,
        allowSelf = false,
        includeMonitors = false,
    }: {
        appElement?: HTMLElement;
        displaySurface?: ScreenRecordingDisplaySurface;
        audioDeviceId?: string;
        includeSystemAudio?: boolean;
        includeMicAudio?: boolean;
        allowSwitching?: boolean;
        allowSelf?: boolean;
        includeMonitors?: boolean;
    } = {}): Promise<void> {
        this.displayStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                // sets the default selection for the type of element to be recorded
                displaySurface,
                frameRate: 30,
                // Chromium hints (ignored if they don't exist):
                // @ts-ignore
                surfaceSwitching: allowSwitching ? 'include' : 'exclude',
                // @ts-ignore
                selfBrowserSurface: allowSelf ? 'include' : 'exclude',
                // @ts-ignore
                monitorTypeSurfaces: includeMonitors ? 'include' : 'exclude',
            },
            audio: includeSystemAudio
                ? ({
                      // These flags only exist in Chromium; they are forced to the standard type.
                      // @ts-ignore
                      systemAudio: 'include',
                      // @ts-ignore
                      suppressLocalAudioPlayback: false,
                  } as MediaTrackConstraints)
                : false, // system/tab audio (depends on browser)
            preferCurrentTab: displaySurface === 'tab',
        });

        // 2) (Optional) Crop to your app's area (Region Capture – Chromium)
        if (appElement) {
            const [track] = this.displayStream.getVideoTracks();
            const hasCropTarget =
                typeof (window as any).CropTarget !== 'undefined';
            const canCrop =
                track && typeof (track as any).cropTo === 'function';

            if (hasCropTarget && canCrop) {
                try {
                    const target = await (window as any).CropTarget.fromElement(
                        appElement,
                    );
                    await (track as any).cropTo(target);
                } catch (err) {
                    log(
                        '[DEBUG] Region Capture cropTo failed; continuing without crop.',
                        err,
                    );
                }
            } else {
                // Not supported in this browser/runtime; continue without cropping
                if (!hasCropTarget || !canCrop) {
                    log(
                        '[DEBUG] Region Capture not supported (no CropTarget or track.cropTo).',
                    );
                }
            }
        }

        // 2.5) (Optional) Capture specific microphone
        const wantsMic = !!includeMicAudio || audioDeviceId; // || (opts as any).micConstraints;
        if (wantsMic) {
            try {
                const audioConstraints: MediaTrackConstraints = {
                    //...((opts as any).micConstraints || {}),
                    ...(audioDeviceId
                        ? { deviceId: { exact: audioDeviceId } as any }
                        : {}),
                };
                const hasExplicitConstraint =
                    Object.keys(audioConstraints).length > 0;
                this.micStream = await navigator.mediaDevices.getUserMedia({
                    audio: hasExplicitConstraint ? audioConstraints : true,
                    video: false,
                });
            } catch (e) {
                log(
                    '[DEBUG] The requested microphone could not be obtained: ',
                    e,
                );
            }
        }

        // 2.6) Build the final stream (video + audio)
        const finalStream = new MediaStream();
        const videoTrack = this.displayStream.getVideoTracks()[0];
        if (videoTrack) finalStream.addTrack(videoTrack);

        const audioTracks: MediaStreamTrack[] = [];
        if (includeSystemAudio) {
            const sys = this.displayStream.getAudioTracks()[0];
            if (sys) audioTracks.push(sys);
        }
        if (this.micStream) {
            const mic = this.micStream.getAudioTracks()[0];
            if (mic) audioTracks.push(mic);
        }

        if (audioTracks.length === 1) {
            finalStream.addTrack(audioTracks[0]);
        } else if (audioTracks.length > 1) {
            // Mixing system + mic into a single track using WebAudio
            try {
                this.audioContext = new (window.AudioContext ||
                    (window as any).webkitAudioContext)();
                const destination =
                    this.audioContext.createMediaStreamDestination();
                for (const t of audioTracks) {
                    const srcStream = new MediaStream([t]);
                    const source =
                        this.audioContext.createMediaStreamSource(srcStream);
                    source.connect(destination);
                }
                const mixedTrack = destination.stream.getAudioTracks()[0];
                if (mixedTrack) finalStream.addTrack(mixedTrack);
            } catch (e) {
                log(
                    '[DEBUG] Error mixing audio. Only the first one will be used: ',
                    e,
                );
                finalStream.addTrack(audioTracks[0]);
            }
        }

        this.mediaStream = finalStream;

        // 3) Prepare the recorder
        this.chunks = [];

        // Choose a supported mimeType to avoid empty results
        const mimeTypes = [
            'video/webm;codecs=vp9',
            'video/webm;codecs=vp8',
            'video/webm',
        ];
        const supported = mimeTypes.find((mimeType) =>
            (window as any).MediaRecorder?.isTypeSupported?.(mimeType),
        );
        this.chosenMimeType = supported ?? 'video/webm';

        this.mediaRecorder = new MediaRecorder(
            this.mediaStream,
            supported ? { mimeType: supported } : undefined,
        );

        // Resolve the blob only when the recorder stops and has emitted the last chunk.
        this.stopPromise = new Promise<Blob>((resolve) => {
            this.mediaRecorder!.ondataavailable = (mediaRecorder) => {
                if (mediaRecorder.data.size > 0)
                    this.chunks.push(mediaRecorder.data);
            };

            this.mediaRecorder!.onstop = () => {
                const blob = new Blob(this.chunks, {
                    type: this.chosenMimeType,
                });
                this.chunks = [];
                this.stopTracks();
                resolve(blob);
            };
        });

        this.mediaRecorder.start(); // empieza a grabar (un solo blob se emite al parar)
    }

    pause(): void {
        if (!this.mediaRecorder) return;

        const { state } = this.mediaRecorder;
        if (state === 'recording') {
            try {
                this.mediaRecorder.pause();
            } catch (error) {
                console.warn('No se pudo pausar la grabación.', error);
            }
        }
    }

    resume(): void {
        if (!this.mediaRecorder) return;

        const { state } = this.mediaRecorder;
        if (state === 'paused') {
            try {
                this.mediaRecorder.resume();
            } catch (error) {
                console.warn('No se pudo reanudar la grabación.', error);
            }
        }
    }

    async stop(): Promise<Blob | undefined> {
        if (!this.mediaRecorder) return;

        const waitForStop = this.stopPromise;
        this.mediaRecorder.stop();

        return await waitForStop;
    }

    getRecorderState(): RecordingState {
        return this.mediaRecorder?.state ?? 'inactive';
    }

    private stopTracks() {
        this.mediaStream?.getTracks().forEach((t) => t.stop());
        this.displayStream?.getTracks().forEach((t) => t.stop());
        this.micStream?.getTracks().forEach((t) => t.stop());
        this.mediaStream = undefined;
        this.displayStream = undefined;
        this.micStream = undefined;

        if (this.audioContext) {
            try {
                this.audioContext.close();
            } catch {}
            this.audioContext = undefined;
        }
    }
}
