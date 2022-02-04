import * as handlebars from 'handlebars';

handlebars.registerPartial('booleanInput',
    `<div class="{{ calculateFormGroupCol property }}">
    <mat-checkbox formControlName="{{ property.name }}">\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-checkbox>
</div>`);