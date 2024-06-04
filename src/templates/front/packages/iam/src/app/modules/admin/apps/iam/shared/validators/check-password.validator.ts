import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AccountService } from '@apps/iam/account';
import { Observable, catchError, map, of } from 'rxjs';

export function checkPasswordValidator(
    accountService: AccountService,
): AsyncValidatorFn
{
    return (
        control: AbstractControl,
    ): Observable<ValidationErrors | null> =>
    {
        if (!control.value) return of(null);

        return accountService
            .checkPasswordMeAccount({
                password: control.value,
            })
            .pipe(
                map(passwordMatch => (passwordMatch ? null : { passwordMe: true })),
                catchError(() => of(null)),
            );
    };
}