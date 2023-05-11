import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class BoundedContextId extends UuidValueObject
{
    public readonly type: string = 'BoundedContextId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}