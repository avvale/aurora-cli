import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageId extends UuidValueObject
{
    public readonly type: string = 'MessageMessageId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'MessageMessageId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}