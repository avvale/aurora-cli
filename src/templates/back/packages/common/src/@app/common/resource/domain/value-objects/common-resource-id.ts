import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonResourceId extends UuidValueObject
{
    public readonly type: string = 'CommonResourceId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonResourceId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}