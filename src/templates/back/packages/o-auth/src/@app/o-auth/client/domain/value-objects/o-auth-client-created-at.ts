import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'OAuthClientCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthClientCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}