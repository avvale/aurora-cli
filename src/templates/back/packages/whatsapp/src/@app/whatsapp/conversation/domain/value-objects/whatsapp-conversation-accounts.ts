import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationAccounts extends JsonValueObject
{
    public readonly type: string = 'WhatsappConversationAccounts';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappConversationAccounts',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}