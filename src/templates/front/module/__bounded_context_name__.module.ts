import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { DatePickerDayjsAdapter, DatePickerDayjsFormats, ValidationMessagesModule } from '@aurora';
import { SharedModule } from 'app/shared/shared.module';

// Material
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//
import { {{ toCamelCase schema.boundedContextName }}Routes } from './{{ toKebabCase schema.boundedContextName }}.routing';
import { {{ toPascalCase schema.boundedContextName }}Component } from './{{ toKebabCase schema.boundedContextName }}.component';

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
        MatDatepickerModule,
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
            useValue: '{{ toKebabCase schema.boundedContextName }}',
            multi   : true,
        },
        {
            provide : TRANSLOCO_SCOPE,
            useValue: 'error',
            multi   : true,
        },
        {
            provide : MAT_DATE_LOCALE,
            useValue: 'es-ES',
        },
        {
            provide : DateAdapter,
            useClass: DatePickerDayjsAdapter,
            deps    : [MAT_DATE_LOCALE],
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: DatePickerDayjsFormats,
        },
    ],
})
export class {{ toPascalCase schema.boundedContextName }}Module
{
}
