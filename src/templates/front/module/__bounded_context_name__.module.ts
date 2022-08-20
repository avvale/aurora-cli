import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
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
            useValue: '{{ toKebabCase schema.boundedContextName }}',
            multi   : true,
        },
    ],
})
export class {{ toPascalCase schema.boundedContextName }}Module
{
}
