import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBar,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Counter, log } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';
import { RecordingService } from './recording.service';

@Component({
    selector: 'screen-recording-recording-snackbar',
    templateUrl: './recording-snackbar.component.html',
    styles: `
        ::ng-deep .screen-recording-recording-snackbar-wrapper > * {
            min-width: 0px !important;
        }
        :host {
            display: flex;
            min-width: none;
        }
    `,
    imports: [
        MatButtonModule,
        MatIcon,
        MatSelectModule,
        MatSnackBarAction,
        MatSnackBarActions,
        MatSnackBarLabel,
    ],
})
export class RecordingSnackbarComponent {
    isPlaybackVisible = signal<boolean>(false);
    recordedVideoUrl = signal<string | null>(null);
    counterValue = Counter.getCounterValue();

    // injections
    snackBarRef = inject(MatSnackBarRef);
    snackBar = inject(MatSnackBar);
    translocoService = inject(TranslocoService);
    recordingService = inject(RecordingService);
    data = inject(MAT_SNACK_BAR_DATA);

    constructor() {
        this.startRecording();
    }

    startRecording(): void {
        Counter.startCounter();
    }

    async stopRecording(): Promise<void> {
        Counter.stopCounter();
        await this.stopScreenRecording();
        this.snackBarRef.dismiss();
    }

    restartRecording(): void {
        Counter.resetCounter();
    }

    pauseRecording(): void {
        if (this.recordingService.recordingState() !== 'recording') return;

        this.recordingService.pause();
        Counter.stopCounter();
        this.recordingService.recordingState.set('paused');
    }

    resumeRecording(): void {
        if (this.recordingService.recordingState() !== 'paused') return;
        this.recordingService.resume();
        this.recordingService.recordingState.set('recording');
        Counter.startCounter();
    }

    discardRecording(): void {
        this.snackBarRef.dismiss();
    }

    async stopScreenRecording(): Promise<void> {
        if (
            !['recording', 'paused'].includes(
                this.recordingService.recordingState(),
            )
        )
            return;

        try {
            const blob = await this.recordingService.stop();

            if (!blob) {
                this.recordingService.recordingState.set('idle');
                return;
            }

            this.revokeObjectUrl(this.recordedVideoUrl());
            const url = URL.createObjectURL(blob);

            this.recordedVideoUrl.set(url);
            this.recordingService.recordingState.set('recorded');

            const fileName = `screen-recording-${Date.now()}.webm`;
            const file = new File([blob], fileName, {
                type: blob.type || 'video/webm',
            });

            // saveAs(blob, fileName);

            this.recordingService.recordingState.set('idle');
            this.recordingService.recordingPropagate$.next({
                state: this.recordingService.recordingState(),
                file,
            });
        } catch (error) {
            log('[DEBUG] Error stopping screen recording', error);
            const message = this.translocoService.translate(
                'support.ScreenRecordingStopError',
            );

            this.snackBar.open(message, undefined, {
                duration: 4000,
                verticalPosition: 'top',
            });
            this.recordingService.recordingState.set('idle');
        }
    }

    private revokeObjectUrl(url: string | null): void {
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    }
}
