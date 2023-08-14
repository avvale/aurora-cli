import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'IamTenantUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamTenantUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}