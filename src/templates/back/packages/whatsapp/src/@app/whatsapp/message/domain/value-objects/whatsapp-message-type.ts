import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageType extends EnumValueObject
{
    public readonly type: string = 'WhatsappMessageType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageType',
            nullable   : false,
            undefinable: false,
            enumOptions: ['BUTTON','CONTACTS','IMAGE','INTERACTIVE','LOCATION','ORDER','REACTION','STICKER','SYSTEM','TEMPLATE','TEXT','UNKNOWN'],
        }, validationRules));
    }
}