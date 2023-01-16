import { NgModule } from '@angular/core';
import { GridSelectElementComponent } from './grid-select-element.component';
import { GridDialogModule } from '../grid-dialog';
import { GridSelectElementCellValueTemplateDirective } from './directives/grid-select-element-cell-value-template.directive';
import { GridSelectElementCustomHeaderTemplateDirective } from './directives/grid-select-element-custom-header-template.directive';

@NgModule({
    imports: [
        // @aurora
        GridDialogModule,
    ],
    declarations: [
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
    ],
    exports: [
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
    ],
})

export class GridSelectElementModule
{ }
