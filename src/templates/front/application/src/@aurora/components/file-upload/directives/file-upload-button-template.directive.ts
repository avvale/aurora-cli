import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auFileUploadButtonTemplate]',
    standalone: true,
})
export class FileUploadButtonTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}