import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[kpiCardHeaderRight]',
    standalone : true,
})

export class KPICardHeaderRightDirective {
    constructor(
        public templateRef: TemplateRef<unknown>
    ){}
}
