import { NgModule } from '@angular/core';
import { GridElementsManagerComponent } from './grid-elements-manager.component';
import { GridCustomButtonsHeaderDialogTemplateDirective } from './directives/grid-custom-buttons-header-dialog-template.directive';
import { GridElementsManagerCellValueTemplateDirective } from './directives/grid-elements-manager-cell-value-template.directive';
import { GridFormElementDetailDialogTemplateDirective } from './directives/grid-form-element-detail-dialog-template.directive';

@NgModule({
    imports: [
        GridCustomButtonsHeaderDialogTemplateDirective,
        GridElementsManagerCellValueTemplateDirective,
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
    ],
    exports: [
        GridCustomButtonsHeaderDialogTemplateDirective,
        GridElementsManagerCellValueTemplateDirective,
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
    ],
})
export class GridElementsManagerModule { }
