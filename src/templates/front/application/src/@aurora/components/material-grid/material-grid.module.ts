// angular
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// fuse
import { TranslocoModule } from '@ngneat/transloco';

// pipes
import { ActionTranslationObjectPipe } from './pipes/action-translation-object.pipe';
import { CheckTranslationObjectPipe } from './pipes/check-translation-object.pipe';
import { GetActionsPipe } from './get-actions.pipe';
import { GetPipe } from './pipes/get.pipe';
import { HasCellValueWithFieldTemplatePipe } from './pipes/has-cell-value-with-field-template';
import { TransformDataCellPipe } from './pipes/transform-data-cell.pipe';

// components & directives
import { CellValueTemplateDirective } from './directives/cell-value-template.directive';
import { ColumnsDialogComponent } from './columns-dialog/columns-dialog.component';
import { FullFilterDialogComponent } from './full-filter-dialog/full-filter-dialog.component';
import { MaterialGridComponent } from './grid/material-grid.component';
import { TranslationMenuComponent } from './translations-menu/translations-menu.component';
import { HasCellValueTemplatePipe } from './pipes/has-cell-value-template';

@NgModule({
    entryComponents: [
        ColumnsDialogComponent,
        FullFilterDialogComponent,
    ],
    imports: [
        CommonModule,
        DragDropModule,
        FormsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        ReactiveFormsModule,
        TranslocoModule,
    ],
    declarations: [
        ActionTranslationObjectPipe,
        CellValueTemplateDirective,
        CheckTranslationObjectPipe,
        ColumnsDialogComponent,
        FullFilterDialogComponent,
        GetActionsPipe,
        GetPipe,
        HasCellValueTemplatePipe,
        HasCellValueWithFieldTemplatePipe,
        MaterialGridComponent,
        TransformDataCellPipe,
        TranslationMenuComponent,
    ],
    exports: [
        CellValueTemplateDirective,
        MaterialGridComponent,
    ],
})
export class MaterialGridModule {}
