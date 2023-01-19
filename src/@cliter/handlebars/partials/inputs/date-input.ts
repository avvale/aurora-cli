import * as handlebars from 'handlebars';

handlebars.registerPartial('dateInput',
    `<mat-form-field
    appearance="outline"
    class="au-datepicker {{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input
        matInput
        autocomplete="off"
        formControlName="{{ toCamelCase property.name }}"
        [auDatepickerSqlFormat]
        [matDatepicker]="{{ toCamelCase property.name }}Picker"
    >
    <mat-datepicker-toggle
        matSuffix
        [for]="{{ toCamelCase property.name }}Picker"
    >
    </mat-datepicker-toggle>
    <mat-datepicker #{{ toCamelCase property.name }}Picker>
    </mat-datepicker>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);