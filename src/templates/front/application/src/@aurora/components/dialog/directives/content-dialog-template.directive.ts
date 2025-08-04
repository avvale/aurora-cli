import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auContentDialogTemplate]',
})
export class ContentDialogTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}