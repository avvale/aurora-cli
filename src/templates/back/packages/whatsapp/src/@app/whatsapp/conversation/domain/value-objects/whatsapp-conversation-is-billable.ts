import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationIsBillable extends BooleanValueObject
{
    public readonly type: string = 'WhatsappConversationIsBillable';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappConversationIsBillable',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}