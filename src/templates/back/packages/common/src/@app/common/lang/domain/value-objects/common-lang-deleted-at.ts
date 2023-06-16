import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'LangDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'LangDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}