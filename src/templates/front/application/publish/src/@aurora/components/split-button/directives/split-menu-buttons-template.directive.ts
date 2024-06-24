import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auSplitMenuButtonsTemplate]',
    standalone: true,
})
export class SplitMenuButtonsTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}