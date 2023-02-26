import { UuidArrayValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientApplicationIds extends UuidArrayValueObject
{
    public readonly type: string = 'ClientApplicationIds';

    constructor(value: string | string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientApplicationIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}