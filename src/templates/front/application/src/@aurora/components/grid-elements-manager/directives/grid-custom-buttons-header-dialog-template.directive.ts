import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridCustomButtonsHeaderDialogTemplate]',
})
export class GridCustomButtonsHeaderDialogTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    )
    {
    }
}