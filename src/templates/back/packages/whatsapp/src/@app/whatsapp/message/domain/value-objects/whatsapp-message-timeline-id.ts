import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageTimelineId extends UuidValueObject
{
    public readonly type: string = 'WhatsappMessageTimelineId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageTimelineId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}