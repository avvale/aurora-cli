// angular
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// @aurora
import { DatepickerSqlFormatModule } from '@aurora/components/datepicker-sql-format/datepicker-sql-format.module';

// pipes
import { FilterOperatorsPipe } from './grid-filters-dialog/pipes/filter-operators.pipe';
import { GetContactOperatorPipe } from './grid-filters-dialog/pipes/get-concat-operator.pipe';
import { HasRenderOutboxPipe } from './grid-filters-dialog/pipes/has-render-outbox.pipe';
import { GridTranslatePipe } from './grid-translations/grid-translate.pipe';
import { GetActionsPipe } from './pipes/get-actions.pipe';
import { GetGridSpinnerFlagPipe } from './pipes/get-grid-spinner-flag.pipe';
import { GetTranslationIconColorPipe } from './pipes/get-translation-icon-color.pipe';
import { GetPipe } from './pipes/get.pipe';
import { HasCellValueTemplatePipe } from './pipes/has-cell-value-template.pipe';
import { HasCellValueWithFieldTemplatePipe } from './pipes/has-cell-value-with-field-template.pipe';
import { IsOriginColumnConfigPipe } from './pipes/is-origin-column-config.pipe';
import { FilterGridCustomHeaderTemplatesPositionPipe } from './pipes/select-positions-template.pipe';
import { TransformDataCellPipe } from './pipes/transform-data-cell.pipe';

// components & directives
import { FlagIconModule } from '../flag-icon';
import { GridCellValueTemplateDirective } from './directives/grid-cell-value-template.directive';
import { GridCustomHeaderTemplateDirective } from './directives/grid-custom-header-template.directive';
import { GridColumnsConfigPropertiesDialogComponent } from './grid-columns-config-properties-dialog/grid-columns-config-properties-dialog.component';
import { GridFiltersDialogComponent } from './grid-filters-dialog/grid-filters-dialog.component';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridColumnTranslationComponent } from './grid-translations/grid-column-translation.component';
import { GridTranslationsComponent } from './grid-translations/grid-translations.component';
import { GridTranslationsService } from './grid-translations/grid-translations.service';
import { GridComponent } from './grid/grid.component';
import { PaginatorIntlService } from './grid/paginator-intl.service';

@NgModule({
    entryComponents: [
        GridColumnsConfigPropertiesDialogComponent,
        GridFiltersDialogComponent,
    ],
    imports: [
        CommonModule,
        DatepickerSqlFormatModule,
        DragDropModule,
        FlagIconModule,
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
        MatProgressSpinnerModule,
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
        FilterGridCustomHeaderTemplatesPositionPipe,
        FilterOperatorsPipe,
        GetActionsPipe,
        GetContactOperatorPipe,
        GetGridSpinnerFlagPipe,
        GetPipe,
        GetTranslationIconColorPipe,
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
