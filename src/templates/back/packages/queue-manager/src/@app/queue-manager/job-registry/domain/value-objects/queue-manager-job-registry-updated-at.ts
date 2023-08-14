import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'QueueManagerJobRegistryUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerJobRegistryUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}