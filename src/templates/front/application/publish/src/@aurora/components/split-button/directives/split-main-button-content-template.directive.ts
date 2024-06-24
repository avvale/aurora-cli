import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auSplitMainButtonContentTemplate]',
    standalone: true,
})
export class SplitMainButtonContentTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}