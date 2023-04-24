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
                    id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.new{{ toPascalCase property.getRelationshipSchema.moduleName }}',
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
            id="{{ toCamelCase property.getRelationshipSchema.moduleName }}DetailDialogForm"
            novalidate
            [formGroup]="{{ toCamelCase property.getRelationshipSchema.moduleName }}DialogFg"
            (ngSubmit)="handleSubmit{{ toPascalCase property.getRelationshipSchema.moduleName }}Form($event, dialog)"
        >
            <div class="layout__container">
                {{#each property.getRelationshipSchema.properties.formDetailFields}}
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
                {{> intInput schema=../schema property=.}}

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
                    svgIcon="heroicons_solid:x"
                >
                </mat-icon>
                \\{{ t('Cancel') }}
            </button>
            <button
                mat-flat-button
                class="ml-3"
                type="submit"
                form="{{ toCamelCase property.getRelationshipSchema.moduleName }}DetailDialogForm"
                color="accent"
                [disabled]="{{ toCamelCase property.getRelationshipSchema.moduleName }}DialogFg.pristine"
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
        [for]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridId"
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
            *ngFor="let columnConfig of origin{{ toPascalCase property.getRelationshipSchema.moduleNames }}ColumnsConfig"
            [field]="columnConfig.field"
        >
            \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
        </au-grid-column-translation>
    </au-grid-translations>
</au-grid-elements-manager>
<!-- #endregion component to manage {{ toCamelCase property.getRelationshipSchema.moduleNames }} -->`);
