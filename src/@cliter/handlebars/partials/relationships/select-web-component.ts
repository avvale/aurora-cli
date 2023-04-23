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
            *ngFor="let {{ toCamelCase property.getRelationshipModuleName }} of {{ toCamelCase property.getRelationshipModuleNames }}$ | async"
            [value]="{{ toCamelCase property.getRelationshipModuleName }}.id"
        >
            \\{{ {{ toCamelCase property.getRelationshipModuleName }}.name }}
        </mat-option>
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);