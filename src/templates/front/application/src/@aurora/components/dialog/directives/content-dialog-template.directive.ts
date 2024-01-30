import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auContentDialogTemplate]',
    standalone: true,
})
export class ContentDialogTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}