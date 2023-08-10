import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'OAuthApplicationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}