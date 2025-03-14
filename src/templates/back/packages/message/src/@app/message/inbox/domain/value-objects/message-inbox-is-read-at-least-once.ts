import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxIsReadAtLeastOnce extends BooleanValueObject
{
    public readonly type: string = 'MessageInboxIsReadAtLeastOnce';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'MessageInboxIsReadAtLeastOnce',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}