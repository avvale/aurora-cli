import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'ClientUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ClientUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}