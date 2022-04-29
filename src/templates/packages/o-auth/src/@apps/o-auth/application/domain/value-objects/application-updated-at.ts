import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class ApplicationUpdatedAt extends TimestampValueObject
{
    public readonly type: 'ApplicationUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}