import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';

@Pipe({
    name      : 'hasValidator',
    pure      : false,
    standalone: true,
})
export class HasValidatorPipe implements PipeTransform
{
    transform(formControl: FormControl, validators: keyof typeof Validators | keyof typeof Validators[]): boolean
    {
        if (Array.isArray(validators)) return validators.some(validator => formControl.hasValidator(Validators[validator] as ValidatorFn));
        return formControl.hasValidator(Validators[validators] as ValidatorFn);
    }
}
