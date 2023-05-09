import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class QueueDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'QueueDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'QueueDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}