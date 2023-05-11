import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RoleAccountIds extends UuidArrayValueObject
{
    public readonly type: string = 'RoleAccountIds';

    constructor(value: string | string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RoleAccountIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}