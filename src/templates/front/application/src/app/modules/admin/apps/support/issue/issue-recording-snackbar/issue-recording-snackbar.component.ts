import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { ScreenCaptureService } from '@apps/support';
import { Counter, log } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';
import { saveAs } from 'file-saver';

@Component({
    selector: 'support-issue-recording-snackbar',
    templateUrl: './issue-recording-snackbar.component.html',
    styles: `
        ::ng-deep .support-issue-recording-snackbar-wrapper > * {
            min-width: 0px !important;
        }
        :host {
            display: flex;
            min-width: none;
        }
    `,
    imports: [
        MatButtonModule, MatIcon, MatSelectModule, MatSnackBarAction,
        MatSnackBarActions, MatSnackBarLabel,
    ],
})
export class IssueRecordingSnackbarComponent
{
    isPlaybackVisible = signal<boolean>(false);
    recordedVideoUrl = signal<string | null>(null);
    counterValue = Counter.getCounterValue();

    // injections
    snackBarRef = inject(MatSnackBarRef);
    snackBar = inject(MatSnackBar);
    translocoService = inject(TranslocoService);
    screenCaptureService = inject(ScreenCaptureService);
    data = inject(MAT_SNACK_BAR_DATA);

    constructor()
    {
        this.startRecording();
    }

    startRecording(): void
    {
       //  await this.startScreenRecording();
        Counter.startCounter();
    }

    async stopRecording(): Promise<void>
    {
        Counter.stopCounter();
        await this.stopScreenRecording();
        this.snackBarRef.dismiss();
    }









    

    restartRecording(): void
    {
        Counter.resetCounter();
    }

    

    

    pauseRecording(): void
    {
        if (this.screenCaptureService.recordingState() !== 'recording') return;

        this.screenCaptureService.pause();
        Counter.stopCounter();
        this.screenCaptureService.recordingState.set('paused');
    }

    resumeRecording(): void
    {
        if (this.screenCaptureService.recordingState() !== 'paused') return;

        this.screenCaptureService.resume();
        this.screenCaptureService.recordingState.set('recording');
        Counter.startCounter();
    }

    discardRecording(): void
    {
        this.snackBarRef.dismiss();
    }

    async startScreenRecording(): Promise<void>
    {
        // prevent starting a new recording if one already exists
        if (this.screenCaptureService.recordingState() === 'recorded')
        {
            const message = this.translocoService.translate('support.ScreenRecordingExists');

            this.snackBar.open(
                message,
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return;
        }

        // check for screen recording support
        if (!navigator?.mediaDevices?.getDisplayMedia)
        {
            const message = this.translocoService.translate('support.ScreenRecordingNotSupported');

            this.snackBar.open(
                message,
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return;
        }
    }

    async stopScreenRecording(): Promise<void>
    {
        if (!['recording', 'paused'].includes(this.screenCaptureService.recordingState())) return;

        try
        {
            const blob = await this.screenCaptureService.stop();

            if (!blob)
            {
                this.screenCaptureService.recordingState.set('idle');
                return;
            }

            this.revokeObjectUrl(this.recordedVideoUrl());
            const url = URL.createObjectURL(blob);

            this.recordedVideoUrl.set(url);
            this.screenCaptureService.recordingState.set('recorded');

            console.log('Recorded blob', Date.now());
            const fileName = `issue-screen-recording-${Date.now()}.webm`;
            const file = new File([blob], fileName, { type: blob.type || 'video/webm' });

            console.log('Recorded file', file);
            saveAs(blob, fileName);
            // this.fg.get('video')?.setValue(file);
        }
        catch (error)
        {
            log('[DEBUG] Error stopping screen recording', error);
            const message = this.translocoService.translate('support.ScreenRecordingStopError');

            this.snackBar.open(
                message,
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            this.screenCaptureService.recordingState.set('idle');
        }
    }

    private revokeObjectUrl(url: string | null): void
    {
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    }
}
