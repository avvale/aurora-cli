import { BlobValueObject, DataValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase (getPropertyName currentProperty) }} extends BlobValueObject
{
    public readonly type: string = '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase (getPropertyName currentProperty) }}';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase (getPropertyName currentProperty) }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            {{#if currentProperty.maxLength}}
            maxLength  : {{ currentProperty.maxLength }},
            {{/if}}
        }, validationRules), data);
    }
}