import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
    entryComponents: [
        ColumnsDialogComponent,
    ],
    imports: [
        CommonModule,
        DragDropModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
    ],
    declarations: [
        ColumnsDialogComponent,
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
