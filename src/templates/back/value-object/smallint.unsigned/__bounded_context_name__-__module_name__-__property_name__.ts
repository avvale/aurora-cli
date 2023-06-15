import { SmallintValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase currentProperty.name }} extends SmallintValueObject
{
    public readonly type: string = '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase currentProperty.name }}';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ replaceI18n (toPascalCase moduleNameSuffix) }}{{ toPascalCase currentProperty.name }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            maxLength  : {{ currentProperty.maxLength }},
            unsigned   : true,
        }, validationRules));
    }
}