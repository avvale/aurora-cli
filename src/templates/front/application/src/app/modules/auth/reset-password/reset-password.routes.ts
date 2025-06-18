import { Routes } from '@angular/router';
import { provideValidationMessages } from '@aurora';
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { AuthResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';

export default [
    {
        path: '',
        component: AuthResetPasswordComponent,
        providers: [
            provideValidationMessages(),
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'iam',
                multi   : true,
            },
        ],
    },
] as Routes;
