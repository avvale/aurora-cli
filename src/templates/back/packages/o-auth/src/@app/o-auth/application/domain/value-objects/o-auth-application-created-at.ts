import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'OAuthApplicationCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}