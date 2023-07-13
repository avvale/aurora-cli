import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridSelectMultipleCellValueTemplate]',
    standalone: true,
})
export class GridSelectMultipleCellValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}