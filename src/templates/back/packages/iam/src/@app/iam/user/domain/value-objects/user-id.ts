import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserId extends UuidValueObject
{
    public readonly type: string = 'UserId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}