import { DataValueObject, UuidValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }} extends UuidValueObject
{
    public readonly type: '{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }}';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            length     : {{ currentProperty.length }},
        }, validationRules), data);
    }
}