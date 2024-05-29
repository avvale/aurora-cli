import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AccountService } from '@apps/iam/account';
import { Observable, catchError, map, of } from 'rxjs';

export function uniqueEmailValidator(
    accountService: AccountService,
    avoidEmails: string[] = [],
): AsyncValidatorFn
{
    return (
        control: AbstractControl,
    ): Observable<ValidationErrors | null> =>
    {
        return accountService
            .checkUniqueEmailAccount({
                email: control.value.toLowerCase(),
                avoidEmails,
            })
            .pipe(
                map(isTaken => (isTaken ? null : { uniqueEmail: true })),
                catchError(() => of(null)),
            );
    };
}