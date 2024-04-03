import * as handlebars from 'handlebars';

handlebars.registerPartial('searchMultipleSelectWebComponent',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <mat-select
        formControlName="{{ toCamelCase property.name }}"
        multiple
    >
        <mat-option>
            <ngx-mat-select-search
                [formControl]="{{ toCamelCase property.name}}') }}FilterCtrl"
                [placeholderLabel]="t('message.Find{{ toPascalCase property.name}}') }}')"
                [noEntriesFoundLabel]="t('NoResultsFound')"
            >
            </ngx-mat-select-search>
        </mat-option>
        @for ({{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }} of {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}$ | async; track {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id)
        {
            <mat-option [value]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id">
                \\{{ {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.name }}
            </mat-option>
        }
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);
