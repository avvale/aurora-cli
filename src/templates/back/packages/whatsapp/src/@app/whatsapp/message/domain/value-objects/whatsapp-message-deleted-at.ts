import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'WhatsappMessageDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}