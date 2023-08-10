import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenIsRevoked extends BooleanValueObject
{
    public readonly type: string = 'OAuthAccessTokenIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthAccessTokenIsRevoked',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}