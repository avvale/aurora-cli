import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auSplitMainButtonContentTemplate]',
})
export class SplitMainButtonContentTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}