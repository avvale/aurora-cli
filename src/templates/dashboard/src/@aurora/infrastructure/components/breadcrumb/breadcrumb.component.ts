import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { Crumb } from './breadcrumb.types';
export const loader = ['en', 'es'].reduce((acc, lang) =>
{
    acc[lang] = () => import(`./i18n/${lang}.json`);
    return acc;
}, {});

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
})
export class BreadcrumbComponent
{
    @Input() data: Crumb[] = [];
}
