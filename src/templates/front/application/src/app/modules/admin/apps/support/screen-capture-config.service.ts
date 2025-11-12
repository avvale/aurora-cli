import { Injectable, signal, WritableSignal } from '@angular/core';
import { SupportIssueDisplaySurface } from './support.types';

@Injectable({ providedIn: 'root' })
export class ScreenCaptureConfigService
{
    displaySurface: WritableSignal<SupportIssueDisplaySurface> = signal(null);
    audioDeviceId: WritableSignal<string> = signal(null);

    setConfig(
        config: {
            displaySurface: SupportIssueDisplaySurface;
            audioDeviceId: string;
        },
    ): void
    {
        this.displaySurface.set(config.displaySurface);
        this.audioDeviceId.set(config.audioDeviceId);
    }

    getConfig(): {
        displaySurface: SupportIssueDisplaySurface;
        audioDeviceId: string;
    }
    {
        return {
            displaySurface: this.displaySurface(),
            audioDeviceId: this.audioDeviceId(),
        };
    }
}
