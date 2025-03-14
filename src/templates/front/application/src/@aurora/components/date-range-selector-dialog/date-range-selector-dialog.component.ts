import { ChangeDetectionStrategy, Component, Inject, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatepickerSqlFormatDirective, defaultDetailImports, FormMessageErrors, log, ValidationMessagesService } from '@aurora';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector       : 'date-range-selector-dialog',
    templateUrl    : './date-range-selector-dialog.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        DatepickerSqlFormatDirective, MatDatepickerModule, MatDialogModule,
    ],
})
export class DateRangeSelectorDialogComponent implements OnInit
{
    fg: FormGroup;
    formErrors: FormMessageErrors = {};
    isLoading: WritableSignal<boolean> = signal(false);
    isRequested: WritableSignal<boolean> = signal(false);

    constructor(
        private dialog: MatDialogRef<DateRangeSelectorDialogComponent>,
        private fb: FormBuilder,
        private validationMessagesService: ValidationMessagesService,
        @Inject(MAT_DIALOG_DATA) public data: {
            translations: {
                acceptButtonText: string;
                cancelButtonText: string;
                closeButtonText: string;
                dialogTitle: string;
                endDate: string;
                loadingMessage: string;
                selectionRange: string;
                selectionRangeHint: string;
                startDate: string;
                successfulMessage: string;
            };
            submitAction: (
                fg: FormGroup,
                isLoading: WritableSignal<boolean>,
            ) => void;
        } = {
            translations: {
                dialogTitle         : '',
                selectionRange      : '',
                selectionRangeHint  : '',
                startDate           : '',
                endDate             : '',
                acceptButtonText    : '',
                cancelButtonText    : '',
                closeButtonText    : '',
                loadingMessage      : '',
                successfulMessage   : '',
            },
            submitAction: (
                fg,
                isLoading,
            ) => { },
        },
    )
    {
        this.createForm();
    }

    ngOnInit(): void
    {
        // init validation message service
        this.validationMessagesService.subscribeForm(this.fg, this.formErrors);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            startAt: [null, [Validators.required]],
            endAt  : [null, [Validators.required]],
        });
    }

    onSubmit(): void
    {
        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.isLoading.set(true);
        this.isRequested.set(true);

        this.data.submitAction(
            this.fg,
            this.isLoading,
        );
    }

    close(): void
    {
        this.dialog.close(true);
    }
}
