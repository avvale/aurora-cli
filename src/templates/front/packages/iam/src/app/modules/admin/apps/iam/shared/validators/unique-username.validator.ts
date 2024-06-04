import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AccountService } from '@apps/iam/account';
import { Observable, catchError, map, of } from 'rxjs';

export function uniqueUsernameValidator(
    accountService: AccountService,
    avoidUsernames: string[] = [],
): AsyncValidatorFn
{
    return (
        control: AbstractControl,
    ): Observable<ValidationErrors | null> =>
    {
        if (!control.value) return of(null);

        return accountService
            .checkUniqueUsernameAccount({
                username: control.value.toLowerCase(),
                avoidUsernames,
            })
            .pipe(
                map(isTaken => (isTaken ? null : { uniqueUsername: true })),
                catchError(() => of(null)),
            );
    };
}