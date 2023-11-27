import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Pipe({
    name      : 'hasValidator',
    pure      : false,
    standalone: true,
})
export class HasValidatorPipe implements PipeTransform
{
    transform(formControl: FormControl, validators: ValidatorFn | ValidatorFn[]): boolean
    {
        if (Array.isArray(validators)) return validators.some(validator => formControl.hasValidator(validator));
        return formControl.hasValidator(validators);
    }
}
