import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ApplicationCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'ApplicationCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}