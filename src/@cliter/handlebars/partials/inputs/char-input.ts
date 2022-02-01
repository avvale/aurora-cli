import * as handlebars from 'handlebars';

handlebars.registerPartial('charInput',
    `<mat-form-field appearance="outline" class="col-6">
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input matInput formControlName="{{ property.name }}"{{#if property.length}} maxlength="{{ property.length }}"{{/if}}>
    <mat-error>\\{{ formErrors?.{{ property.name }} | async }}</mat-error>
</mat-form-field>`);