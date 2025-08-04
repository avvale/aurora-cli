import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[kpiCardHeaderRight]',
})

export class KPICardHeaderRightDirective {
    constructor(
        public templateRef: TemplateRef<unknown>
    ){}
}
