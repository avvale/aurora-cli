import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { GridColumnTranslationComponent } from '../grid/grid-translations/grid-column-translation.component';
import { GridTranslationsComponent } from '../grid/grid-translations/grid-translations.component';
import { GridCustomButtonsHeaderDialogTemplateDirective } from './directives/grid-custom-buttons-header-dialog-template.directive';
import { GridElementsManagerCellValueTemplateDirective } from './directives/grid-elements-manager-cell-value-template.directive';
import { GridFormElementDetailDialogTemplateDirective } from './directives/grid-form-element-detail-dialog-template.directive';
import { GridElementsManagerComponent } from './grid-elements-manager.component';

@NgModule({
    imports: [
        GridColumnTranslationComponent,
        GridCustomButtonsHeaderDialogTemplateDirective,
        GridElementsManagerCellValueTemplateDirective,
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
        GridTranslationsComponent,
        MatDialogModule,
    ],
    exports: [
        GridColumnTranslationComponent,
        GridCustomButtonsHeaderDialogTemplateDirective,
        GridElementsManagerCellValueTemplateDirective,
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
        GridTranslationsComponent,
        MatDialogModule,
    ],
})
export class GridElementsManagerModule { }
