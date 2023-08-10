import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'OAuthClientUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthClientUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}