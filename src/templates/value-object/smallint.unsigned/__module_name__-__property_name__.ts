import { SmallintValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }} extends SmallintValueObject
{
    public readonly type: '{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }}';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: '{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }}',
            nullable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            maxLength: {{ currentProperty.maxLength }},
            unsigned: true,
        }, validationRules));
    }
}