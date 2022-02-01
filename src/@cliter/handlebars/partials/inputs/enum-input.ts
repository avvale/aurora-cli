import * as handlebars from 'handlebars';

handlebars.registerPartial('enumInput',
    `<mat-form-field appearance="outline" class="col-start-1 col-4">
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <mat-select formControlName="{{ property.name }}">
        {{#each property.enumOptions}}
        <mat-option value="{{ . }}">{{ . }}</mat-option>
        {{/each}}
    </mat-select>
    <mat-error>\\{{ formErrors?.{{ property.name }} | async }}</mat-error>
</mat-form-field>`);