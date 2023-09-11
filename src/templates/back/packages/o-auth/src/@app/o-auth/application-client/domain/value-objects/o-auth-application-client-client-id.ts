import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationClientClientId extends UuidValueObject
{
    public readonly type: string = 'OAuthApplicationClientClientId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationClientClientId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}