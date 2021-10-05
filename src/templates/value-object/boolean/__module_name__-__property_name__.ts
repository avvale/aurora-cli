import { BooleanValueObject } from '{{ config.applicationsContainer }}/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }} extends BooleanValueObject
{
    public readonly type: '{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }}';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: '{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.name }}',
            nullable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
            undefinable: {{#if currentProperty.nullable}}true{{else}}false{{/if}},
        }, validationRules));
    }
}