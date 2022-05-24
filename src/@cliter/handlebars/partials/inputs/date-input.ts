import * as handlebars from 'handlebars';

handlebars.registerPartial('dateInput',
    `<au-datepicker
    appearance="outline"
    formControlName="{{ toCamelCase property.name }}"
    class="{{ calculateFormGroupCol property }}"
    [label]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}')"
    [error]="formErrors?.{{ toCamelCase property.name }} | async"
    {{#unless property.nullable }}
    required
    {{/unless}}
>
</au-datepicker>`);