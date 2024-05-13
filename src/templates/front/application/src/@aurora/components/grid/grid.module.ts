import { NgModule } from '@angular/core';
import { GridCellValueTemplateDirective } from './directives/grid-cell-value-template.directive';
import { GridCustomHeaderTemplateDirective } from './directives/grid-custom-header-template.directive';
import { GridColumnTranslationComponent } from './grid-translations/grid-column-translation.component';
import { GridTranslationsComponent } from './grid-translations/grid-translations.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
    imports: [
        GridCellValueTemplateDirective,
        GridColumnTranslationComponent,
        GridComponent,
        GridCustomHeaderTemplateDirective,
        GridTranslationsComponent,
    ],
    exports: [
        GridCellValueTemplateDirective,
        GridColumnTranslationComponent,
        GridComponent,
        GridCustomHeaderTemplateDirective,
        GridTranslationsComponent,
    ],
})
export class GridModule { }
