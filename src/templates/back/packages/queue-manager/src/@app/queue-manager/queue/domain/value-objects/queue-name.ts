import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueName extends StringValueObject
{
    public readonly type: string = 'QueueName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'QueueName',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}