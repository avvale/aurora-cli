import { NgModule } from '@angular/core';
import { GridSelectMultipleElementsComponent } from './grid-select-multiple-elements.component';
import { GridSelectMultipleCustomHeaderTemplateDirective } from './directives/grid-select-multiple-custom-header-template.directive';

@NgModule({
    imports: [
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
    ],
    exports: [
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
    ],
})
export class GridSelectMultipleElementsModule { }
