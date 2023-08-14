import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'OAuthAccessTokenCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthAccessTokenCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}