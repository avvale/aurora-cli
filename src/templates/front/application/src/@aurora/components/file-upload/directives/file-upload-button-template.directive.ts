import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auFileUploadButtonTemplate]',
})
export class FileUploadButtonTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}