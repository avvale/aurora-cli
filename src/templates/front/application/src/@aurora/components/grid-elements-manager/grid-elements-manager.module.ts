import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GridElementsManagerComponent } from './grid-elements-manager.component';
import { GridFormElementDetailDialogTemplateDirective } from './grid-form-element-detail-dialog-template.directive';
import { GridElementDetailDialogComponent } from './grid-element-detail-dialog.component';
import { GridCustomButtonsHeaderDialogTemplateDirective } from './grid-custom-buttons-header-dialog-template.directive';

// @aurora components
import { GridModule } from '../grid';

@NgModule({
    entryComponents: [
        GridElementDetailDialogComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,

        // @aurora
        GridModule,
    ],
    declarations: [
        GridElementDetailDialogComponent,
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
        GridCustomButtonsHeaderDialogTemplateDirective,
    ],
    exports: [
        GridElementsManagerComponent,
        GridFormElementDetailDialogTemplateDirective,
        GridCustomButtonsHeaderDialogTemplateDirective,
    ],
})

export class GridElementsManagerModule
{ }
