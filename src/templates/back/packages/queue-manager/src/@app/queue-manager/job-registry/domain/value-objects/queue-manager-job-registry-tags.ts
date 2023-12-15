import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryTags extends JsonValueObject
{
    public readonly type: string = 'QueueManagerJobRegistryTags';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerJobRegistryTags',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}