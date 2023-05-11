import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ApplicationId extends UuidValueObject
{
    public readonly type: string = 'ApplicationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}