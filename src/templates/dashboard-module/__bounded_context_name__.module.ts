import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { ValidationMessagesModule } from '@aurora';
import { SharedModule } from 'app/shared/shared.module';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//
import { {{ toCamelCase schema.boundedContextName }}Routes } from './{{ toKebabCase schema.boundedContextName }}.routing';
import { {{ toPascalCase schema.boundedContextName }}Component } from './{{ toKebabCase schema.boundedContextName }}.component';

export const loader = ['en', 'es'].reduce((acc, lang) =>
{
    acc[lang] = () => import(`./i18n/${lang}.json`);
    return acc;
}, {});

@NgModule({
    imports: [
        RouterModule.forChild({{ toCamelCase schema.boundedContextName }}Routes),
        SharedModule,
        TranslocoModule,
        ValidationMessagesModule,

        // Fuse
        FuseConfirmationModule,

        // Material
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
    ],
    declarations: [
        {{ toPascalCase schema.boundedContextName }}Component,
    ],
    providers: [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: {
                scope: '{{ toCamelCase schema.boundedContextName }}',
                loader,
            },
            multi: true,
        },
    ],
})
export class {{ toPascalCase schema.boundedContextName }}Module {}
