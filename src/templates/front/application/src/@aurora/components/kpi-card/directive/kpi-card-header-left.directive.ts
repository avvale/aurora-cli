import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[kpiCardHeaderLeft]',
})
export class KPICardHeaderLeftDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>
    ){}
}
