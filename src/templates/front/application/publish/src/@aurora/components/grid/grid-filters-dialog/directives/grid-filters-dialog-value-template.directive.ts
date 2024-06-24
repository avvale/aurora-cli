import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auGridFiltersDialogValueTemplate]',
    standalone: true,
})
export class GridFiltersDialogValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}