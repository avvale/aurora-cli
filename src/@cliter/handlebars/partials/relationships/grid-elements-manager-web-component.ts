import * as handlebars from 'handlebars';

handlebars.registerPartial('gridElementsManagerWebComponent',
    `<!-- #region component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->
@if (currentViewAction.id === '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.edit')
{
    <au-grid-elements-manager
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
            [actionsMenu]="{
                cancel: t('Cancel'),
                close: t('Close')
            }"
        >
            @for (columnConfig of origin{{ toPascalCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig; track columnConfig.field)
            {
                <au-grid-column-translation [field]="columnConfig.field">
                    \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
                </au-grid-column-translation>
            }
        </au-grid-translations>
    </au-grid-elements-manager>
}
<!-- #endregion component to manage {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }} -->`);
