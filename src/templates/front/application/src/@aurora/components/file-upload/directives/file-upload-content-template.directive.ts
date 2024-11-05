import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auFileUploadContentTemplate]',
    standalone: true,
})
export class FileUploadContentTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}