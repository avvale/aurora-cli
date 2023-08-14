import { JsonValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase currentProperty.name }} extends JsonValueObject
{
    public readonly type: string = '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase currentProperty.name }}';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase currentProperty.name }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
        }, validationRules));
    }
}