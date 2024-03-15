import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessagePhoneNumberId extends StringValueObject
{
    public readonly type: string = 'WhatsappMessagePhoneNumberId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessagePhoneNumberId',
            nullable   : false,
            undefinable: false,
            maxLength  : 36,
        }, validationRules));
    }
}