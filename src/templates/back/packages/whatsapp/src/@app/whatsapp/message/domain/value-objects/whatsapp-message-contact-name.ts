import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageContactName extends StringValueObject
{
    public readonly type: string = 'WhatsappMessageContactName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageContactName',
            nullable   : true,
            undefinable: true,
            maxLength  : 127,
        }, validationRules));
    }
}