import { NgModule } from '@angular/core';
import { GridTranslationsComponent } from './grid-translations/grid-translations.component';
import { GridColumnTranslationComponent } from './grid-translations/grid-column-translation.component';
import { GridComponent } from './grid/grid.component';
import { GridCustomHeaderTemplateDirective } from './directives/grid-custom-header-template.directive';

@NgModule({
    imports: [
        GridColumnTranslationComponent,
        GridComponent,
        GridCustomHeaderTemplateDirective,
        GridTranslationsComponent,
    ],
    exports: [
        GridColumnTranslationComponent,
        GridComponent,
        GridCustomHeaderTemplateDirective,
        GridTranslationsComponent,
    ],
})
export class GridModule { }
