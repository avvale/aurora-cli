import { NgForOf } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridTranslationsComponent } from '../grid/grid-translations/grid-translations.component';
import { GridSelectElementCellValueTemplateDirective } from './directives/grid-select-element-cell-value-template.directive';
import { GridSelectElementCustomHeaderTemplateDirective } from './directives/grid-select-element-custom-header-template.directive';
import { GridSelectElementComponent } from './grid-select-element.component';
import { GridColumnTranslationComponent } from '../grid/grid-translations/grid-column-translation.component';

@NgModule({
    imports: [
        GridColumnTranslationComponent,
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
        GridTranslationsComponent,
        NgForOf,
    ],
    exports: [
        GridColumnTranslationComponent,
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
        GridTranslationsComponent,
        NgForOf,
    ],
})
export class GridSelectElementModule { }
