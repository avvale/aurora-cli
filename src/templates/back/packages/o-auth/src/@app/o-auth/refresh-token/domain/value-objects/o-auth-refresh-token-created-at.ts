import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthRefreshTokenCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'OAuthRefreshTokenCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthRefreshTokenCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}