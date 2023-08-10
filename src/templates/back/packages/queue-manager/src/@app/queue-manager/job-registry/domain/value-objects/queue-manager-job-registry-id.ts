import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryId extends UuidValueObject
{
    public readonly type: string = 'QueueManagerJobRegistryId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerJobRegistryId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}