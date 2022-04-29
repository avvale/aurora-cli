import { UuidArrayValueObject, ValidationRules } from 'aurora-ts-core';

export class ApplicationClientIds extends UuidArrayValueObject
{
    public readonly type: 'ApplicationClientIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationClientIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}