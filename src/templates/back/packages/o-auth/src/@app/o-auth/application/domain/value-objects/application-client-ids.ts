import { UuidArrayValueObject, ValidationRules } from '@aurora-ts/core';

export class ApplicationClientIds extends UuidArrayValueObject
{
    public readonly type: string = 'ApplicationClientIds';

    constructor(value: string | string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationClientIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}