import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class RefreshTokenAccessTokenId extends UuidValueObject
{
    public readonly type: 'RefreshTokenAccessTokenId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenAccessTokenId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}