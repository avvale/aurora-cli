import * as handlebars from 'handlebars';

handlebars.registerPartial('charInput',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input
        matInput
        formControlName="{{ toCamelCase property.name }}"
        {{#if property.length}} maxlength="{{ property.length }}"{{/if}}
    >
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);