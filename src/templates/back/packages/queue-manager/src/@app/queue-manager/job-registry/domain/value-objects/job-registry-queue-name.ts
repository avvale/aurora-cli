import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class JobRegistryQueueName extends StringValueObject
{
    public readonly type: string = 'JobRegistryQueueName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryQueueName',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}