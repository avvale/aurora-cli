import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'IamUserUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamUserUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}