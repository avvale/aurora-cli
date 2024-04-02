import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTagCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'IamTagCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamTagCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}