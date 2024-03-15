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
            enumOptions: ['TEMPLATE','REACTION','IMAGE','LOCATION','CONTACTS','INTERACTIVE','TEXT'],
        }, validationRules));
    }
}