import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        TranslocoModule,
    ],
    declarations: [
        BreadcrumbComponent,
    ],
    exports: [
        BreadcrumbComponent,
    ],
})

export class BreadcrumbModule
{
}
