import * as handlebars from 'handlebars';

handlebars.registerPartial('gridSelectElementWebComponent',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name }}') }}</mat-label>
    <input
        matInput
        formControlName="{{ toCamelCase property.relationship.field }}Name"
        readonly
    >
    <button
        matIconSuffix
        mat-icon-button
        type="button"
        class="mr-2"
        [aria-label]="t('Search')"
        (click)="
            actionService.action({
                id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}OpenDialog',
                isViewAction: false
            })
        "
    >
        <mat-icon>search</mat-icon>
    </button>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>
<au-grid-select-element
    [columnsConfig]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}ColumnsConfig$ | async"
    [dialogTitle]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}')"
    [gridData]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridData$ | async"
    [id]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
    [originColumnsConfig]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}OriginColumnsConfig"
    #{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}GridElementSelector
>
    <au-grid-translations
        [for]="{{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}GridId"
    >
        @for (columnConfig of {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}OriginColumnsConfig; track columnConfig.field)
        {
            <au-grid-column-translation [field]="columnConfig.field">
                \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
            </au-grid-column-translation>
        }
    </au-grid-translations>
</au-grid-select-element>`);
