import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridSelectMultipleCellValueDialogTemplate]',
})
export class GridSelectMultipleCellValueDialogTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}