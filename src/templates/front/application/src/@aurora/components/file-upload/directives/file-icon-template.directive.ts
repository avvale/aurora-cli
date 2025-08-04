import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auFileIconTemplate]',
})
export class FileIconTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}