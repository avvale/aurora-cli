import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserLangId extends UuidValueObject
{
    public readonly type: string = 'IamUserLangId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamUserLangId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}