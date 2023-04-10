import * as handlebars from 'handlebars';

handlebars.registerPartial('gridSelectElementWebComponent',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name}}') }}</mat-label>
    <input
        matInput
        formControlName="{{ toCamelCase property.relationshipField }}Name"
        readonly
    >
    <button
        matIconSuffix
        mat-icon-button
        type="button"
        class="mr-2"
        [aria-label]="t('Search')"
        (click)="
            actionService.action({
                id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.{{ toCamelCase property.relationshipField }}OpenDialog',
                isViewAction: false
            })
        "
    >
        <mat-icon>search</mat-icon>
    </button>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>`);