import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientId extends UuidValueObject
{
    public readonly type: string = 'OAuthClientId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthClientId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}