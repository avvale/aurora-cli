import * as handlebars from 'handlebars';

handlebars.registerPartial('intInput',
    `<mat-form-field appearance="outline" class="{{ calculateFormGroupCol property }}">
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input matInput formControlName="{{ property.name }}" type="number"{{#if property.maxLength}} maxlength="{{ property.maxLength }}"{{/if}}>
    <mat-error>\\{{ formErrors?.{{ property.name }} | async }}</mat-error>
</mat-form-field>`);