import { NgModule } from '@angular/core';
import { GridSelectMultipleElementsComponent } from './grid-select-multiple-elements.component';
import { GridSelectMultipleCustomHeaderTemplateDirective } from './directives/grid-select-multiple-custom-header-template.directive';
import { GridSelectMultipleCustomHeaderDialogTemplateDirective } from './directives/grid-select-multiple-custom-header-dialog-template.directive';

@NgModule({
    imports: [
        GridSelectMultipleCustomHeaderDialogTemplateDirective,
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
    ],
    exports: [
        GridSelectMultipleCustomHeaderDialogTemplateDirective,
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
    ],
})
export class GridSelectMultipleElementsModule { }
