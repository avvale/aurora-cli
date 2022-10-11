import { BlobValueObject, DataValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }} extends BlobValueObject
{
    public readonly type: '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }}';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            {{#if currentProperty.maxLength}}
            maxLength  : {{ currentProperty.maxLength }},
            {{/if}}
        }, validationRules), data);
    }
}