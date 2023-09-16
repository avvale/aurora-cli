import * as handlebars from 'handlebars';

handlebars.registerPartial('timestampInput',
    `<mat-form-field
    appearance="outline"
    class="au-datepicker {{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input
        matInput
        formControlName="{{ toCamelCase property.name }}"
        [auDatetimepickerSqlFormat]
        [mtxDatetimepicker]="{{ toCamelCase property.name }}Picker"
    >
    <mtx-datetimepicker-toggle
        [for]="{{ toCamelCase property.name }}Picker"
        matSuffix
    >
    </mtx-datetimepicker-toggle>
    <mtx-datetimepicker
        #{{ toCamelCase property.name }}Picker
        type="datetime"
        mode="landscape"
        [multiYearSelector]="false"
        startView="month"
        [twelvehour]="false"
        [timeInterval]="1"
        [touchUi]="false"
    >
    </mtx-datetimepicker>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);