import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangId extends UuidValueObject
{
    public readonly type: string = 'LangId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'LangId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}