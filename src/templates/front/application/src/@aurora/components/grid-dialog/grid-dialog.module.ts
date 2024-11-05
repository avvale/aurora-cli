import { NgModule } from '@angular/core';
import { GridDialogTranslationsDirective } from './directives/grid-dialog-translations.directive';

@NgModule({
    imports: [
        GridDialogTranslationsDirective,
    ],
    exports: [
        GridDialogTranslationsDirective,
    ],
})
export class GridDialogModule { }
