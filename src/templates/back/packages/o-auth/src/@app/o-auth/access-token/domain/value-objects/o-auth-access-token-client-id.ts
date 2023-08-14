import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenClientId extends UuidValueObject
{
    public readonly type: string = 'OAuthAccessTokenClientId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthAccessTokenClientId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}