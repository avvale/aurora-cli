import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageStatuses extends JsonValueObject
{
    public readonly type: string = 'WhatsappMessageStatuses';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageStatuses',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}