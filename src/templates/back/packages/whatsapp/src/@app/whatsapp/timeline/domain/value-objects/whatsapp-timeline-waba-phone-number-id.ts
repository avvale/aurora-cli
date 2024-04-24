import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappTimelineWabaPhoneNumberId extends StringValueObject
{
    public readonly type: string = 'WhatsappTimelineWabaPhoneNumberId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappTimelineWabaPhoneNumberId',
            nullable   : false,
            undefinable: false,
            maxLength  : 36,
        }, validationRules));
    }
}