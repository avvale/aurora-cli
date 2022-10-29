import { DecimalValueObject, ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }} extends DecimalValueObject
{
    public readonly type: string = '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }}';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : '{{ toPascalCase moduleNamePrefix }}{{ toPascalCase schema.moduleName }}{{ toPascalCase moduleNameSuffix }}{{ toPascalCase currentProperty.name }}',
            nullable   : {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            decimals   : [{{ join currentProperty.decimals }}],
            unsigned   : false,
        }, validationRules));
    }
}