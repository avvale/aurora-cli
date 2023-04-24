import * as handlebars from 'handlebars';

handlebars.registerPartial('gridElementsManagerWebComponent',
    `<!-- #region component to manage {{ toCamelCase property.getRelationshipSchema.moduleNames }} -->
<au-grid-elements-manager
    *ngIf="currentViewAction.id === '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit'"
    class="col-12 mt-7"
    [columnsConfig]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}ColumnsConfig$ | async"
    [dialogTitle]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.getRelationshipSchema.moduleName }}')"
    [gridData]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridData$ | async"
    [gridState]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridState"
    [id]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridId"
    [label]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.getRelationshipSchema.moduleNames }}')"
    [originColumnsConfig]="origin{{ toPascalCase property.getRelationshipSchema.moduleNames }}ColumnsConfig"
    #{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridElementsManager
>
    <ng-template
        auGridCustomButtonsHeaderDialogTemplate
    >
        <button
            mat-flat-button
            class="ml-2"
            type="button"
            (click)="
                actionService.action({
                    id          : 'orion::truck.detail.newTruckDepot',
                    isViewAction: false
                })
            "
        >
            <mat-icon class="mr-2">add</mat-icon>
            \\{{ t('New.F') }}
        </button>
    </ng-template>
    <ng-template
        auGridFormElementDetailDialogTemplate
        let-dialog
    >
        <form
            id="truckDepotDetailDialogForm"
            novalidate
            [formGroup]="truckDepotDialogFg"
            (ngSubmit)="handleSubmitTruckDepotForm($event, dialog)"
        >
            <div class="layout__container">

            </div>
        </form>
        <div class="flex justify-end">
            <button
                mat-flat-button
                mat-dialog-close
                class="ml-3"
                color="basic"
            >
                <mat-icon
                    class="icon-size-5 mr-2"
                    svgIcon="heroicons_solid:x"
                >
                </mat-icon>
                \\{{ t('Cancel') }}
            </button>
            <button
                mat-flat-button
                class="ml-3"
                type="submit"
                form="truckDepotDetailDialogForm"
                color="accent"
                [disabled]="truckDepotDialogFg.pristine"
            >
                <mat-icon
                    class="icon-size-5 mr-2"
                    svgIcon="heroicons_solid:pencil"
                >
                </mat-icon>
                \\{{ t('Save') }}
            </button>
        </div>
    </ng-template>
    <au-grid-translations
        [actions]="t('Actions')"
        [AND]="t('AND')"
        [clearFilters]="t('ClearFilters')"
        [clickAndDragInfo]="t('ClickAndDragInfo')"
        [columns]="t('Columns')"
        [field]="t('Field')"
        [filter]="t('Filter')"
        [for]="truckDepotsGridId"
        [operator]="t('Operator')"
        [OR]="t('OR')"
        [pleaseSelectField]="t('PleaseSelectField')"
        [translations]="t('Translations')"
        [value]="t('Value')"
        [noData]="t('NoData')"
        [paginator]="{
            firstPageLabel: t('Paginator.FirstPageLabel'),
            itemsPerPageLabel: t('Paginator.ItemsPerPageLabel'),
            lastPageLabel: t('Paginator.LastPageLabel'),
            nextPageLabel: t('Paginator.NextPageLabel'),
            ofLabel: t('Paginator.OfLabel'),
            previousPageLabel: t('Paginator.PreviousPageLabel')
        }"
        [operators]="{
            contains: t('Operators.Contains'),
            endsWith: t('Operators.EndsWith'),
            equals: t('Operators.Equals'),
            greaterThan: t('Operators.GreaterThan'),
            greaterThanEqual: t('Operators.GreaterThanEqual'),
            lessThan: t('Operators.LessThan'),
            lessThanEqual: t('Operators.LessThanEqual'),
            notEquals: t('Operators.NotEquals'),
            startsWith: t('Operators.StartsWith')
        }"
        [actionsMenu]="{
            edit: t('Edit'),
            delete: t('Delete'),
            cancel: t('Cancel'),
            close: t('Close')
        }"
    >
        <au-grid-column-translation
            *ngFor="let columnConfig of originTruckDepotsColumnsConfig"
            [field]="columnConfig.field"
        >
            \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
        </au-grid-column-translation>
    </au-grid-translations>
</au-grid-elements-manager>
<!-- #endregion component to manage {{ toCamelCase property.getRelationshipSchema.moduleNames }} -->`);
