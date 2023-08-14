import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserAccountId extends UuidValueObject
{
    public readonly type: string = 'IamUserAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamUserAccountId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}