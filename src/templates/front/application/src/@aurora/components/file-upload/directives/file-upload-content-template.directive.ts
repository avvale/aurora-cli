import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auFileUploadContentTemplate]',
})
export class FileUploadContentTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}