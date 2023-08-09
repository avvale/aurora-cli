import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonLangUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}