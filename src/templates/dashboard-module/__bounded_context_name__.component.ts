import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'au-{{ toKebabCase schema.boundedContextName }}',
    templateUrl    : './{{ toKebabCase schema.boundedContextName }}.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class {{ toPascalCase schema.boundedContextName }}Component
{
    constructor() { /**/ }
}
