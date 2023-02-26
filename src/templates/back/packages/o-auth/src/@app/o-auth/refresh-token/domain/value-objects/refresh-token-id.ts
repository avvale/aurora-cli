import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class RefreshTokenId extends UuidValueObject
{
    public readonly type: string = 'RefreshTokenId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}