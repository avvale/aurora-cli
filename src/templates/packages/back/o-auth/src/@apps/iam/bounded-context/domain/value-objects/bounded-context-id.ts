import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class BoundedContextId extends UuidValueObject
{
    public readonly type: 'BoundedContextId';

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