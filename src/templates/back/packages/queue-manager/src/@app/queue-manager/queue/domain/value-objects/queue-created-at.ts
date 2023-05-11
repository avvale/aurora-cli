import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'QueueCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'QueueCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}