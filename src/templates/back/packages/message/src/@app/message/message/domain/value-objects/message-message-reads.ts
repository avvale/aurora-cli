import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageReads extends IntValueObject
{
    public readonly type: string = 'MessageMessageReads';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'MessageMessageReads',
            nullable   : false,
            undefinable: false,
            unsigned   : true,
        }, validationRules));
    }
}