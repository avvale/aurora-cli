import * as handlebars from 'handlebars';

handlebars.registerPartial('timestampInput',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input
        matInput
        formControlName="{{ toCamelCase property.name }}"
        [matDatepicker]="{{ toCamelCase property.name }}Picker"
    >
    <mat-datepicker-toggle
        matSuffix
        [for]="{{ toCamelCase property.name }}Picker"
    >
    </mat-datepicker-toggle>
    <mat-datepicker #{{ toCamelCase property.name }}Picker></mat-datepicker>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);