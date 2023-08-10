import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'OAuthApplicationUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}