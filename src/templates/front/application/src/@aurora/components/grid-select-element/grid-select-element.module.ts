import { NgForOf } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridTranslationsComponent } from '../grid/grid-translations/grid-translations.component';
import { GridSelectElementCellValueTemplateDirective } from './directives/grid-select-element-cell-value-template.directive';
import { GridSelectElementCustomHeaderTemplateDirective } from './directives/grid-select-element-custom-header-template.directive';
import { GridSelectElementComponent } from './grid-select-element.component';
import { GridColumnTranslationComponent } from '../grid/grid-translations/grid-column-translation.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        GridColumnTranslationComponent,
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
        GridTranslationsComponent,
        MatDialogModule,
        NgForOf,
    ],
    exports: [
        GridColumnTranslationComponent,
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
        GridTranslationsComponent,
        MatDialogModule,
        NgForOf,
    ],
})
export class GridSelectElementModule { }
