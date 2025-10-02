import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxAccountCode extends StringValueObject
{
    public readonly type: string = 'MessageInboxAccountCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'MessageInboxAccountCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 128,
        }, validationRules));
    }
}