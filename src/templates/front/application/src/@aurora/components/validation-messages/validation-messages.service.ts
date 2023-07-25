import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Utils } from '../..';
import { merge, Observable, Subject } from 'rxjs';
import { ValidateOptions, CustomMessage, FormMessageErrors } from './validation-messages.types';

@Injectable({
    providedIn: 'root',
})
export class ValidationMessagesService
{
    private validate$ = new Subject();
    private customMessages: CustomMessage[] = [];

    constructor(
        private translocoService: TranslocoService,
    ) {}

    /**
     * add custom message
     *
     * @param customMessage
     */
    addMessage(customMessage: CustomMessage): void
    {
        this.customMessages.push(customMessage);
    }

    /**
     * get message according error
     *
     * @param error
     * @param ac
     */
    getMessage(error: string, ac?: AbstractControl): Observable<string>
    {
        // check custom message errors
        for (const customMessage of this.customMessages)
        {
            if (error === customMessage.validatorName)
            {
                if (customMessage.translateable)
                {
                    if (typeof customMessage.message === 'string')
                    {
                        return this.translocoService.selectTranslate(customMessage.message, customMessage.translateProperties);
                    }
                    else if (typeof customMessage.message === 'function')
                    {
                        return customMessage.message();
                    }
                }
            }
        }

        // check message errors
        switch (error)
        {
            case 'required':
                return this.translocoService.selectTranslate('validations.Required');

            case 'minlength':
                return this.translocoService.selectTranslate('validations.MinLength', { minlength: ac.errors[error]['requiredLength'] });

            case 'maxlength':
                return this.translocoService.selectTranslate('validations.MaxLength', { maxlength: ac.errors[error]['requiredLength'] });

            case 'email':
                return this.translocoService.selectTranslate('validations.Email');

            case 'max':
                return this.translocoService.selectTranslate('validations.Max', { max: ac.errors[error]['max'] });

            case 'min':
                return this.translocoService.selectTranslate('validations.Min', { min: ac.errors[error]['min'] });

            case 'notequal':
                return this.translocoService.selectTranslate('validations.NotEqual',
                    { fieldName: ac.errors[error]['fieldName'], matchFieldName: ac.errors[error]['matchFieldName'] });

            case 'compare':
                return this.translocoService.selectTranslate('validations.Compare');

            case 'pattern':
                return this.translocoService.selectTranslate('validations.Pattern');

            default:
                console.log('error', error);
                return this.translocoService.selectTranslate('validations.Default');
        }
    }

    /**
     * method to check validations messages
     */
    validate(): void
    {
        this.validate$.next({ force: true });
    }

    /**
     * subscribe each control to detect any change
     *
     * @param fg
     * @param formErrors
     */
    subscribeForm(fg: FormGroup, formErrors: FormMessageErrors): void
    {
        // set default value
        if (!formErrors) throw new Error(`
            You must to define formErrors parameter with empty object, to keep reference.
            try to define in your component:

            formErrors: FormMessageErrors = {};

            after subscribe the form with this formErrors variable:

            this._validationMessagesService.subscribeForm(this.fg, this.formErrors);
        `);

        // check that exist formGroup to subscribe validations
        if (fg) Utils.deepMapFormControl(fg, (path, formControl) => this.addControl(path, formControl, formErrors), '');
    }

    /**
     * add controls to validate and get message error, this method register all fields to listen any state change
     *
     * @param fieldName
     * @param abstractControl
     * @param formErrors
     */
    addControl(fieldName: string, abstractControl: AbstractControl, formErrors: FormMessageErrors): void
    {
        merge(
            this.validate$,                 // observable to force validation
            abstractControl.valueChanges,
            abstractControl.statusChanges,
        )
            .subscribe((data: ValidateOptions) => formErrors[fieldName] = this.onChange(abstractControl, data));
    }

    /**
     * if change control state, check that is validate
     *
     * @param formControl
     * @param data
     */
    onChange(abstractControl: AbstractControl, options: ValidateOptions): Observable<string>
    {
        if (! abstractControl) { return; }

        let formError;
        if ((abstractControl && abstractControl.dirty && abstractControl.invalid) || options?.force)
        {
            for (const error in abstractControl.errors)
            {
                if (abstractControl.errors[error]) formError = this.getMessage(error, abstractControl);
            }
        }
        return formError;
    }
}