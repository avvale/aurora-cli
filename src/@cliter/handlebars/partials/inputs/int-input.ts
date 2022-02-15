import * as handlebars from 'handlebars';

handlebars.registerPartial('intInput',
    `<mat-form-field appearance="outline" class="{{ calculateFormGroupCol property }}">
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input matInput formControlName="{{ toCamelCase property.name }}" type="number"{{#if property.maxLength}} maxlength="{{ property.maxLength }}"{{/if}}>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);