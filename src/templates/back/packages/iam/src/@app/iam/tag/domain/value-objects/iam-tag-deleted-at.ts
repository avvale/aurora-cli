import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTagDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'IamTagDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamTagDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}