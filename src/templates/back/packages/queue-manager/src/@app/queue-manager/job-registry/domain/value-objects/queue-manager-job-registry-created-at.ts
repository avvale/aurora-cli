import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'QueueManagerJobRegistryCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerJobRegistryCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}