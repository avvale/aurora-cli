import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageDisplayPhoneNumber extends StringValueObject
{
    public readonly type: string = 'WhatsappMessageDisplayPhoneNumber';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageDisplayPhoneNumber',
            nullable   : false,
            undefinable: false,
            maxLength  : 36,
        }, validationRules));
    }
}