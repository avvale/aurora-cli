import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class LangCreatedAt extends TimestampValueObject
{
    public readonly type: 'LangCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'LangCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}