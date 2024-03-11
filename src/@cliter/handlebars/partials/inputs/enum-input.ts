import * as handlebars from 'handlebars';

handlebars.registerPartial('enumInput',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <mat-select
        formControlName="{{ toCamelCase property.name }}"
    >
        {{#each (getPropertyEnumOptions property) }}
        <mat-option value="{{ . }}">{{ . }}</mat-option>
        {{/each}}
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);