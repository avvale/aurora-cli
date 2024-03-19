import { NgModule } from '@angular/core';
import { NgForOf } from '@angular/common';
import { GridSelectElementComponent } from './grid-select-element.component';
import { GridSelectElementCellValueTemplateDirective } from './directives/grid-select-element-cell-value-template.directive';
import { GridSelectElementCustomHeaderTemplateDirective } from './directives/grid-select-element-custom-header-template.directive';

@NgModule({
    imports: [
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
        NgForOf,
    ],
    exports: [
        GridSelectElementCellValueTemplateDirective,
        GridSelectElementComponent,
        GridSelectElementCustomHeaderTemplateDirective,
        NgForOf,
    ],
})
export class GridSelectElementModule { }
