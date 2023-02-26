import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'ClientDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ClientDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}