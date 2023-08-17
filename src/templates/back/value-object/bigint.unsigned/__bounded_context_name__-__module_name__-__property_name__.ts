import { BigintValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase (getPropertyName currentProperty) }} extends BigintValueObject
{
    public readonly type: string = '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase (getPropertyName currentProperty) }}';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase (getPropertyName currentProperty) }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            maxLength  : {{ currentProperty.maxLength }},
            unsigned   : true,
        }, validationRules));
    }
}