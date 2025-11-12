import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MAT_SNACK_BAR_DATA, MatSnackBarActions, MatSnackBarRef } from '@angular/material/snack-bar';
import { ScreenCaptureConfigService } from '@apps/support/screen-capture-config.service';
import { ScreenCaptureService } from '@apps/support/screen-capture.service';
import { defaultDetailImports, log, ViewDetailComponent } from '@aurora';

@Component({
    selector: 'support-issue-config-recording-snackbar',
    templateUrl: './issue-config-recording-snackbar.component.html',
    styles: `
        ::ng-deep .support-issue-config-recording-snackbar-wrapper > * {
            min-width: 0px !important;
        }
        ::ng-deep .support-issue-config-recording-snackbar-wrapper .mat-mdc-form-field .mat-mdc-floating-label,
        ::ng-deep .support-issue-config-recording-snackbar-wrapper .mat-mdc-form-field .mdc-floating-label {
            color: #fff !important;
        }
        ::ng-deep .support-issue-config-recording-snackbar-wrapper .mat-mdc-select-value,
        ::ng-deep .support-issue-config-recording-snackbar-wrapper .mat-mdc-select-placeholder {
            color: #fff;
        }
        
        :host {
            display: flex;
            min-width: none;
        }
    `,
    imports: [
         ...defaultDetailImports,
        MatSelectModule, MatSnackBarActions,
    ],
})
export class IssueConfigRecordingSnackbarComponent extends ViewDetailComponent
{
    // ---- customizations ----
    inputDevicesInfo: MediaDeviceInfo[] = [];

    constructor(
        private snackBarRef: MatSnackBarRef<IssueConfigRecordingSnackbarComponent>,
        private screenCaptureConfigService: ScreenCaptureConfigService,
        private screenCaptureService: ScreenCaptureService,
        @Inject(MAT_SNACK_BAR_DATA) private data: any,
    ) {
        super();
    }

    async init(): Promise<void>
    {
        this.inputDevicesInfo = await this.screenCaptureService.listAudioInputDevices();
    }

    onSubmit($event): void
    {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if ($event.submitter.getAttribute('form') !== $event.submitter.form.getAttribute('id'))
        {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.screenCaptureConfigService.setConfig(this.fg.value);
        this.snackBarRef.dismissWithAction();
        this.snackBarRef.dismiss();
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            displaySurface: [null, [Validators.required]],
            audioDeviceId: [null, [Validators.required]],
        });
    }

    dismiss(): void
    {
         this.screenCaptureConfigService.setConfig({
            displaySurface: null,
            audioDeviceId: null,
         });
        this.snackBarRef.dismiss();
    }
}
