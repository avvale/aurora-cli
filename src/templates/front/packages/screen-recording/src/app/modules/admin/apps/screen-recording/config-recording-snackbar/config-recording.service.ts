import { Injectable, signal, WritableSignal } from '@angular/core';
import { ScreenRecordingDisplaySurface } from '../screen-recording.types';

@Injectable({ providedIn: 'root' })
export class ConfigRecordingService {
    displaySurface: WritableSignal<ScreenRecordingDisplaySurface> =
        signal(null);
    audioDeviceId: WritableSignal<string> = signal(null);

    setConfig(config: {
        displaySurface: ScreenRecordingDisplaySurface;
        audioDeviceId: string;
    }): void {
        this.displaySurface.set(config.displaySurface);
        this.audioDeviceId.set(config.audioDeviceId);
    }

    getConfig(): {
        displaySurface: ScreenRecordingDisplaySurface;
        audioDeviceId: string;
    } {
        return {
            displaySurface: this.displaySurface(),
            audioDeviceId: this.audioDeviceId(),
        };
    }

    /** Lista micrófonos disponibles. Requiere permiso para ver `label`. */
    async listAudioInputDevices(): Promise<MediaDeviceInfo[]> {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter((d) => d.kind === 'audioinput');
    }
}
