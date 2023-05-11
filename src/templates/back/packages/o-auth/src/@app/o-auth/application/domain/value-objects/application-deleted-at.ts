import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ApplicationDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'ApplicationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}