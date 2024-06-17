import * as handlebars from 'handlebars';

handlebars.registerPartial('gridSelectMultipleElementsWebComponent',
    `<!-- #region component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->
@if (currentViewAction.id === '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit')
{
    <au-grid-select-multiple-elements
        class="col-12 mt-0"
        [label]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}')"
        [gridId]="{{ toCamelCase schema.moduleName }}{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
        [originColumnsConfig]="origin{{ toPascalCase schema.moduleName }}{{ toPascalCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig"
        [columnsConfig]="{{ toCamelCase schema.moduleName }}{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig$ | async"
        [gridData]="{{ toCamelCase schema.moduleName }}{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridData$ | async"
        [gridState]="{{ toCamelCase schema.moduleName }}{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridState"
        [dialogColumnsConfig]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig$ | async"
        [dialogGridData]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridData$ | async"
        [dialogGridId]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
        [dialogOriginColumnsConfig]="origin{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig"
        [selectedCheckboxRowModel]="selectedCheckboxRowModel"
        (dialogSelectedCheckboxRowModelChange)="handleDialog{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}RowsSectionChange($event)"
        (selectedCheckboxRowModelChange)="handle{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}RowsSectionChange($event)"
        #{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridSelectMultipleElements
    >
        <au-grid-translations
            [for]="{{ toCamelCase schema.moduleName }}{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
            [actionsMenu]="{
                unlink: t('Unlink'),
                cancel: t('Cancel'),
                close: t('Close')
            }"
        >
            @for (columnConfig of origin{{ toPascalCase schema.moduleName }}{{ toPascalCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig; track columnConfig.field)
            {
                <au-grid-column-translation [field]="columnConfig.field">
                    \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
                </au-grid-column-translation>
            }
        </au-grid-translations>
        <au-grid-translations
            [for]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
        >
            @for (columnConfig of origin{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig; track columnConfig.field)
            {
                <au-grid-column-translation
                    [field]="columnConfig.field"
                >
                    \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
                </au-grid-column-translation>
            }
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
                    [disabled]="{{ toCamelCase schema.moduleName }}{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}SelectedRows.length === 0"
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
}
<!-- #endregion component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->`);
