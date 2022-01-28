import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { ValidationMessagesService } from './validation-messages.service';

export const loader = ['en', 'es'].reduce((acc, lang) =>
{
    acc[lang] = () => import(`./i18n/${lang}.json`);
    return acc;
}, {});

@NgModule({
    imports  : [TranslocoModule],
    providers: [
        ValidationMessagesService,
        {
            provide : TRANSLOCO_SCOPE,
            useValue: {
                scope: 'validations',
                loader,
            },
            multi: true,
        },
    ],
})

export class ValidationMessagesModule {}
