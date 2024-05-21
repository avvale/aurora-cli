import { NgModule } from '@angular/core';
import { GridElementsManagerComponent } from './grid-elements-manager.component';
import { GridCustomButtonsHeaderDialogTemplateDirective } from './directives/grid-custom-buttons-header-dialog-template.directive';
import { GridElementsManagerCellValueTemplateDirective } from './directives/grid-elements-manager-cell-value-template.directive';
import { GridFormElementDetailDialogTemplateDirective } from './directives/grid-form-element-detail-dialog-template.directive';
import { GridTranslationsComponent } from '../grid/grid-translations/grid-translations.component';
import { GridColumnTranslationComponent } from '../grid/grid-translations/grid-column-translation.component';
import { NgFor } from '@angular/common';

@NgModule({
    imports: [
        GridColumnTranslationComponent,
        GridCustomButtonsHeaderDialogTemplateDirective,
        GridElementsManagerCellValueTemplateDirective,
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
        GridTranslationsComponent,
        NgFor,
    ],
    exports: [
        GridColumnTranslationComponent,
        GridCustomButtonsHeaderDialogTemplateDirective,
        GridElementsManagerCellValueTemplateDirective,
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
        GridTranslationsComponent,
        NgFor,
    ],
})
export class GridElementsManagerModule { }
