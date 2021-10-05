import { IntValueObject } from '{{ config.applicationsContainer }}/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }} extends IntValueObject
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