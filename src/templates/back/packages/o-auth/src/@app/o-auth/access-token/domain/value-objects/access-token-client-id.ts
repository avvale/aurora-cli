import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class AccessTokenClientId extends UuidValueObject
{
    public readonly type: string = 'AccessTokenClientId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenClientId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}