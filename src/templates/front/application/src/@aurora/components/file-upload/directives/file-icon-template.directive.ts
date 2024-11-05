import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auFileIconTemplate]',
    standalone: true,
})
export class FileIconTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}