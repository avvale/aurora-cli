import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'LangUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'LangUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}