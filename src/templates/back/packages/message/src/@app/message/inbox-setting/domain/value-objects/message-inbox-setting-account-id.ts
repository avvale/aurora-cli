import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxSettingAccountId extends UuidValueObject
{
    public readonly type: string = 'MessageInboxSettingAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'MessageInboxSettingAccountId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}