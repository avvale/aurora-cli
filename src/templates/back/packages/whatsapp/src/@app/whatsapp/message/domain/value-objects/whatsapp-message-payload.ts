import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessagePayload extends JsonValueObject
{
    public readonly type: string = 'WhatsappMessagePayload';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessagePayload',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}