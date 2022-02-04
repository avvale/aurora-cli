import * as handlebars from 'handlebars';

handlebars.registerPartial('enumInput',
    `<mat-form-field appearance="outline" class="{{ calculateFormGroupCol property }}">
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <mat-select formControlName="{{ property.name }}">
        {{#each property.enumOptions}}
        <mat-option value="{{ . }}">{{ . }}</mat-option>
        {{/each}}
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ property.name }} | async }}</mat-error>
</mat-form-field>`);