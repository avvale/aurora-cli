import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridCustomButtonsHeaderTemplate]',
    standalone: true,
})
export class GridCustomButtonsHeaderTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}