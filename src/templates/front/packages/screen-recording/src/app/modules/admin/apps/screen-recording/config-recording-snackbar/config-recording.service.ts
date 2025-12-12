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

    async listAudioInputDevices(): Promise<MediaDeviceInfo[]> {
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.warn(
                'navigator.mediaDevices.enumerateDevices not supported. Ensure you are using HTTPS',
            );
            return [];
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter((d) => d.kind === 'audioinput');
    }

    async requestAudioPermissions(): Promise<boolean> {
        if (!navigator.mediaDevices?.getUserMedia) {
            return false;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            // Stop tracks immediately, we just wanted the permission
            stream.getTracks().forEach((track) => track.stop());
            return true;
        } catch (error) {
            console.warn(
                'Permissions denied or error requesting audio:',
                error,
            );
            return false;
        }
    }
}
