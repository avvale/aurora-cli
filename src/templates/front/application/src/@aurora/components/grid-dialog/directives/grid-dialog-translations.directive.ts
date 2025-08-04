import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridDialogTranslations]',
})
export class GridDialogTranslationsDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}