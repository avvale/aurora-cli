import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryJobId extends StringValueObject
{
    public readonly type: string = 'QueueManagerJobRegistryJobId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerJobRegistryJobId',
            nullable   : false,
            undefinable: false,
            maxLength  : 36,
        }, validationRules));
    }
}