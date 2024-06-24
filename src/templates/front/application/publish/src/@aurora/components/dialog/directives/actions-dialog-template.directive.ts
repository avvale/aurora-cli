import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector  : '[auActionsDialogTemplate]',
    standalone: true,
})
export class ActionsDialogTemplateDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}