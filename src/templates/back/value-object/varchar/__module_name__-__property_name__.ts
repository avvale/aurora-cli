import { StringValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }} extends StringValueObject
{
    public readonly type: string = '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }}';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            {{#if currentProperty.maxLength}}
            maxLength  : {{ currentProperty.maxLength }},
            {{/if}}
        }, validationRules));
    }
}