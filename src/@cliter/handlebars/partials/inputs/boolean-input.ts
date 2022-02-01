import * as handlebars from 'handlebars';

handlebars.registerPartial('booleanInput',
    `<div class="col-2">
    <mat-checkbox formControlName="{{ property.name }}">\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-checkbox>
</div>`);