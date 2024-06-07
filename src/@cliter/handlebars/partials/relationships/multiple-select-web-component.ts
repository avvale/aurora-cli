import * as handlebars from 'handlebars';

handlebars.registerPartial('multipleSelectWebComponent',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <mat-select
        formControlName="{{ toCamelCase property.relationship.singularName }}Ids"
        multiple
    >
        @for ({{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }} of {{ toCamelCase (getModuleNamesFromPropertyRelationship property.relationship.modulePath) }}$ | async; track {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id)
        {
            <mat-option [value]="{{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.id">
                \\{{ {{ toCamelCase (getModuleNameFromPropertyRelationship property.relationship.modulePath) }}.name }}
            </mat-option>
        }
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.relationship.singularName }}Ids | async }}</mat-error>
</mat-form-field>`);
