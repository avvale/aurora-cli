import { Routes } from '@angular/router';
import { provideValidationMessages } from '@aurora';
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { AuthForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';

export default [
    {
        path: '',
        component: AuthForgotPasswordComponent,
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
