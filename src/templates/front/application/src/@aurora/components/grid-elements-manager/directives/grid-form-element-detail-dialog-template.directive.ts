import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridFormElementDetailDialogTemplate]',
    standalone: true,
})
export class GridFormElementDetailDialogTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}