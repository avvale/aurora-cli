import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridSelectMultipleCellValueDialogTemplate]',
    standalone: true,
})
export class GridSelectMultipleCellValueDialogTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}