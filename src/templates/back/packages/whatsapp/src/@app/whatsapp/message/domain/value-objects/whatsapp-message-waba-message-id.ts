import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageWabaMessageId extends StringValueObject
{
    public readonly type: string = 'WhatsappMessageWabaMessageId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageWabaMessageId',
            nullable   : false,
            undefinable: false,
            maxLength  : 128,
        }, validationRules));
    }
}