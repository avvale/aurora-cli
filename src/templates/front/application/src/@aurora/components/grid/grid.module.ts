// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ObserversModule } from '@angular/cdk/observers';

// material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// @aurora
import { DatepickerSqlFormatModule } from '@aurora/components/datepicker-sql-format/datepicker-sql-format.module';

// pipes
import { ActionTranslationObjectPipe } from './pipes/action-translation-object.pipe';
import { CheckTranslationObjectPipe } from './pipes/check-translation-object.pipe';
import { FilterGridCustomHeaderTemplatesPositionPipe } from './pipes/select-positions-template.pipe';
import { FilterOperatorsPipe } from './grid-filters-dialog/pipes/filter-operators.pipe';
import { GetActionsPipe } from './pipes/get-actions.pipe';
import { GetContactOperatorPipe } from './grid-filters-dialog/pipes/get-concat-operator.pipe';
import { GetPipe } from './pipes/get.pipe';
import { GridTranslatePipe } from './grid-translations/grid-translate.pipe';
import { HasCellValueTemplatePipe } from './pipes/has-cell-value-template.pipe';
import { HasCellValueWithFieldTemplatePipe } from './pipes/has-cell-value-with-field-template.pipe';
import { HasRenderOutboxPipe } from './grid-filters-dialog/pipes/has-render-outbox.pipe';
import { IsOriginColumnConfigPipe } from './pipes/is-origin-column-config.pipe';
import { TransformDataCellPipe } from './pipes/transform-data-cell.pipe';

// components & directives
import { GridCellValueTemplateDirective } from './directives/grid-cell-value-template.directive';
import { GridCustomHeaderTemplateDirective } from './directives/grid-custom-header-template.directive';
import { GridColumnsConfigPropertiesDialogComponent } from './grid-columns-config-properties-dialog/grid-columns-config-properties-dialog.component';
import { GridColumnTranslationComponent } from './grid-translations/grid-column-translation.component';
import { GridFiltersDialogComponent } from './grid-filters-dialog/grid-filters-dialog.component';
import { GridTranslationsComponent } from './grid-translations/grid-translations.component';
import { GridTranslationsService } from './grid-translations/grid-translations.service';
import { GridComponent } from './grid/grid.component';
import { PaginatorIntlService } from './grid/paginator-intl.service';
import { TranslationMenuComponent } from './translations-menu/translations-menu.component';
import { GridSearchComponent } from './grid-search/grid-search.component';

@NgModule({
    entryComponents: [
        GridColumnsConfigPropertiesDialogComponent,
        GridFiltersDialogComponent,
    ],
    imports: [
        CommonModule,
        DatepickerSqlFormatModule,
        DragDropModule,
        FormsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        ObserversModule,
        ReactiveFormsModule,
    ],
    providers: [
        GridTranslationsService,
        {
            provide : MatPaginatorIntl,
            useClass: PaginatorIntlService,
        },
    ],
    declarations: [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        FilterGridCustomHeaderTemplatesPositionPipe,
        FilterOperatorsPipe,
        GetActionsPipe,
        GetContactOperatorPipe,
        GetPipe,
        GridCellValueTemplateDirective,
        GridColumnsConfigPropertiesDialogComponent,
        GridColumnTranslationComponent,
        GridComponent,
        GridCustomHeaderTemplateDirective,
        GridFiltersDialogComponent,
        GridSearchComponent,
        GridTranslatePipe,
        GridTranslationsComponent,
        HasCellValueTemplatePipe,
        HasCellValueWithFieldTemplatePipe,
        HasRenderOutboxPipe,
        IsOriginColumnConfigPipe,
        TransformDataCellPipe,
        TranslationMenuComponent,
    ],
    exports: [
        GridCellValueTemplateDirective,
        GridColumnTranslationComponent,
        GridCustomHeaderTemplateDirective,
        GridTranslationsComponent,
        GridComponent,
    ],
})
export class GridModule {}
