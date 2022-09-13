import * as handlebars from 'handlebars';

handlebars.registerPartial('booleanInput',
    `<div class="{{ calculateFormGroupCol property }} pt-5">
    <mat-checkbox
        formControlName="{{ toCamelCase property.name }}"
    >
        \\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}
    </mat-checkbox>
</div>`);