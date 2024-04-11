import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxSort extends IntValueObject
{
    public readonly type: string = 'MessageOutboxSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'MessageOutboxSort',
            nullable   : false,
            undefinable: false,
            unsigned   : false,
        }, validationRules));
    }
}