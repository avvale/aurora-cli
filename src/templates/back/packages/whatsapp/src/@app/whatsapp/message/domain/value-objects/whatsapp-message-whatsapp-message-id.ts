import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageWhatsappMessageId extends StringValueObject
{
    public readonly type: string = 'WhatsappMessageWhatsappMessageId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageWhatsappMessageId',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}