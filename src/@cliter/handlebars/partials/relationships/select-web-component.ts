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
            *ngFor="let {{ toCamelCase property.getRelationshipModule }} of {{ toCamelCase property.getRelationshipModules }}$ | async"
            [value]="{{ toCamelCase property.getRelationshipModule }}.id"
        >
            \\{{ {{ toCamelCase property.getRelationshipModule }}.name }}
        </mat-option>
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);