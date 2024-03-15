import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'WhatsappMessageUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}