import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { Error401Component } from './error-401.component';
import { error401Routes } from './error-401.routing';

@NgModule({
    declarations: [
        Error401Component,
    ],
    imports: [
        RouterModule.forChild(error401Routes),
        TranslocoModule,
    ],
})
export class Error401Module
{
}
