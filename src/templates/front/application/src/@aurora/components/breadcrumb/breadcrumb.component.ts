import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { Crumb } from './breadcrumb.types';
import { RouterModule } from '@angular/router';

export const loader = ['en', 'es']
    .reduce((acc, lang) =>
    {
        acc[lang] = () => import(`./i18n/${lang}.json`);
        return acc;
    },
    {});

@Component({
    selector       : 'au-breadcrumb',
    templateUrl    : './breadcrumb.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers      : [
        {
            provide : TRANSLOCO_SCOPE,
            useValue: {
                scope: 'breadcrumb',
                loader,
            },
            multi: true,
        },
    ],
    standalone     : true,
    imports        : [MatIconModule, NgForOf, NgIf, RouterModule, TranslocoModule],
})
export class BreadcrumbComponent
{
    @Input() data: Crumb[] = [];
}
