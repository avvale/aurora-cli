import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GridModule } from '../grid';
import { GridDialogModule } from '../grid-dialog';
import { GridSelectMultipleCellValueDialogTemplateDirective } from './directives/grid-select-multiple-cell-value-dialog-template.directive';
import { GridSelectMultipleCellValueTemplateDirective } from './directives/grid-select-multiple-cell-value-template.directive';
import { GridSelectMultipleElementsComponent } from './grid-select-multiple-elements.component';
import { GridSelectMultipleCustomHeaderTemplateDirective } from './directives/grid-select-multiple-custom-header-template.directive';
import { GridSelectMultipleCustomHeaderDialogTemplateDirective } from './directives/grid-select-multiple-custom-header-dialog-template.directive';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,

        // @aurora
        GridModule,
        GridDialogModule,
    ],
    declarations: [
        GridSelectMultipleCellValueTemplateDirective,
        GridSelectMultipleCellValueDialogTemplateDirective,
        GridSelectMultipleCustomHeaderDialogTemplateDirective,
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
    ],
    exports: [
        GridSelectMultipleCellValueTemplateDirective,
        GridSelectMultipleCellValueDialogTemplateDirective,
        GridSelectMultipleCustomHeaderDialogTemplateDirective,
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
    ],
})

export class GridSelectMultipleElementsModule
{ }
