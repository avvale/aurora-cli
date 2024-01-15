import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerQueueName extends StringValueObject
{
    public readonly type: string = 'QueueManagerQueueName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'QueueManagerQueueName',
            nullable   : false,
            undefinable: false,
            maxLength  : 63,
        }, validationRules));
    }
}