import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageWabaContactId extends StringValueObject
{
    public readonly type: string = 'WhatsappMessageWabaContactId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageWabaContactId',
            nullable   : false,
            undefinable: false,
            maxLength  : 36,
        }, validationRules));
    }
}