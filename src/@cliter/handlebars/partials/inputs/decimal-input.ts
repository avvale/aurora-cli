import * as handlebars from 'handlebars';

handlebars.registerPartial('decimalInput',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input
        matInput
        formControlName="{{ toCamelCase property.name }}"
        type="number"
    >
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);