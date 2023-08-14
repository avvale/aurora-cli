import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'QueueManagerJobRegistryDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerJobRegistryDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}