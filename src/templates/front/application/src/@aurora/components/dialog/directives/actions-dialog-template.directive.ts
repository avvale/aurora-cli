import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auActionsDialogTemplate]',
})
export class ActionsDialogTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}