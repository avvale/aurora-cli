import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[kpiCardHeaderLeft]',
    standalone : true,
})
export class KPICardHeaderLeftDirective
{
    constructor(
        public templateRef: TemplateRef<unknown>
    ){}
}
