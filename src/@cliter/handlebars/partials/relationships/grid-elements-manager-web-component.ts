import * as handlebars from 'handlebars';

handlebars.registerPartial('gridElementsManagerWebComponent',
    `<!-- #region component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->
<au-grid-elements-manager
    *ngIf="currentViewAction.id === '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit'"
    class="col-12 mb-5"
    [columnsConfig]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig$ | async"
    [dialogTitle]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}')"
    [gridData]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridData$ | async"
    [gridState]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridState"
    [id]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
    [label]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}')"
    [originColumnsConfig]="origin{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig"
    #{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridElementsManager
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
                    id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new{{ toPascalCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}',
                    isViewAction: false
                })
            "
        >
            <mat-icon class="mr-2">add</mat-icon>
            \\{{ t('New.M') }}
        </button>
    </ng-template>
    <ng-template
        auGridFormElementDetailDialogTemplate
        let-dialog
    >
        <form
            id="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}DetailDialogForm"
            novalidate
            [formGroup]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}DialogFg"
            (ngSubmit)="handleSubmit{{ toPascalCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}Form($event, dialog)"
        >
            <div class="layout__container">
                {{#each (getFormDetailFieldsProperties (getPropertiesFromPropertyRelationship property.relationship.modulePath)) }}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#eq type 'varchar'}}
                {{> varcharInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'text'}}
                {{> textInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'char'}}
                {{> charInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'tinyint.unsigned'}}
                {{> intInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'smallint.unsigned'}}
                {{> intInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'enum'}}
                {{> enumInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'boolean'}}
                {{> booleanInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'int.unsigned'}}
                {{> intInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'decimal'}}
                {{> decimalInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'date'}}
                {{> dateInput schema=../schema property=.}}

                {{/eq}}
                {{#eq type 'timestamp'}}
                {{> timestampInput schema=../schema property=.}}

                {{/eq}}
                {{/if}}
                {{/each}}
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
                    svgIcon="mat_solid:close"
                >
                </mat-icon>
                \\{{ t('Cancel') }}
            </button>
            <button
                mat-flat-button
                class="ml-3"
                type="submit"
                form="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}DetailDialogForm"
                color="accent"
                [disabled]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}DialogFg.pristine"
            >
                <mat-icon
                    class="icon-size-5 mr-2"
                    svgIcon="mat_solid:mode_edit"
                >
                </mat-icon>
                \\{{ t('Save') }}
            </button>
        </div>
    </ng-template>
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
</au-grid-elements-manager>
<!-- #endregion component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->`);
