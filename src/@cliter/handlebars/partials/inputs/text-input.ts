import * as handlebars from 'handlebars';

handlebars.registerPartial('textInput',
    `<mat-form-field appearance="outline" class="{{ calculateFormGroupCol property }}">
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <textarea matInput formControlName="{{ toCamelCase property.name }}"></textarea>
    <mat-error>\\{{ formErrors?.{{ property.name }} | async }}</mat-error>
</mat-form-field>`);