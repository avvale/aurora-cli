import * as handlebars from 'handlebars';

handlebars.registerPartial('gridSelectMultipleElementsWebComponent',
    `<!-- #region component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->
<au-grid-select-multiple-elements
    *ngIf="currentViewAction.id === '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit'"
    class="col-12 mt-0"
    [columnsConfig]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig$ | async"
    [dialogColumnsConfig]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig$ | async"
    [dialogGridData]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridData$ | async"
    [dialogGridId]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
    [dialogOriginColumnsConfig]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig$ | async"
    [gridData]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridData$ | async"
    [gridId]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}RolesGridId"
    [gridState]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridState"
    [id]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
    [label]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}')"
    [originColumnsConfig]="origin{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig"
    [selectedCheckboxRowModel]="selectedCheckboxRowModel"
    (dialogSelectedCheckboxRowModelChange)="handleDialog{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}RowsSectionChange($event)"
    (selectedCheckboxRowModelChange)="handle{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}RowsSectionChange($event)"
    #{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridElementsManager
>
    <au-grid-translations
        [for]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
        [actions]="t('Actions')"
        [AND]="t('AND')"
        [clearFilters]="t('ClearFilters')"
        [clickAndDragInfo]="t('ClickAndDragInfo')"
        [columns]="t('Columns')"
        [field]="t('Field')"
        [filter]="t('Filter')"
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
            unlink: t('Unlink'),
            cancel: t('Cancel'),
            close: t('Close')
        }"
    >
        <au-grid-column-translation
            *ngFor="let columnConfig of origin{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig"
            [field]="columnConfig.field"
        >
            \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
        </au-grid-column-translation>
    </au-grid-translations>
    <ng-template
        auGridSelectMultipleCustomHeaderTemplate
        position="left"
    >
        <div class="flex justify-start items-center">
            <button
                mat-icon-button
                class="mr-2"
                (click)="handleOpen{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}Dialog(newActionId)"
            >
                <mat-icon svgIcon="mat_solid:add"></mat-icon>
                <span class="cdk-visually-hidden">
                    Add new item
                </span>
            </button>
            <button
                mat-flat-button
                [disabled]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}RolesSelectedRows.length === 0"
                (click)="handleRemove{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}Selected()"
            >
                <mat-icon
                    class="mr-2"
                    svgIcon="mat_solid:link_off"
                >
                </mat-icon>
                \\{{ t('RemoveSelected') }}
            </button>
        </div>
    </ng-template>
    <ng-template
        auGridSelectMultipleCustomHeaderDialogTemplate
        position="left"
    >
        <ng-container>
            <button
                mat-flat-button
                [disabled]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}SelectedRows.length === 0"
                (click)="handleAdd{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}Selected()"
            >
                <mat-icon class="mr-2">add_link</mat-icon>
                \\{{ t('AddSelected') }}
            </button>
        </ng-container>
    </ng-template>
</au-grid-select-multiple-elements>
<!-- #endregion component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->`);
