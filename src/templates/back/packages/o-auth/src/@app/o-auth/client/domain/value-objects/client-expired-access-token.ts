import { IntValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientExpiredAccessToken extends IntValueObject
{
    public readonly type: string = 'ClientExpiredAccessToken';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientExpiredAccessToken',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}