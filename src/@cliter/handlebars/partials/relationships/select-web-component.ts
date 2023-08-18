import * as handlebars from 'handlebars';

handlebars.registerPartial('selectWebComponent',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <mat-select
        formControlName="{{ toCamelCase property.name }}"
    >
        <mat-option
            *ngFor="let {{ toCamelCase (getRelationshipModuleNameProperty property schema) }} of {{ toCamelCase (getRelationshipModuleNamesProperty property schema) }}$ | async"
            [value]="{{ toCamelCase (getRelationshipModuleNameProperty property schema) }}.id"
        >
            \\{{ {{ toCamelCase (getRelationshipModuleNameProperty property schema) }}.name }}
        </mat-option>
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);