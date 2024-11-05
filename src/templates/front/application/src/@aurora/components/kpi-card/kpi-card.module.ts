import { NgModule } from '@angular/core';
import { KPICardComponent } from './kpi-card.component';
import { KPICardHeaderRightDirective } from './directive/kpi-card-header-right.directive';
import { KPICardHeaderLeftDirective } from './directive/kpi-card-header-left.directive';

@NgModule({
    imports: [
        KPICardComponent,
        KPICardHeaderRightDirective,
        KPICardHeaderLeftDirective,
    ],
    exports: [
        KPICardComponent,
        KPICardHeaderRightDirective,
        KPICardHeaderLeftDirective,
    ],
})
export class KPICardModule { }
