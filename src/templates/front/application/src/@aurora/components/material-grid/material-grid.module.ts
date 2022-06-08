import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ColumnsDialogComponent } from './columns-dialog/columns-dialog.component';
import { GetActionsPipe } from './get-actions.pipe';
import { MaterialGridComponent } from './grid/material-grid.component';
import { TranslationMenuComponent } from './translations-menu/translations-menu.component';
import { GetPipe } from './pipes/get.pipe';
import { CheckTranslationObjectPipe } from './pipes/check-translation-object.pipe';
import { ActionTranslationObjectPipe } from './pipes/action-translation-object.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { FullFilterDialogComponent } from './full-filter-dialog/full-filter-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    entryComponents: [
        ColumnsDialogComponent,
        FullFilterDialogComponent,
    ],
    imports: [
        CommonModule,
        DragDropModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        TranslocoModule,
        MatInputModule,
        MatBadgeModule,
        MatAutocompleteModule,
    ],
    declarations: [
        ColumnsDialogComponent,
        FullFilterDialogComponent,
        ActionTranslationObjectPipe,
        GetActionsPipe,
        GetPipe,
        MaterialGridComponent,
        TranslationMenuComponent,
        CheckTranslationObjectPipe,
    ],
    exports: [
        MaterialGridComponent,
    ],
})
export class MaterialGridModule {}
