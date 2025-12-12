import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarActions,
    MatSnackBarRef,
} from '@angular/material/snack-bar';
import { defaultDetailImports, log, ViewDetailComponent } from '@aurora';
import { ConfigRecordingService } from './config-recording.service';

@Component({
    selector: 'screen-recording-config-recording-snackbar',
    templateUrl: './config-recording-snackbar.component.html',
    styles: `
        ::ng-deep .screen-recording-config-recording-snackbar-wrapper > * {
            min-width: 0px !important;
        }
        ::ng-deep
            .screen-recording-config-recording-snackbar-wrapper
            .mat-mdc-form-field
            .mat-mdc-floating-label,
        ::ng-deep
            .screen-recording-config-recording-snackbar-wrapper
            .mat-mdc-form-field
            .mdc-floating-label {
            color: #fff !important;
        }
        ::ng-deep
            .screen-recording-config-recording-snackbar-wrapper
            .mat-mdc-select-value,
        ::ng-deep
            .screen-recording-config-recording-snackbar-wrapper
            .mat-mdc-select-placeholder {
            color: #fff;
        }
        :host {
            display: flex;
            min-width: none;
        }
    `,
    imports: [...defaultDetailImports, MatSelectModule, MatSnackBarActions],
})
export class ConfigRecordingSnackbarComponent extends ViewDetailComponent {
    // ---- customizations ----
    inputDevicesInfo: MediaDeviceInfo[] = [];

    constructor(
        private snackBarRef: MatSnackBarRef<ConfigRecordingSnackbarComponent>,
        private configRecordingService: ConfigRecordingService,
        @Inject(MAT_SNACK_BAR_DATA) private data: any,
    ) {
        super();
    }

    async init(): Promise<void> {
        // in some browsers/environments, enumerateDevices returns nothing or empty labels
        // if permission has not been requested before.
        const hasPermission =
            await this.configRecordingService.requestAudioPermissions();
        if (!hasPermission) {
            log(
                '[DEBUG] Audio permission could not be obtained or getUserMedia failed. Devices may not appear correctly',
            );
        }

        this.inputDevicesInfo =
            await this.configRecordingService.listAudioInputDevices();
        log('[DEBUG] Devices found:', this.inputDevicesInfo);
    }

    onSubmit($event): void {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if (
            $event.submitter.getAttribute('form') !==
            $event.submitter.form.getAttribute('id')
        ) {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid) {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.configRecordingService.setConfig(this.fg.value);
        this.snackBarRef.dismissWithAction();
        this.snackBarRef.dismiss();
    }

    createForm(): void {
        this.fg = this.fb.group({
            displaySurface: [null, [Validators.required]],
            audioDeviceId: [null, [Validators.required]],
        });
    }

    dismiss(): void {
        this.configRecordingService.setConfig({
            displaySurface: null,
            audioDeviceId: null,
        });
        this.snackBarRef.dismiss();
    }
}
