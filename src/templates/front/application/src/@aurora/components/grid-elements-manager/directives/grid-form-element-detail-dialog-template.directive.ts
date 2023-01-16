import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridFormElementDetailDialogTemplate]',
})
export class GridFormElementDetailDialogTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}