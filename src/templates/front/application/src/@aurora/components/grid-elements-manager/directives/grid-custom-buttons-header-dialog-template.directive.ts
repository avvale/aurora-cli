import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridCustomButtonsHeaderDialogTemplate]',
    standalone: true,
})
export class GridCustomButtonsHeaderDialogTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}