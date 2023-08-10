import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenId extends UuidValueObject
{
    public readonly type: string = 'OAuthAccessTokenId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthAccessTokenId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}