import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auGridDialogTranslations]',
    standalone: true,
})
export class GridDialogTranslationsDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}