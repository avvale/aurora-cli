import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridCustomButtonsHeaderTemplate]',
})
export class GridCustomButtonsHeaderTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}