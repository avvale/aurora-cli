import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerQueuePrefix extends StringValueObject
{
    public readonly type: string = 'QueueManagerQueuePrefix';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerQueuePrefix',
            nullable   : false,
            undefinable: false,
            maxLength  : 63,
        }, validationRules));
    }
}