import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationPricingModel extends StringValueObject
{
    public readonly type: string = 'WhatsappConversationPricingModel';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappConversationPricingModel',
            nullable   : false,
            undefinable: false,
            maxLength  : 36,
        }, validationRules));
    }
}