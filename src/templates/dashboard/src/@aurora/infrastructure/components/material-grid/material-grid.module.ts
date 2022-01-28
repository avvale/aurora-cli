import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { GetActionsPipe } from './get-actions.pipe';
import { MaterialGridComponent } from './grid/material-grid.component';
import { TranslationMenuComponent } from './translations-menu/translations-menu.component';
import { GetPipe } from './pipes/get.pipe';
import { CheckTranslationObjectPipe } from './pipes/check-translation-object.pipe';
import { ActionTranslationObjectPipe } from './pipes/action-translation-object.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TranslocoModule,
    ],
    declarations: [
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
export class MaterialGridModule
{
}
