import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auSplitMenuButtonsTemplate]',
})
export class SplitMenuButtonsTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}